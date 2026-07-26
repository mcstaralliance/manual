<script setup>
import { ref } from "vue";

const copied = ref(false);

const ae = {
  cell64:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/item_storage_cell_64k.K1jtiiFOsMAW.png",
  crafting16:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/crafting_cpu_multiblock_blockimage9%404.26tcmkrYLXlk.png",
  crafting64:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/crafting_cpu_multiblock_blockimage10%404.gSCVtOLEPtPI.png",
  assembler:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/molecular_assembler_blockimage1%404.xE5Y6DQPoRlG.png",
  interface:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/interface_blockimage1%404.VS6gEdXKX5ob.png",
  provider:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/pattern_provider_blockimage1%404.vpqq1q7yDkUF.png",
  pattern:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/blank_pattern.n7YZtCOXHOWH.png",
  craftingTerminal:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/crafting_terminal.H6iS2NNiFG4R.png",
  patternTerminal:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/pattern_encoding_terminal.DF3mdZyiEIyz.png",
  controller:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/controller_blockimage1.Lm3T9bFApBbY.png",
  drive:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/drive.BM6iUXvFZUtE.png",
  smartCable:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/fluix_smart_cable.MrCeC1zPfTBj.png",
  speedCard:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/%21items/ae2/speed_card.x5UcR3O6vNhS.png",
  coprocessor:
    "https://guide-assets.appliedenergistics.org/minecraft-1.20.1/ae2/items-blocks-machines/crafting_cpu_multiblock_blockimage12%404.TnIMU7kl3yPk.png",
  inscriber:
    "https://raw.githubusercontent.com/GlodBlock/ExtendedAE/1694d22005a65bf73faed2aca4d5b33881a5386d/src/main/resources/assets/expatternprovider/textures/block/ex_inscriber.png",
};

const botaniaRoot =
  "https://raw.githubusercontent.com/VazkiiMods/Botania/6ff053c73fe67ea06b8251f916dcc03f263b6089/Xplat/src/main/resources/assets/botania/textures";
const botania = {
  gaiaSpreader: `${botaniaRoot}/block/gaia_spreader_side.png`,
  gourmaryllis: `${botaniaRoot}/block/gourmaryllis.png`,
  kekimurus: `${botaniaRoot}/block/kekimurus.png`,
  dandelifeon: `${botaniaRoot}/block/dandelifeon.png`,
  manaPool: `${botaniaRoot}/block/mana_pool_top.png`,
  terraPlate: `${botaniaRoot}/block/terra_plate_top.png`,
  manaTablet: `${botaniaRoot}/item/mana_tablet.png`,
  terraSword: `${botaniaRoot}/item/terra_sword.png`,
  elementiumArmor: `${botaniaRoot}/item/elementium_chestplate.png`,
  manaPylon: `${botaniaRoot}/block/manasteel_block.png`,
  brewery: `${botaniaRoot}/model/brewery.png`,
  naturaPylon: `${botaniaRoot}/block/terrasteel_block.png`,
  terraPick: `${botaniaRoot}/item/terra_pick.png`,
};

const minecraft = {
  lapis:
    "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.1/assets/minecraft/textures/block/lapis_block.png",
};

const aeBaseItems = [
  { name: "64k-ME 存储元件", qty: 4, icon: ae.cell64 },
  { name: "16k 合成存储器", qty: 2, icon: ae.crafting16 },
  { name: "分子装配室", qty: 8, icon: ae.assembler },
  { name: "ME 接口", qty: 8, icon: ae.interface },
  { name: "ME 样板供应器", qty: 8, icon: ae.provider },
  { name: "空白样板", qty: 16, icon: ae.pattern },
  { name: "合成终端", qty: 1, icon: ae.craftingTerminal },
  { name: "样板终端", qty: 1, icon: ae.patternTerminal },
  { name: "ME 控制器", qty: 2, icon: ae.controller },
  { name: "ME 驱动器", qty: 2, icon: ae.drive },
  { name: "ME 智能线缆", qty: 16, icon: ae.smartCable },
];

