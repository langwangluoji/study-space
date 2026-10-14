// PDF.js uses these byte encoders in both the page and module worker.
// Install the used subset only when the browser does not provide it.
if (!Uint8Array.prototype.toHex) Object.defineProperty(Uint8Array.prototype,'toHex',{configurable:true,writable:true,value:function(){
 let result='';for(const byte of this)result+=byte.toString(16).padStart(2,'0');return result;
}});
if (!Uint8Array.prototype.toBase64) Object.defineProperty(Uint8Array.prototype,'toBase64',{configurable:true,writable:true,value:function(options={}){
 let binary='';for(let i=0;i<this.length;i+=8192)binary+=String.fromCharCode(...this.subarray(i,i+8192));
 let encoded=btoa(binary);if(options.alphabet==='base64url')encoded=encoded.replaceAll('+','-').replaceAll('/','_');
 return options.omitPadding?encoded.replace(/=+$/,''):encoded;
}});
if (!Uint8Array.fromBase64) Object.defineProperty(Uint8Array,'fromBase64',{configurable:true,writable:true,value:function(value,options={}){
 if(typeof value!=='string')throw new TypeError('Base64 input must be a string');
 if(options.alphabet==='base64url')value=value.replaceAll('-','+').replaceAll('_','/');
 const binary=atob(value);return Uint8Array.from(binary,c=>c.charCodeAt(0));
}});
