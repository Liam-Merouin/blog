import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Merouin's blog",
  description: "站在风口上，猪也能飞起来！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 自定义网站顶部的导航栏
    logo: '/public/avatar.jpg',  // 头像路径

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liam-Merouin' },
      { icon: 'gmail', link: 'mailto:liam.merouin@gmail.com' },
    ],
  },
  head: [
    // 设置 favicon 图标
    ['link', { rel: 'icon', href: '/public/avatar.jpg' }]
  ]
})
