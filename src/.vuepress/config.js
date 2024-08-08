import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '星域世界文档库',
  head: [
    ['link', { rel: 'canonical', href: 'https://help.mcstaralliance.com/' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: '星域世界的官方文档库' }],
    ['meta', { name: 'keywords', content: '我的世界, Minecraft, 星域世界, 文档, 游戏' }],
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: 'Celestia Skin',
        link: 'https://celestia.skin/',
      },
      {
        text: '鸣谢名单',
        link: 'https://help.mcstaralliance.com/acknowledgments',
      }
    ],
    sidebar: [
      {
        text: '欢迎页',
        link: '/'
      },
      {
        text: '萌新教程',
        link: '/newbie-tutorial'
      },
      {
        text: '星域世界赞助表',
        collapsible: true,
        children: [
          {
            text: '赞助前读',
            link: '/sponsor/before-donate'
          },
          {
            text: '单品',
            link: '/sponsor/single-product'

          },
          {
            text: 'VIP制度',
            link: '/sponsor/vip-plan'
          },
        ],
      },
      {
        text: '物品定价标准',
        link: '/price'
      },
      {
        text: '功能性方块摆放规范',
        link: '/blocks-placing-standard'
      },
      {
        text: '公会事务',
        link: '/guild-manage'
      },
      {
        text: '个人私有服务器承接',
        link: '/private-server-support'
      },
      {
        text: '鸣谢名单',
        link: '/acknowledgments'
      }
    ],
    docsRepo: 'mcstaralliance/manual',
    docsBranch: 'main',
    lastUpdatedText: '最后更新 ',
    editLinkText: '帮助我们完善这个页面',
  }),
  bundler: viteBundler(),
  markdown: {
    links: {
      externalAttrs: {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }
  }
})
