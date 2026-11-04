import unittest
from optics_content import web_details,local_details,portable_links,merge_figures

class OpticsContentTests(unittest.TestCase):
    def test_math_and_heading_anchors_remain_visible(self):
        source='<!-- optics-detail:start -->\n#### 详细推导：阈值\n\n$$x^2$$\n\n<a id="old"></a>\n### 4.2 纵模\n\n下一段\n<!-- optics-detail:end -->'
        rendered=web_details(source)
        self.assertIn('$$x^2$$',rendered)
        self.assertIn('</details>\n\n<a id="old"></a>',rendered)
        self.assertNotIn('optics-detail:',rendered)
        self.assertEqual(rendered.count('<details'),2)
        self.assertEqual(rendered.count('</details>'),2)
        self.assertEqual(local_details(rendered).count('$$x^2$$'),1)
        self.assertNotIn('<details',local_details(rendered))

    def test_reject_nested_regions(self):
        with self.assertRaises(ValueError):web_details('<!-- optics-detail:start -->a<!-- optics-detail:start -->b<!-- optics-detail:end -->')

    def test_parenthesized_source_link_and_vault_fragment(self):
        source='[课件](../PPT/光学20261012_相干辐射(1).pdf) [章节](03%20相干辐射与激光.md#激光器的三要素) ![图](assets/ppt/test.png)'
        actual=portable_links(source)
        self.assertIn('[课件](optics-sources.html)',actual)
        self.assertIn('(optics-laser.html#激光器的三要素)',actual)
        self.assertIn('(/optics/figures/test.png)',actual)
        self.assertNotIn('.pdf)',actual)

    def test_figure_source_fields_survive_export(self):
        old=[{'file':'one.png','sourcePdf':'课件.pdf','pdfPage':7,'cropPixels':[1,2,3,4]}]
        actual=merge_figures(old,[{'file':'one.png','bytes':123,'sha256':'abc'}])
        self.assertEqual(actual[0]['pdfPage'],7)
        self.assertEqual(actual[0]['cropPixels'],[1,2,3,4])
        self.assertEqual(actual[0]['bytes'],123)

if __name__=='__main__':unittest.main()
