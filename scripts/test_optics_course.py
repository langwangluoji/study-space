import unittest
from optics_course import compile_lesson,contrast_ratio,legacy_aliases

class CourseTests(unittest.TestCase):
    def test_chapter_links_images_and_math(self):
        text='# 9.1 界面\n\n[波片](../第09章 界面/9.2 晶体.md)\n\n![图](../assets/ppt/interface.png)\n\n<!-- optics-detail:start -->\n#### 推导\n\n$$r_s^2+T_s=1$$\n<!-- optics-detail:end -->'
        actual=compile_lesson(text,{'9.2 晶体':'optics-ch09-s02'})
        self.assertIn('(optics-ch09-s02.html)',actual)
        self.assertIn('(/optics/figures/interface.png)',actual)
        self.assertIn('$$r_s^2+T_s=1$$',actual)
        self.assertIn('<details',actual)
        self.assertNotIn('optics-detail:',actual)

    def test_emphasis_contrast_is_readable(self):
        for fg,bg in [('#b42318','#ffffff'),('#175cd3','#ffffff'),('#854d0e','#ffffff'),('#6941c6','#ffffff'),('#ffb4a8','#1e1e1e'),('#93c5fd','#1e1e1e'),('#fde68a','#1e1e1e'),('#d6bbfb','#1e1e1e')]:
            self.assertGreaterEqual(contrast_ratio(fg,bg),4.5,(fg,bg))

    def test_same_review_filename_in_different_chapters(self):
        links={'第01章/本章复习.md':'optics-ch01-review','第02章/本章复习.md':'optics-ch02-review'}
        source='[一](第01章/本章复习.md) [二](第02章/本章复习.md)'
        actual=compile_lesson(source,links)
        self.assertIn('(optics-ch01-review.html)',actual)
        self.assertIn('(optics-ch02-review.html)',actual)

    def test_old_concept_link_follows_subject_after_heading_depth_changes(self):
        body='# 光学PPT复习：概念、现象条件与公式记忆\n\n## 第1章 考点与概念复习\n\n导论\n\n#### 激光三要素各自解决什么问题\n\n工作物质、泵浦和谐振腔。\n'
        actual=legacy_aliases('review-optics',body)
        anchor='_1-激光器的三要素是什么-分别起什么作用'
        self.assertGreater(actual.index('id="'+anchor+'"'),actual.index('## 第1章'))
        self.assertLess(actual.index('id="'+anchor+'"'),actual.index('#### 激光三要素'))

    def test_same_page_fragment_does_not_resolve_to_chapter_folder(self):
        actual=compile_lesson('[光程](#ppt-optical-path)',{'第07章 传播':'optics-ch07'},'第07章 传播/本章复习.md')
        self.assertEqual(actual,'[光程](#ppt-optical-path)')

if __name__=='__main__':unittest.main()