const aeAdvancedItems = [
  { name: "64k-ME 存储元件", qty: 8, icon: ae.cell64 },
  { name: "64k 合成存储器", qty: 2, icon: ae.crafting64 },
  { name: "分子装配室", qty: 24, icon: ae.assembler },
  { name: "ME 接口", qty: 24, icon: ae.interface },
  { name: "ME 样板供应器", qty: 24, icon: ae.provider },
  { name: "空白样板", qty: 32, icon: ae.pattern },
  { name: "合成终端", qty: 1, icon: ae.craftingTerminal },
  { name: "样板终端", qty: 1, icon: ae.patternTerminal },
  { name: "ME 控制器", qty: 4, icon: ae.controller },
  { name: "ME 驱动器", qty: 4, icon: ae.drive },
  { name: "ME 智能线缆", qty: 48, icon: ae.smartCable },
  { name: "加速卡", qty: 16, icon: ae.speedCard },
  { name: "并行处理单元", qty: 4, icon: ae.coprocessor },
  { name: "拓展压印器", qty: 1, icon: ae.inscriber },
];

const plantItems = [
  { name: "盖亚魔力发射器", qty: 5, icon: botania.gaiaSpreader },
  { name: "彼方兰", qty: 10, icon: botania.gourmaryllis },
  { name: "贪食花", qty: 4, icon: botania.kekimurus },
  { name: "启命英", qty: 2, icon: botania.dandelifeon },
  { name: "青金石块", qty: 20, icon: minecraft.lapis },
  { name: "泰拉凝聚板", qty: 2, icon: botania.terraPlate },
  { name: "神话魔力池", qty: 2, icon: botania.manaPool },
  { name: "魔力石板（满）", qty: 1, icon: botania.manaTablet },
  { name: "泰拉之刃", qty: 1, icon: botania.terraSword },
  { name: "源质钢套", qty: 1, icon: botania.elementiumArmor },
  { name: "魔法水晶", qty: 10, icon: botania.manaPylon },
  { name: "植物酿造台", qty: 1, icon: botania.brewery },
  { name: "自然水晶", qty: 2, icon: botania.naturaPylon },
  { name: "泰拉粉碎者（C 级）", qty: 1, icon: botania.terraPick },
];

const permanentPackages = [
  {
    name: "永久 AE 基础包",
    price: 45,
    items: aeBaseItems,
    open: true,
  },
  {
    name: "永久 AE 高级包",
    price: 75,
    items: aeAdvancedItems,
  },
  {
    name: "永久 MEK 基础包",
    price: 45,
    image: "https://s2.loli.net/2025/07/15/2LCiufEAvsHklZ9.png",
    imageAlt: "永久 MEK 基础包完整物品图",
  },
  {
    name: "永久 MEK 高级包",
    price: 75,
    image: "https://s2.loli.net/2025/07/15/EhJb2YIBu6dUQ19.png",
    imageAlt: "永久 MEK 高级包完整物品图",
  },
  {
    name: "永久高级植物包",
    price: 49,
    items: plantItems,
  },
];

const singleProducts = [
  ["天堂陨落长弓", "69", "永久", ""],
  ["加速火把", "50 / 75", "一周目 / 永久", "50 元一周目，75 元永久"],
  ["压缩加速火把", "199 / 325", "一周目 / 永久", "拥有 6 个永久普通加速火把可免费升级"],
  ["二重压缩加速火把", "699", "永久", ""],
  ["创造弹药盒", "50", "永久", ""],
  ["全类型创造弹药盒", "75", "永久", ""],
  ["创造模式法术书", "299", "永久", ""],
  ["创造魔源罐", "299", "永久", ""],
  ["创造能量立方", "1000", "永久", ""],
  ["永恒魔力池", "299", "永久", ""],
  ["自定义称号", "5", "一次性", ""],
  ["创造魔力石板", "99", "永久", ""],
  ["泰拉粉碎者 SS 级", "99", "永久", "建议配合创造魔力石板使用"],
  ["区块加载", "199", "永久", "可持续加载 1 个区块；多个区块请联系服主"],
  ["凋灵骷髅头颅", "1", "一次性", ""],
  ["10 点券", "1", "账户永久", "未用完点券会保存在游戏账户中"],
  ["世界崩解之镐", "399", "永久", ""],
  ["星球吞噬之铲", "199", "永久", ""],
  ["自然荒芜之斧", "199", "永久", ""],
  ["地蕴复生之锄", "99", "永久", ""],
  ["刷怪笼", "100", "永久", "自选要刷的怪物"],
  ["寰宇支配之剑", "1000", "永久", ""],
  ["无尽套", "1500", "永久", ""],
  ["私人定制子服", "900", "2 周目", "可定制 Mod、插件、封禁物品等，详情私聊服主"],
  ["64k 存储元件", "5", "一次性", ""],
  ["超级派蒙旋风矿机 Lite", "199", "永久", "25 秒生产一次，每 Tick 需要 200 FE"],
  ["超级派蒙旋风矿机 Pro", "1000", "永久", "1 秒生产一次，每 Tick 消耗 100 FE"],
  ["1000 硬币", "5", "一次性", ""],
];

