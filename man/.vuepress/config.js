module.exports = {
  title: '星域联盟文档库',
  themeConfig: {
    sidebar: [
      ['/', '欢迎页'],
      ['/tutorial', '萌新教程'],
      ['/attention-question', '应注意的问题'],
      ['/faq', '常见问题疑难解答'],
      ['/ingame-ask-question', '游戏内容疑难解答'],
      ['/special-question', '特殊问题'],
      ['/sponsor', '星域世界赞助表'],
      ['/price', '星域世界物品定价标准'],
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
