# 星域世界文档库 VuePress 升级报告

报告日期：2026 年 7 月 26 日

## 一、升级结论

本次已将文档站升级到经过实际构建验证的 VuePress 2 RC 兼容组合，并针对 Vercel 自动构建、依赖安全、SEO、站内链接和站内搜索进行了同步调整。

本报告记录的修改已准备纳入 Git 提交，但尚未推送，因此 Vercel 还没有开始线上部署。将提交推送到 Vercel 关联的 Git 仓库后，才会触发自动构建。

## 二、依赖版本变化

| 依赖 | 升级前实际版本 | 升级后版本 |
| --- | --- | --- |
| `vuepress` | `2.0.0-rc.24` | `2.0.0-rc.30` |
| `@vuepress/bundler-vite` | `2.0.0-rc.7` | `2.0.0-rc.30` |
| `@vuepress/theme-default` | `2.0.0-rc.110` | `2.0.0-rc.132` |
| `@vuepress/plugin-google-analytics` | `2.0.0-rc.112` | `2.0.0-rc.130` |
| `@vuepress/plugin-slimsearch` | 未安装 | `2.0.0-rc.61` |
| `vue` | `3.5.17` | `3.5.40` |
| `sass` | `1.89.2` | `1.102.0` |

同时移除了顶层的 `@vuepress/client` 依赖。该包现在由 VuePress 核心统一提供，避免客户端版本与 VuePress 核心版本不一致。

VuePress 相关 RC 包均改为精确版本，不再使用 `^2.0.0-rc.x` 范围，防止 Vercel 重新安装依赖时自动升级到尚未完全兼容的 RC 版本。

## 三、Vercel 构建适配

项目现在明确指定：

```json
{
  "engines": {
    "node": "24.x"
  },
  "packageManager": "pnpm@10.12.4"
}
```

这样可以避免 Vercel 构建镜像更新后使用不确定的 Node.js 或 pnpm 版本。

本次没有添加 `vercel.json`，不会覆盖 Vercel 控制台中已有的 Build Command、输出目录和域名设置。

锁文件已经分别通过 pnpm 10.12.4 和 pnpm 9.15.9 的冻结安装兼容检查。即使 Vercel 根据项目创建时间选择 pnpm 9，当前锁文件也可以正常解析。

## 四、依赖安全调整

升级后的传递依赖中仍有少量已公开安全公告，因此增加了精确 overrides：

| 依赖 | 安全版本 |
| --- | --- |
| `js-yaml` | `3.15.0` |
| `mdast-util-to-hast` | `13.2.1` |
| `picomatch` | `2.3.2` |
| `rollup` | `4.59.0` |

最终 `pnpm audit` 结果：

| 级别 | 数量 |
| --- | ---: |
| Low | 0 |
| Moderate | 0 |
| High | 0 |
| Critical | 0 |

## 五、SEO 调整

升级前的配置为每一个页面写入了相同的首页 canonical：

```text
https://docs.mcstaralliance.com/
```

这会让搜索引擎误以为赞助页、FAQ、玩家守则等页面都是首页的重复内容。

现在由 VuePress SEO 插件按页面生成正确地址，例如：

```html
<link
  rel="canonical"
  href="https://docs.mcstaralliance.com/sponsor.html"
>
```

本次还完成了以下调整：

- 删除重复的 viewport 标签。
- 使用标准站点 `description` 配置。
- 自动生成页面摘要、Open Graph 和 JSON-LD 信息。
- 自动生成 `sitemap.xml`。
- 自动生成 `robots.txt`，并在其中声明 sitemap 地址。
- sitemap 收录 16 个有效内容页面，不包含 404 页面。

## 六、站内链接调整

共修改 10 个文档内部链接：

- 当前页面内的跳转改为页内锚点。
- 跨文档跳转改为 VuePress 内部路由。
- 导航栏“鸣谢名单”改为内部路由。

修改后，这些链接不会再被识别为外部网站，也不会无故打开新窗口。

## 七、构建验证

为了模拟 Vercel 的全新构建环境，验证前删除了本地 `node_modules`，然后仅依赖 `package.json` 和 `pnpm-lock.yaml` 重新安装。

验证结果：

| 检查项目 | 结果 |
| --- | --- |
| 冻结锁文件安装 | 通过 |
| pnpm 9 锁文件兼容 | 通过 |
| pnpm 10 锁文件兼容 | 通过 |
| VuePress 生产构建 | 通过 |
| 生成 HTML 页面 | 17 个 |
| 总输出文件 | 41 个 |
| 构建时间 | 约 2.3 秒 |
| 页面 canonical | 正常 |
| `sitemap.xml` | 正常生成 |
| `robots.txt` | 正常生成 |
| 内部链接检查 | 通过 |
| 中文搜索入口 | 正常生成 |
| 正文全文索引 | 抽查通过 |
| 依赖安全审计 | 0 个已知问题 |
| Git 空白与格式检查 | 通过 |

验证产生的 `node_modules`、VuePress 输出目录和临时依赖缓存均已清理，没有提交进仓库。

## 八、Slimsearch 是什么

Slimsearch 是 VuePress 官方生态提供的客户端全文搜索插件。

它会在构建网站时为文档生成搜索索引；访问者搜索时，由浏览器中的 Web Worker 查询索引，不需要数据库、搜索服务器或额外的后端接口。

主要优点：

- 可以搜索标题、章节和正文。
- 支持简体中文界面。
- 不依赖第三方搜索服务。
- 文档内容不会发送给外部搜索平台。
- 对当前这种十几个页面的静态文档站，索引体积和运行成本都比较低。

需要注意：

- 默认只索引标题、页面摘要和自定义字段。
- 如果希望搜索赞助表、教程正文，需要启用 `indexContent: true`。
- 启用后会增加少量构建时间和搜索索引文件体积。
- 它只负责“搜索内容”，不会自动整理侧边栏或判断哪些旧页面应该隐藏。

官方文档：

<https://ecosystem.vuejs.press/plugins/search/slimsearch.html>

当前项目已安装 Slimsearch，并启用了：

```js
slimsearchPlugin({
  indexContent: true,
})
```

构建产物中已生成中文搜索按钮、`Ctrl+K` 快捷键和 `slimsearch.worker.js`。抽查正文深层词条可以在 Worker 索引中找到，确认不是仅索引标题。

安装时 pnpm 10 可能显示一条 VuePress peer 版本警告。这是 Slimsearch 当前包清单仍声明较早的 VuePress 2 RC 版本所致；本次已经分别完成 pnpm 9、pnpm 10 安装验证和 VuePress 生产构建，警告不会阻止当前项目构建。

## 九、后续可选优化

以下内容尚未在本次升级中实施：

1. 为 24 张远程图片增加懒加载和明确尺寸。
2. 补充 6 张缺少的图片替代文本。
3. 整理侧边栏未展示的页面。
4. 确认过期活动和旧赞助方案是否应从 sitemap 和搜索索引排除。

这些项目不会影响本次升级后的正常构建，可以按需求分批处理。

## 十、涉及文件

- `package.json`
- `pnpm-lock.yaml`
- `src/.vuepress/config.js`
- `src/sponsor.md`
- `src/sponsor/vip-plan.md`

本报告文件：`UPGRADE_REPORT.md`
