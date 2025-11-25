import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Merouin's blog",
  // 网站描述，有利于被搜索引擎捕获
  description:
    "zbwer's tech blog: An undergraduate's journey through frontend development, sharing insights, tips, and experiences in web technologies.",

  // md 文件根目录
  // 【谨慎修改】：一旦修改将引起较多变动
  srcDir: "./src",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/avatar_arc.png',  // 头像路径
    // siteTitle: 'My Custom Title',  // 网站标题

    // 自定义网站顶部的导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/notes/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Navigation',
        items: [
          { text: 'Markdown Examples', link: '/notes/markdown-examples' },
          { text: 'Runtime API Examples', link: '/notes/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liam-Merouin' },
      { icon: 'gmail', link: 'mailto:liam.merouin@gmail.com' },
      { icon: 'bilibili', link: 'https://baidu.com' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Merouin'
    },

    // 是否启动搜索功能
    search: {
      provider: "local",
    },
  },
  // 数学公式支持
  markdown: {
    math: true,
  },
  head: [
    // 设置 favicon 图标
    ['link', { rel: 'icon', href: '/avatar_circle.png' }]
  ]
})