const cumulativePackages = [
  {
    amount: 30,
    items: [
      "钢锭 ×64",
      "ME 智能线缆 ×32",
      "ME 致密线缆 ×16",
      "通量网络输入点 / 输出点 ×8",
      "通量网络控制器 ×1",
      "VIP、VIP+ 任意等级续费机会一次",
    ],
  },
  {
    amount: 60,
    items: [
      "64k ME 存储元件 ×8",
      "64k ME 流体存储元件 ×8",
      "SVIP、SVIP+、MVP 任意等级续费机会一次",
    ],
  },
  {
    amount: 150,
    items: ["自选幻想之刃拔刀一把（一周目）"],
  },
  {
    amount: 350,
    items: [
      "炼造催化器 ×1",
      "挑战券 ×5",
      "创造弹药盒 ×1",
      "超级派蒙旋风矿机 Lite（一周目）",
    ],
  },
  {
    amount: 550,
    items: ["超级派蒙旋风矿机 Pro（一周目）", "加速火把 ×1"],
  },
];

const commonPrivileges = [
  "/co i 查询权限",
  "/fly 飞行权限",
  "/tpa、/tpahere、/home 无冷却、无等待",
  "/tppos 传送坐标权限",
  "/ender 随身末影箱权限",
  "/workbench 随身工作台权限",
  "/top 传送至顶部权限",
  "/ride 骑乘任意实体权限",
  "加入满员服务器权限",
];

