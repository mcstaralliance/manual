import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

export default defineUserConfig({
  lang: "zh-CN",
  title: "星域世界文档库",
  head: [
    ["link", { rel: "canonical", href: "https://docs.mcstaralliance.com/" }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    ["meta", { name: "description", content: "星域世界的官方文档库" }],
    [
      "meta",
      {
        name: "keywords",
        content: "我的世界, Minecraft, 星域世界, 文档, 游戏",
      },
    ],
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: "Celestia Skin",
        link: "https://skin.mcstaralliance.com/",
      },
      {
        text: "鸣谢名单",
        link: "https://docs.mcstaralliance.com/acknowledgments",
      },
    ],
    sidebar: [
      {
        text: "星域世界宣言",
        link: "/",
      },
      {
        text: "萌新教程",
        link: "/newbie-tutorial",
      },
      {
        text: "玩家守则",
        link: "/agreement",
      },
      {
        text: "赞助表",
        link: "/sponsor",
      },
      {
        text: "功能性方块摆放规范",
        link: "/blocks-placing-standard",
      },
      {
        text: "鸣谢",
        link: "/acknowledgments",
      },
    ],
    docsRepo: "mcstaralliance/manual",
    docsBranch: "main",
    lastUpdatedText: "最后更新 ",
    editLinkText: "帮助我们完善这个页面",
  }),
  bundler: viteBundler(),
  markdown: {
    links: {
      externalAttrs: {
        target: "_blank",
        rel: "noopener noreferrer",
      },
    },
  },
  plugins: [
    googleAnalyticsPlugin({
      id: "G-TDHG0W7MH7",
    }),
  ],
});
