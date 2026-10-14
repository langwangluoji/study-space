#Requires -Version 7.0
[CmdletBinding()]
param(
  [string]$CatalogPath = (Join-Path $PSScriptRoot '../public/materials/catalog.json'),
  [string]$ReportPath = (Join-Path $PSScriptRoot '../reports/materials-remote.json'),
  [ValidateRange(1, 12)][int]$ThrottleLimit = 6,
  [ValidateRange(5, 120)][int]$TimeoutSeconds = 40,
  [ValidateRange(1, 3)][int]$Attempts = 2
)
$ErrorActionPreference = 'Stop'
$catalog = Get-Content -LiteralPath $CatalogPath -Raw | ConvertFrom-Json
$byUrl = @{}
foreach ($resource in $catalog) {
  foreach ($asset in @($resource.original, $resource.preview)) {
    foreach ($part in @($asset.parts)) {
      if ($null -eq $part) { continue }
      if ($byUrl.ContainsKey($part.url)) {
        $old = $byUrl[$part.url]
        if ([long]$old.bytes -ne [long]$part.bytes -or $old.sha256 -ne $part.sha256) {
          throw 'Conflicting byte count or hash for one remote URL.'
        }
      } else { $byUrl[$part.url] = $part }
    }
  }
}
$parts = @($byUrl.Values | Sort-Object url)
Write-Output ('Checking {0} distinct parts with HEAD, concurrency {1}.' -f $parts.Count, $ThrottleLimit)
$headResults = @($parts | ForEach-Object -Parallel {
  $part = $_
  $attemptLog = [System.Collections.Generic.List[object]]::new()
  $passed = $false
  $status = $null; $cors = $null; $length = $null; $lengthMatches = $null
  for ($attempt = 1; $attempt -le $using:Attempts; $attempt++) {
    try {
      $response = Invoke-WebRequest -Method Head -Uri $part.url -TimeoutSec $using:TimeoutSeconds -SkipHttpErrorCheck -ErrorAction Stop
      $status = [int]$response.StatusCode
      $cors = ($response.Headers['Access-Control-Allow-Origin'] -join ',')
      $rawLength = ($response.Headers['Content-Length'] -join ',')
      $length = if ([string]::IsNullOrEmpty($rawLength)) { $null } else { [long]$rawLength }
      $lengthMatches = if ($null -eq $length) { $null } else { $length -eq [long]$part.bytes }
      $passed = $status -eq 200 -and $cors -eq '*' -and ($null -eq $length -or $lengthMatches)
      $issue = if ($status -ne 200) { 'remote-http-status' } elseif ($cors -ne '*') { 'remote-cors-header' } elseif ($lengthMatches -eq $false) { 'remote-content-length' } else { $null }
      $attemptLog.Add([pscustomobject]@{attempt=$attempt;status=$status;issue=$issue})
      if ($passed) { break }
    } catch {
      $attemptLog.Add([pscustomobject]@{attempt=$attempt;status=$null;issue='connection-or-proxy';exceptionType=$_.Exception.GetType().FullName;message=$_.Exception.Message})
    }
    if ($attempt -lt $using:Attempts) { Start-Sleep -Milliseconds 350 }
  }
  [pscustomobject]@{url=$part.url;expectedBytes=[long]$part.bytes;status=$status;accessControlAllowOrigin=$cors;contentLength=$length;contentLengthMatches=$lengthMatches;passed=$passed;attempts=@($attemptLog)}
} -ThrottleLimit $ThrottleLimit | Sort-Object url)
Write-Output ('HEAD finished: {0}/{1} passed.' -f @($headResults | Where-Object passed).Count, $parts.Count)
$byteResults = [System.Collections.Generic.List[object]]::new()
foreach ($part in @($parts | Sort-Object bytes, url | Select-Object -First 3)) {
  $passed = $false; $status = $null; $actualBytes = $null; $actualHash = $null
  $attemptLog = [System.Collections.Generic.List[object]]::new()
  for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
    try {
      $response = Invoke-WebRequest -Method Get -Uri $part.url -TimeoutSec $TimeoutSeconds -SkipHttpErrorCheck -ErrorAction Stop
      $status = [int]$response.StatusCode
      if ($status -ne 200) {
        $attemptLog.Add([pscustomobject]@{attempt=$attempt;status=$status;issue='remote-http-status'})
      } else {
        $stream = [System.IO.MemoryStream]::new()
        try {
          if ($response.RawContentStream.CanSeek) { $response.RawContentStream.Position = 0 }
          $response.RawContentStream.CopyTo($stream)
          $payload = $stream.ToArray()
          $actualBytes = $payload.LongLength
          $actualHash = [Convert]::ToHexString([System.Security.Cryptography.SHA256]::HashData($payload)).ToLowerInvariant()
        } finally { $stream.Dispose() }
        $passed = $actualBytes -eq [long]$part.bytes -and $actualHash -eq $part.sha256
        $issue = if ($actualBytes -ne [long]$part.bytes) { 'remote-byte-count' } elseif ($actualHash -ne $part.sha256) { 'remote-sha256' } else { $null }
        $attemptLog.Add([pscustomobject]@{attempt=$attempt;status=$status;issue=$issue})
        if ($passed) { break }
      }
    } catch {
      $attemptLog.Add([pscustomobject]@{attempt=$attempt;status=$null;issue='connection-or-proxy';exceptionType=$_.Exception.GetType().FullName;message=$_.Exception.Message})
    }
    if ($attempt -lt $Attempts) { Start-Sleep -Milliseconds 350 }
  }
  $byteResults.Add([pscustomobject]@{url=$part.url;status=$status;expectedBytes=[long]$part.bytes;bytes=$actualBytes;expectedSha256=$part.sha256;sha256=$actualHash;passed=$passed;attempts=@($attemptLog)})
  Write-Output ('GET sample {0}: {1} bytes, passed={2}.' -f $byteResults.Count, $actualBytes, $passed)
}
$failedHead = @($headResults | Where-Object { -not $_.passed })
$failedBytes = @($byteResults | Where-Object { -not $_.passed })
$errors = @($failedHead | ForEach-Object { [pscustomobject]@{method='HEAD';url=$_.url;attempts=$_.attempts} }) + @($failedBytes | ForEach-Object { [pscustomobject]@{method='GET';url=$_.url;attempts=$_.attempts} })
$report = [ordered]@{
  status = if ($errors.Count -eq 0 -and $byteResults.Count -eq 3) { 'PASS' } else { 'FAIL' }
  checkedAt = [DateTime]::UtcNow.ToString('o')
  checker = 'PowerShell 7 Invoke-WebRequest'
  headConcurrency = $ThrottleLimit
  maximumAttempts = $Attempts
  immutableParts = $parts.Count
  availableParts = @($headResults | Where-Object passed).Count
  checks = @('Every distinct part: HTTP 200', 'Every distinct part: Access-Control-Allow-Origin=*', 'Content-Length equals declared bytes when present', 'Three smallest distinct parts: GET bytes and SHA-256 match')
  headChecks = @($headResults)
  remoteByteChecks = @($byteResults)
  errors = @($errors)
}
$report | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $ReportPath -Encoding utf8
Write-Output ('Result: {0}; HEAD {1}/{2}; GET {3}/3; errors {4}.' -f $report.status, $report.availableParts, $report.immutableParts, @($byteResults | Where-Object passed).Count, $errors.Count)
if ($report.status -ne 'PASS') { exit 1 }