const memberships = [
  {
    name: "VIP",
    price: 19,
    renewal: "9 元 / 周目",
    stats: ["2000 硬币", "经验 30 级", "5 个家"],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft/vip-1.png",
      "https://resource.mcstaralliance.com/images/starcraft/vip-2.png",
    ],
    privileges: commonPrivileges,
  },
  {
    name: "VIP+",
    price: 68,
    renewal: "19 元 / 周目",
    stats: ["3000 硬币", "经验 60 级", "10 个家"],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft/vip%2B-1.png",
      "https://resource.mcstaralliance.com/images/starcraft/vip%2B-2.png",
    ],
    privileges: [...commonPrivileges, "免费授权指定 YSM 模型"],
  },
  {
    name: "SVIP",
    price: 168,
    renewal: "39 元 / 周目",
    stats: ["6500 硬币", "经验 80 级", "14 个家"],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft/svip-1.png",
      "https://resource.mcstaralliance.com/images/starcraft/svip-2.png",
    ],
    privileges: [...commonPrivileges, "免费授权指定 YSM 模型"],
  },
  {
    name: "SVIP+",
    price: 328,
    renewal: "39 元 / 周目",
    stats: ["8000 硬币", "经验 100 级", "16 个家"],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft/svip%2B-1.png",
      "https://resource.mcstaralliance.com/images/starcraft/svip%2B-2.png",
      "https://resource.mcstaralliance.com/images/starcraft/after-svip%2B.png",
    ],
    privileges: [
      ...commonPrivileges,
      "/nohunger switch 自由切换永不饥饿",
      "免费授权指定 YSM 模型",
    ],
  },
  {
    name: "MVP",
    price: 548,
    renewal: "39 元 / 周目",
    stats: ["12000 硬币", "经验 140 级", "16 个家"],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft/mvp-1.png",
      "https://resource.mcstaralliance.com/images/starcraft/mvp-2.png",
      "https://resource.mcstaralliance.com/images/starcraft/mvp-3.png",
      "https://resource.mcstaralliance.com/images/starcraft/after-svip%2B.png",
    ],
    privileges: [
      ...commonPrivileges,
      "/nohunger switch 自由切换永不饥饿",
      "免费授权指定 YSM 模型",
      "随身铁砧权限",
    ],
  },
  {
    name: "MVP+",
    price: 875,
    renewal: "无需续费（限时特惠）",
    stats: ["20000 硬币", "经验 180 级", "20 个家"],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft/mvp%2B-1.png",
      "https://resource.mcstaralliance.com/images/starcraft/mvp%2B-2.png",
      "https://resource.mcstaralliance.com/images/starcraft/mvp%2B-3.png",
      "https://resource.mcstaralliance.com/images/starcraft/mvp%2B-4.png",
    ],
    privileges: [
      ...commonPrivileges,
      "/heal 回复血量以及饱食度",
      "/nohunger switch 自由切换永不饥饿",
      "免费授权指定 YSM 模型",
      "随身铁砧权限",
      "领地上限 20",
    ],
  },
  {
    name: "超新星",
    price: 1888,
    priceLabel: "获得条件",
    renewal: "游玩的周目累计赞助 200 元",
    stats: ["MVP+ 礼包及特权", "80000 硬币", "每周目 2 次珍稀抽奖"],
    privileges: [
      "所有颜色鸡、8 个鸡舍、4 级鸡饲料、训练鸡器、灵魂提取器",
      "每周目指定一名玩家，赠送 VIP 至 SVIP 任意一级会员（一周目）",
      "定制一把任意等级附魔武器或其他装备",
      "压缩加速火把 ×2",
      "幻想之刃拔刀剑任选一把",
      "区块加载器",
      "专属管理员 WE 地形编辑服务",
      "优先了解服务器最新消息",
      "免费授权指定 YSM 模型",
    ],
  },
];

async function copyQQ() {
  try {
    await navigator.clipboard.writeText("934664404");
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    window.prompt("请复制服主 QQ", "934664404");
  }
}
</script>

