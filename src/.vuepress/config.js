import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { slimsearchPlugin } from "@vuepress/plugin-slimsearch";
import { fileURLToPath } from "node:url";

export default defineUserConfig({
  clientConfigFile: fileURLToPath(new URL("./client.js", import.meta.url)).replaceAll(
    "\\",
    "/",
  ),
  lang: "zh-CN",
  title: "星域世界文档库",
  description: "星域世界的官方文档库",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content: "我的世界, Minecraft, 星域世界, 文档, 游戏",
      },
    ],
  ],
  theme: defaultTheme({
    hostname: "https://docs.mcstaralliance.com",
    navbar: [
      {
        text: "Celestia Skin",
        link: "https://skin.mcstaralliance.com/",
      },
      {
        text: "鸣谢名单",
        link: "/acknowledgments",
      },
    ],
    sidebar: [
      {
        text: "首页",
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
        link: "/sponsor-new",
        children: [
          {
            text: "永久礼包",
            link: "/sponsor-new.html#permanent-packages",
          },
          {
            text: "累计礼包",
            link: "/sponsor-new.html#cumulative-packages",
          },
          {
            text: "会员权益",
            link: "/sponsor-new.html#memberships",
          },
          {
            text: "单品",
            link: "/sponsor-new.html#single-products",
          },
          {
            text: "赞助方式",
            link: "/sponsor-new.html#donate",
          },
        ],
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
    themePlugins: {
      mediumZoom: true,
      seo: {
        canonical: "https://docs.mcstaralliance.com",
      },
    },
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
    slimsearchPlugin({
      indexContent: true,
    }),
    googleAnalyticsPlugin({
      id: "G-TDHG0W7MH7",
    }),
  ],
});
