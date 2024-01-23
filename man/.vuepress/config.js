module.exports = {
  title: '星域世界文档库',
  themeConfig: {
    nav: [
            { text: 'Celestia Skin（皮肤站）', link: 'https://skin.mcstaralliance.com' },
            { text: '荣誉殿堂', link: 'https://mcstaralliance.netlify.app/honor' },
            { text: '宵夜小店', link: 'https://pay.mcstaralliance.com' }
        ],
    sidebar: [
      ['/', '欢迎页'],
      ['/newbie-tutorial', '萌新教程'],
      ['/faq', '常见问题疑难解答'],
      {
          title: '星域世界赞助表',
          collapsable: true,
          children: [
              '/sponsor/before-donate.html',
              '/sponsor/single-product.html',
              '/sponsor/vip-plan.html'
            ]
      }, 
     {
          title: '灵梦幻域赞助表',
          collapsable: true,
          children: [
              '/sponsor/before-donate.html',
              '/sponsor_dml/single-product.html',
              '/sponsor_dml/vip-plan.html'
            ]
      },
      ['/price', '星域世界物品定价标准'],
      ['/blocks-placing-standard', '星域世界功能性方块摆放规范'],
      ['/guild-manage', '星域世界公会事务'],
      ['/private-server-support', '个人私有服务器承接'],
    ],
    lastUpdated: '最后更新 ',
    repo: 'mcstaralliance/manual',
    docsBranch: 'master',
    docsDir: 'man',
    editLinks: true,
    docsDir: 'man',
    editLinkText: '帮助我们完善这个页面',
    smoothScroll: true
  },
  plugins: {
        "vuepress-plugin-auto-sidebar": {
            titleMode: "titlecase",
        },
    },
    markdown: {
        plugins: [
            "footnote",
            "sup",
            "sub"
        ]
    }
}