<template>
  <div class="sponsor-catalog">
    <header class="sponsor-hero">
      <div class="hero-copy">
        <p class="eyebrow">新版赞助表 · 试运行</p>
        <h1>星域世界赞助说明</h1>
        <p class="hero-lead">
          除特别说明外，单品、礼包和附魔均为永久，可在每周目继承。永久物品若因模组调整无法继续提供，可免费更换等价物品。
        </p>
        <div class="hero-points">
          <span><strong>永久物品</strong> 每周目继承</span>
          <span><strong>内容完整</strong> 展开即可逐项核对</span>
          <span><strong>直接联系</strong> 群主即服主</span>
        </div>
      </div>
      <div class="hero-actions">
        <button class="primary-action" type="button" @click="copyQQ">
          {{ copied ? "QQ 已复制" : "复制服主 QQ 934664404" }}
        </button>
        <a class="secondary-action" href="/sponsor.html">查看旧版赞助表</a>
        <small>新版试运行中，可随时切换回旧版</small>
      </div>
    </header>

    <nav class="section-nav" aria-label="赞助表内容导航">
      <a href="#single-products">单品</a>
      <a class="active" href="#permanent-packages">永久礼包</a>
      <a href="#cumulative-packages">累计礼包</a>
      <a href="#memberships">会员权益</a>
      <a href="#donate">赞助方式</a>
    </nav>

    <section id="permanent-packages" class="catalog-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">礼包内容</p>
          <h2>永久礼包</h2>
        </div>
        <p>一次购买，永久拥有。点击礼包标题展开完整清单。</p>
      </div>

      <div class="package-stack">
        <details
          v-for="pack in permanentPackages"
          :key="pack.name"
          class="package-card"
          :open="pack.open"
        >
          <summary>
            <span class="package-name">{{ pack.name }}</span>
            <span class="price-badge">¥{{ pack.price }} / 永久</span>
            <span class="summary-hint summary-hint-open">已展开</span>
            <span class="summary-hint summary-hint-closed">查看完整清单</span>
          </summary>
          <div class="package-content">
            <div v-if="pack.items" class="item-grid">
              <div v-for="item in pack.items" :key="item.name" class="item-row">
                <span class="item-icon">
                  <img
                    :src="item.icon"
                    :alt="`${item.name}游戏图标`"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </span>
                <span class="item-name">{{ item.name }}</span>
                <strong class="item-qty">×{{ item.qty }}</strong>
              </div>
            </div>
            <figure v-else class="package-image">
              <img :src="pack.image" :alt="pack.imageAlt" loading="lazy" />
              <figcaption>原礼包清单图片，点击图片可在浏览器中放大查看。</figcaption>
            </figure>
          </div>
        </details>
      </div>
    </section>

    <section id="cumulative-packages" class="catalog-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">本周目进度</p>
          <h2>周目累计赞助礼包</h2>
        </div>
        <p>达到档位即可领取，并可同时领取之前档位。换周目后重新累计。</p>
      </div>
      <div class="notice">
        续费会员的赞助金额不计入周目累计赞助。例如累计赞助 550 元，可领取全部五档累计礼包。
      </div>
      <div class="milestone-grid">
        <details
          v-for="pack in cumulativePackages"
          :key="pack.amount"
          class="milestone-card"
        >
          <summary>
            <span><strong>累计 ¥{{ pack.amount }}</strong><small>达标可领取</small></span>
            <span>查看 {{ pack.items.length }} 项内容</span>
          </summary>
          <ul>
            <li v-for="item in pack.items" :key="item">{{ item }}</li>
          </ul>
        </details>
      </div>
    </section>

    <section id="memberships" class="catalog-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">按游玩周目续费</p>
          <h2>会员权益</h2>
        </div>
        <p>不玩不续费，续费资格永久保留；可通过补差价升级。</p>
      </div>
      <div class="notice">
        第二十周目所有会员礼包均额外赠送三角洲北极星一把。VIP / VIP+ 可通过 30 元累计礼包续费；SVIP 至 MVP 可通过 60 元累计礼包续费。
      </div>
      <div class="membership-grid">
        <details
          v-for="member in memberships"
          :key="member.name"
          class="membership-card"
        >
          <summary>
            <span class="membership-title">
              <strong>{{ member.name }}</strong>
              <small>续费：{{ member.renewal }}</small>
            </span>
            <span class="membership-price">
              <small>{{ member.priceLabel || "首次赞助" }}</small>
              ¥{{ member.price }}
            </span>
          </summary>
          <div class="membership-content">
            <div class="stat-row">
              <span v-for="stat in member.stats" :key="stat">{{ stat }}</span>
            </div>
            <div v-if="member.images" class="benefit-images">
              <a
                v-for="(image, index) in member.images"
                :key="image"
                :href="image"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  :src="image"
                  :alt="`${member.name} 礼包物品图 ${index + 1}`"
                  loading="lazy"
                />
              </a>
            </div>
            <h3>权益清单</h3>
            <ul class="privilege-list">
              <li v-for="item in member.privileges" :key="item">{{ item }}</li>
            </ul>
          </div>
        </details>
      </div>
    </section>

    <section id="single-products" class="catalog-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">按需选择</p>
          <h2>单品</h2>
        </div>
        <p>支持购买更多其他单品，有需要可直接联系服主。</p>
      </div>
      <div class="product-table-wrap">
        <table class="product-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>价格（元）</th>
              <th>时效</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in singleProducts" :key="product[0]">
              <th>{{ product[0] }}</th>
              <td class="table-price">{{ product[1] }}</td>
              <td>{{ product[2] }}</td>
              <td>{{ product[3] || "—" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="catalog-section compact-section">
      <div class="service-grid">
        <article>
          <p class="section-kicker">永久定制</p>
          <h2>附魔</h2>
          <p>任意一个属性一级 3 元；抢夺、时运 6 元一级。其他定制需求可私聊服主。</p>
        </article>
        <article>
          <p class="section-kicker">会员附加权益</p>
          <h2>YSM 模型无限量授权</h2>
          <p>VIP+ 及以上会员可获得 YSM 模型无限量授权，将希望使用的模型文件发给服主即可。</p>
        </article>
        <article>
          <p class="section-kicker">长期空间</p>
          <h2>永久独立世界 · ¥399</h2>
          <p>可邀请其他玩家进入，大小和资源不限；管理员可协助平地、搬迁和回档。</p>
        </article>
      </div>
    </section>

    <section id="donate" class="contact-panel">
      <div>
        <p class="section-kicker">准备好了？</p>
        <h2>通过 QQ 联系服主</h2>
        <p>QQ：934664404。群主就是服主，确认礼包内容后再完成赞助。</p>
      </div>
      <button class="primary-action" type="button" @click="copyQQ">
        {{ copied ? "QQ 已复制" : "复制 QQ 934664404" }}
      </button>
    </section>

    <footer class="asset-note">
      AE2 与 Botania 物品图标来自对应模组的官方资源；礼包名称、数量和价格沿用旧版赞助表。
    </footer>
  </div>
</template>

<style scoped>
.sponsor-catalog {
  --sponsor-ink: #17233b;
  --sponsor-muted: #607086;
  --sponsor-navy: #132b49;
  --sponsor-blue: #2e7cf6;
  --sponsor-green: #139365;
  --sponsor-border: #d9e1ea;
  --sponsor-panel: #f7f9fc;
  color: var(--sponsor-ink);
}

.sponsor-catalog * {
  box-sizing: border-box;
}

.sponsor-catalog h1,
.sponsor-catalog h2,
.sponsor-catalog h3 {
  padding-top: 0 !important;
}

.sponsor-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 2rem;
  margin: 0 0 1.8rem;
  padding: 1.65rem;
  border: 1px solid #bfdbcf;
  border-radius: 12px;
  background: #fbfdfc;
}

.eyebrow,
.section-kicker {
  margin: 0 0 0.4rem;
  color: var(--sponsor-green);
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sponsor-hero h1 {
  margin: 0;
  border: 0;
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  letter-spacing: -0.035em;
  line-height: 1.18;
}

.hero-lead {
  max-width: 690px;
  margin: 0.85rem 0 1.15rem;
  color: var(--sponsor-muted);
  line-height: 1.75;
}

.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.15rem;
  color: #536276;
  font-size: 0.9rem;
}

.hero-points strong {
  color: var(--sponsor-ink);
}

.hero-actions {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  gap: 0.65rem;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  font: inherit;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.primary-action {
  border: 1px solid var(--sponsor-blue);
  background: var(--sponsor-blue);
  color: #fff;
}

.secondary-action {
  border: 1px solid var(--sponsor-blue);
  background: #fff;
  color: #1f64ca;
}

.primary-action:hover,
.primary-action:focus-visible {
  border-color: #155fcf;
  background: #155fcf;
}

.secondary-action:hover,
.secondary-action:focus-visible {
  background: #edf5ff;
  color: #174f9c;
}

.hero-actions small {
  color: #778599;
  font-size: 0.76rem;
  line-height: 1.45;
  text-align: center;
}

.section-nav {
  position: sticky;
  z-index: 8;
  top: calc(var(--navbar-height) + 0.5rem);
  display: flex;
  gap: 0.3rem;
  margin: 0 0 2.4rem;
  padding: 0.45rem;
  overflow-x: auto;
  border: 1px solid var(--sponsor-border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 6px 18px rgba(24, 41, 68, 0.06);
  scrollbar-width: none;
}

.section-nav::-webkit-scrollbar {
  display: none;
}

.section-nav a {
  flex: 1 0 max-content;
  padding: 0.6rem 0.85rem;
  border-radius: 7px;
  color: #3e4e64;
  font-size: 0.9rem;
  font-weight: 650;
  text-align: center;
  text-decoration: none;
}

.section-nav a:hover,
.section-nav a:focus-visible,
.section-nav a.active {
  background: #eaf8f2;
  color: #08744c;
}

.catalog-section {
  margin: 0 0 3.4rem;
  scroll-margin-top: calc(var(--navbar-height) + 6rem);
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.1rem;
}

.section-heading h2,
.contact-panel h2,
.service-grid h2 {
  margin: 0;
  border: 0;
  color: var(--sponsor-ink);
}

.section-heading h2 {
  padding-left: 0.7rem;
  border-left: 4px solid var(--sponsor-green);
  font-size: 1.65rem;
}

.section-heading > p {
  max-width: 470px;
  margin: 0;
  color: var(--sponsor-muted);
  font-size: 0.92rem;
  line-height: 1.6;
  text-align: right;
}

.package-stack,
.membership-grid,
.milestone-grid {
  display: grid;
  gap: 0.85rem;
}

.package-card,
.milestone-card,
.membership-card {
  overflow: clip;
  border: 1px solid var(--sponsor-border);
  border-radius: 10px;
  background: #fff;
}

.package-card > summary,
.membership-card > summary {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 64px;
  padding: 0.9rem 1.15rem;
  background: var(--sponsor-navy);
  color: #fff;
  cursor: pointer;
  list-style-position: inside;
}

.package-card > summary::marker,
.membership-card > summary::marker {
  color: #cbd9e8;
}

.package-name {
  font-size: 1.05rem;
  font-weight: 750;
}

.price-badge {
  flex: none;
  padding: 0.35rem 0.65rem;
  border-radius: 7px;
  background: var(--sponsor-blue);
  font-weight: 750;
}

.summary-hint {
  margin-left: auto;
  color: #c8d6e7;
  font-size: 0.8rem;
}

.summary-hint-open {
  display: none;
  color: #7ae0ac;
}

.package-card[open] .summary-hint-open {
  display: inline;
}

.package-card[open] .summary-hint-closed {
  display: none;
}

.package-content {
  padding: 1.25rem;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 1.5rem;
}

.item-row {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  min-height: 70px;
  border-bottom: 1px solid #e6ebf1;
}

.item-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  overflow: hidden;
  border: 1px solid #dce3ea;
  border-radius: 8px;
  background: #f4f7fa;
}

.item-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  image-rendering: pixelated;
}

.item-name {
  min-width: 0;
  font-weight: 620;
  line-height: 1.35;
}

.item-qty {
  color: #33445a;
  font-variant-numeric: tabular-nums;
}

.package-image {
  margin: 0;
}

.package-image img {
  display: block;
  width: auto;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 8px;
}

.package-image figcaption {
  margin-top: 0.75rem;
  color: var(--sponsor-muted);
  font-size: 0.8rem;
  text-align: center;
}

.notice {
  margin-bottom: 1rem;
  padding: 0.9rem 1rem;
  border: 1px solid #cfe2d8;
  border-radius: 8px;
  background: #f4fbf8;
  color: #40584d;
  font-size: 0.9rem;
  line-height: 1.65;
}

.milestone-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.milestone-card > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.milestone-card > summary span:first-child {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.milestone-card > summary strong {
  font-size: 1.1rem;
}

.milestone-card > summary small,
.milestone-card > summary span:last-child {
  color: var(--sponsor-muted);
  font-size: 0.78rem;
}

.milestone-card ul {
  margin: 0;
  padding: 0 1.25rem 1rem 2.2rem;
  color: #44546a;
  line-height: 1.75;
}

.membership-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.membership-card > summary {
  min-height: 82px;
}

.membership-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.membership-title strong {
  font-size: 1.15rem;
}

.membership-title small {
  color: #c6d4e4;
  font-size: 0.76rem;
}

.membership-price {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  color: #7fb2ff;
  font-size: 1.3rem;
  font-weight: 800;
  text-align: right;
}

.membership-price small {
  color: #c6d4e4;
  font-size: 0.68rem;
  font-weight: 600;
}

.membership-content {
  padding: 1rem;
}

.stat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.9rem;
}

.stat-row span {
  padding: 0.35rem 0.55rem;
  border-radius: 6px;
  background: #edf4ff;
  color: #265a9e;
  font-size: 0.78rem;
  font-weight: 650;
}

.benefit-images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
}

