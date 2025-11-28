import { defineConfig, createContentLoader } from 'vitepress'
import { Feed } from 'feed'
import path from 'path'
import { writeFileSync } from 'fs'

// 🚨 【请务必修改】这里换成你部署后的真实域名，不要带最后的斜杠
const hostname = 'https://merouin.top'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Merouin's blog",
  // 网站描述，有利于被搜索引擎捕获
  description:
    "Merouin's tech blog: An undergraduate's journey through frontend development, sharing insights, tips, and experiences in web technologies.",

  // md 文件根目录
  // 【谨慎修改】：一旦修改将引起较多变动
  srcDir: "./src",

  lastUpdated: true, // 显示最后更新时间

  // 1. 在 head 中注册 RSS，这样浏览器插件能检测到
  head: [
    // 设置 favicon 图标
    ['link', { rel: 'icon', href: '/avatar_circle.png' }],
    // RSS 源链接
    ['link', { rel: 'alternate', type: 'application/rss+xml', href: `${hostname}/feed.xml`, title: 'RSS Feed' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/avatar_arc.png',  // 头像路径
    // siteTitle: 'My Custom Title',  // 网站标题

    // 添加编辑此页链接
    editLink: {
      pattern: 'https://github.com/Liam-Merouin/blog/edit/master/docs/src/:path',
      text: 'Edit this page on GitHub'
    },

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
      // 注意：VitePress 默认图标库可能没有 gmail，如果没有显示图标，可以找一个 svg 替换
      { icon: 'gmail', link: 'mailto:liam.merouin@gmail.com' },
      // 2. 添加 RSS 图标
      { 
        icon: { 
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>' 
        }, 
        link: '/feed.xml' 
      }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Liam Ma'
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

  // 3. 构建结束时生成 RSS 文件
  buildEnd: async (config) => {
    const feed = new Feed({
      title: "Merouin's blog",
      description: "Merouin's tech blog",
      id: hostname,
      link: hostname,
      language: 'zh-CN',
      image: `${hostname}/avatar_arc.png`, // 引用你的 logo
      favicon: `${hostname}/avatar_circle.png`,
      copyright: 'Copyright (c) 2024-present, Liam Ma'
    })

    // 加载文章：这里我设置了匹配 notes 目录下的所有 md 文件
    // 如果你有其他目录，可以改成 '**/*.md'，但要记得过滤掉 index.md
    const posts = await createContentLoader('src/notes/*.md', {
      excerpt: true,
      render: true
    }).load()

    // 按日期排序
    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    )

    // 遍历文章
    for (const { url, excerpt, frontmatter, html } of posts) {
      // ⚠️ 只有在文章 Frontmatter 中写了 date: YYYY-MM-DD 的文章才会被收录
      if (!frontmatter.date) continue
      
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: excerpt,
        content: html,
        author: [
          {
            name: 'Merouin',
            email: 'liam.merouin@gmail.com',
            link: hostname
          }
        ],
        date: frontmatter.date
      })
    }

    // 写入文件
    writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2())
  }
})