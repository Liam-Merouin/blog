// 文件路径：.vitepress/theme/index.mts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Waline from './components/Waline.vue' // 引入刚才写的组件

export default {
  extends: DefaultTheme, // 继承默认主题
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 这里的逻辑是：把 Waline 组件插入到文档内容的后面 ('doc-after')
      'doc-after': () => h(Waline)
    })
  }
}