.benefit-images a {
  display: block;
  overflow: hidden;
  border: 1px solid #e2e8ef;
  border-radius: 7px;
  background: #f8fafc;
}

.benefit-images img {
  display: block;
  width: 100%;
  height: auto;
}

.membership-content h3 {
  margin: 1.1rem 0 0.45rem;
  font-size: 0.95rem;
}

.privilege-list {
  columns: 2;
  margin: 0;
  padding-left: 1.2rem;
  color: #44546a;
  font-size: 0.86rem;
  line-height: 1.65;
}

.privilege-list li {
  break-inside: avoid;
  margin-bottom: 0.25rem;
}

.product-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--sponsor-border);
  border-radius: 10px;
}

.product-table {
  width: 100%;
  margin: 0;
  border: 0;
  border-collapse: collapse;
  font-size: 0.87rem;
}

.product-table th,
.product-table td {
  padding: 0.75rem;
  border: 0;
  border-bottom: 1px solid #e5eaf0;
  text-align: left;
  vertical-align: top;
}

.product-table thead th {
  background: var(--sponsor-navy);
  color: #fff;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
}

.product-table tbody th {
  min-width: 150px;
  color: var(--sponsor-ink);
}

.product-table tbody tr:nth-child(even) {
  background: #f8fafc;
}

.product-table tbody tr:last-child th,
.product-table tbody tr:last-child td {
  border-bottom: 0;
}

.table-price {
  color: #1666ce;
  font-weight: 750;
  white-space: nowrap;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.service-grid article {
  padding: 1.15rem;
  border: 1px solid var(--sponsor-border);
  border-radius: 10px;
  background: var(--sponsor-panel);
}

.service-grid h2 {
  font-size: 1.05rem;
}

.service-grid p:last-child {
  margin: 0.65rem 0 0;
  color: var(--sponsor-muted);
  font-size: 0.88rem;
  line-height: 1.65;
}

.contact-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 0 1.5rem;
  padding: 1.4rem;
  border-radius: 12px;
  background: var(--sponsor-navy);
  color: #fff;
  scroll-margin-top: calc(var(--navbar-height) + 6rem);
}

.contact-panel h2 {
  color: #fff;
}

.contact-panel p:last-child {
  margin: 0.45rem 0 0;
  color: #cbd7e6;
}

.contact-panel .primary-action {
  flex: none;
}

.asset-note {
  margin-bottom: 1rem;
  color: #7a8798;
  font-size: 0.75rem;
  line-height: 1.55;
  text-align: center;
}

@media (max-width: 900px) {
  .sponsor-hero {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-actions small {
    grid-column: 1 / -1;
  }

  .membership-grid {
    grid-template-columns: 1fr;
  }

  .service-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .sponsor-hero {
    margin-top: 0.5rem;
    padding: 1.1rem;
  }

  .section-nav {
    top: calc(var(--navbar-height) + 0.25rem);
    margin-bottom: 2rem;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.55rem;
  }

  .section-heading > p {
    text-align: left;
  }

  .item-grid,
  .milestone-grid {
    grid-template-columns: 1fr;
  }

  .package-card > summary {
    flex-wrap: wrap;
    padding: 0.85rem;
  }

  .summary-hint {
    flex-basis: 100%;
    margin-left: 1.25rem;
  }

  .package-content {
    padding: 0.75rem 0.9rem 1rem;
  }

  .contact-panel {
    align-items: stretch;
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .hero-actions {
    grid-template-columns: 1fr;
  }

  .hero-actions small {
    grid-column: auto;
  }

  .hero-points {
    flex-direction: column;
  }

  .item-row {
    grid-template-columns: 48px minmax(0, 1fr) auto;
    min-height: 64px;
  }

  .item-icon {
    width: 42px;
    height: 42px;
  }

  .item-icon img {
    width: 36px;
    height: 36px;
  }

  .package-name {
    font-size: 0.98rem;
  }

  .price-badge {
    font-size: 0.83rem;
  }

  .privilege-list {
    columns: 1;
  }

  .benefit-images {
    grid-template-columns: 1fr;
  }
}
</style>
