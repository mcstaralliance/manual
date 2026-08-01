<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const copied = ref(false);
const activeSection = ref("");
const sectionLinks = [
  { id: "memberships", label: "会员套餐" },
  { id: "cumulative-packages", label: "累计礼包" },
  { id: "permanent-packages", label: "永久礼包" },
  { id: "single-products", label: "单品" },
  { id: "donate", label: "赞助方式" },
];
let scrollTicking = false;
let pendingSection = "";
let pendingSectionTimer;

function setActiveSection(id) {
  activeSection.value = id;

  document
    .querySelectorAll('.vp-sidebar a[href*="/sponsor-new.html#"]')
    .forEach((link) => {
      link.classList.toggle("sponsor-section-active", link.hash === `#${id}`);
    });
}

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
    open: true,
  },
  {
    name: "永久 MEK 基础包",
    price: 45,
    image: "https://s2.loli.net/2025/07/15/2LCiufEAvsHklZ9.png",
    imageAlt: "永久 MEK 基础包完整物品图",
    open: true,
  },
  {
    name: "永久 MEK 高级包",
    price: 75,
    image: "https://s2.loli.net/2025/07/15/EhJb2YIBu6dUQ19.png",
    imageAlt: "永久 MEK 高级包完整物品图",
    open: true,
  },
  {
    name: "永久高级植物包",
    price: 49,
    items: plantItems,
    open: true,
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
  [
    "永久独立世界",
    "399",
    "永久",
    "可邀请其他玩家进入，大小和资源不限；管理员可协助平地、搬迁和回档",
  ],
  ["私人定制子服", "900", "2 周目", "可定制 Mod、插件、封禁物品等，详情私聊服主"],
  ["64k 存储元件", "5", "一次性", ""],
  ["超级派蒙旋风矿机 Lite", "199", "永久", "25 秒生产一次所有矿物，每 Tick 需要 200 FE，性价比之选"],
  ["超级派蒙旋风矿机 Pro", "1000", "永久", "1 秒生产一次矿物，每 Tick 消耗 100 FE，发烧友之选"],
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
    items: ["游戏内所有拔刀自选一把（一周目）"],
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
    renewalTip: "每周目也可使用 30 元累计礼包续费",
    open: true,
    stats: [],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft21st/vip.png",
    ],
    privileges: ["2000 硬币", "经验 30 级", "5 个家", ...commonPrivileges],
  },
  {
    name: "VIP+",
    price: 68,
    renewal: "19 元 / 周目",
    renewalTip: "每周目也可使用 30 元累计礼包续费",
    open: true,
    stats: [],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft21st/vip%2B.png",
    ],
    privileges: [
      "3000 硬币",
      "经验 60 级",
      "10 个家",
      ...commonPrivileges,
      "免费授权指定 YSM 模型",
    ],
  },
  {
    name: "SVIP",
    price: 168,
    renewal: "39 元 / 周目",
    renewalTip: "每周目也可使用 60 元累计礼包续费",
    open: true,
    stats: [],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft21st/svip.png",
      "https://resource.mcstaralliance.com/images/starcraft21st/svip2.png",
    ],
    privileges: [
      "6500 硬币",
      "经验 80 级",
      "14 个家",
      ...commonPrivileges,
      "免费授权指定 YSM 模型",
    ],
  },
  {
    name: "SVIP+",
    price: 328,
    renewal: "39 元 / 周目",
    renewalTip: "每周目也可使用 60 元累计礼包续费",
    open: true,
    stats: [],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft21st/svip%2B.png",
      "https://resource.mcstaralliance.com/images/starcraft21st/svip%2B2.png",
    ],
    privileges: [
      "8000 硬币",
      "经验 100 级",
      "16 个家",
      ...commonPrivileges,
      "/nohunger switch 自由切换永不饥饿",
      "免费授权指定 YSM 模型",
    ],
  },
  {
    name: "MVP",
    price: 548,
    renewal: "39 元 / 周目",
    renewalTip: "每周目也可使用 60 元累计礼包续费",
    open: true,
    stats: [],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft21st/mvp.png",
      "https://resource.mcstaralliance.com/images/starcraft21st/mvp2.png",
    ],
    privileges: [
      "12000 硬币",
      "经验 140 级",
      "16 个家",
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
    open: true,
    stats: [],
    images: [
      "https://resource.mcstaralliance.com/images/starcraft21st/mvp%2B1.png",
      "https://resource.mcstaralliance.com/images/starcraft21st/mvp%2B2.png",
      "https://resource.mcstaralliance.com/images/starcraft21st/mvp%2B3.png",
    ],
    privileges: [
      "20000 硬币",
      "经验 180 级",
      "20 个家",
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
    priceLabel: "累计赞助",
    renewal: "游玩的周目累计赞助 200 元",
    open: true,
    acquisition: "累计赞助达到 1888 元即可获得超新星会员",
    stats: [],
    privileges: [
      "MVP+ 礼包及特权",
      "80000 硬币",
      "每周目 2 次珍稀抽奖机会，各种创造物品，没有垃圾。",
      "每周目指定一名玩家，赠送 VIP 至 SVIP 任意一级会员（一周目）",
      "定制一把任意等级附魔武器或其他装备",
      "压缩加速火把 ×2",
      "游戏内所有拔刀剑任选一把",
      "区块加载器",
      "专属管理员 WE 地形编辑服务",
      "优先了解服务器最新消息",
      "免费授权指定 YSM 模型",
    ],
  },
];

function updateActiveSection() {
  if (scrollTicking) return;

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    if (pendingSection) {
      setActiveSection(pendingSection);
      scrollTicking = false;
      return;
    }

    const reachedPageEnd =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 4;

    if (reachedPageEnd) {
      setActiveSection("donate");
      scrollTicking = false;
      return;
    }

    const marker = window.scrollY + 180;
    const current = sectionLinks
      .map(({ id }) => document.getElementById(id))
      .filter((section) => section && section.offsetTop <= marker)
      .sort((a, b) => b.offsetTop - a.offsetTop)[0];

    setActiveSection(current?.id || "");
    scrollTicking = false;
  });
}

function selectSection(id) {
  setActiveSection(id);
  pendingSection = id;
  window.clearTimeout(pendingSectionTimer);
  pendingSectionTimer = window.setTimeout(() => {
    pendingSection = "";
    updateActiveSection();
  }, 1200);
}

onMounted(() => {
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();
});

onBeforeUnmount(() => {
  window.clearTimeout(pendingSectionTimer);
  window.removeEventListener("scroll", updateActiveSection);
  window.removeEventListener("resize", updateActiveSection);
  document
    .querySelectorAll(".vp-sidebar .sponsor-section-active")
    .forEach((link) => link.classList.remove("sponsor-section-active"));
});

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
        <h1>星域世界赞助表</h1>
        <p class="hero-lead">
          除特别说明外，单品、礼包和附魔均为永久并可跨周目继承。永久物品因模组调整而无法提供时，可免费更换等价物品。您的赞助将支持我们持续优化服务器内容，为玩家带来更好的游戏体验。
        </p>
      </div>
      <div class="hero-actions">
        <button class="primary-action" type="button" @click="copyQQ">
          {{ copied ? "服主 QQ 已复制" : "复制服主 QQ 934664404" }}
        </button>
      </div>
    </header>

    <nav class="section-nav" aria-label="赞助表内容导航">
      <a
        v-for="link in sectionLinks"
        :key="link.id"
        :href="`#${link.id}`"
        :class="{ active: activeSection === link.id }"
        @click="selectSection(link.id)"
      >
        {{ link.label }}
      </a>
    </nav>

    <section id="memberships" class="catalog-section">
      <div class="section-heading">
        <div>
          <h2>会员套餐</h2>
        </div>
        <p>不玩不续费，续费资格永久保留；可通过补差价升级。</p>
      </div>
      <article class="membership-feature">
        <div>
          <h3>额外权益</h3>
          <p>VIP+ 及以上会员可获得 YSM 模型无限量授权，将希望使用的模型文件发给服主即可。</p>
        </div>
      </article>
      <div class="membership-grid">
        <article
          v-for="member in memberships"
          :key="member.name"
          class="membership-card"
        >
          <div
            class="membership-card-header"
            :class="{
              'membership-card-header--compact': !member.stats?.length,
              'membership-card-header--no-tip': !member.renewalTip,
            }"
          >
            <span class="membership-level">
              <small>会员等级</small>
              <strong>{{ member.name }}</strong>
            </span>
            <span v-if="member.stats?.length" class="membership-summary-stats">
              <span v-for="stat in member.stats" :key="stat">{{ stat }}</span>
            </span>
            <span class="membership-renewal">
              <small>续费方式</small>
              <span class="membership-renewal-value">{{ member.renewal }}</span>
            </span>
            <a
              v-if="member.renewalTip"
              class="membership-renewal-tip"
              href="#cumulative-packages"
              @click="selectSection('cumulative-packages')"
            >
              {{ member.renewalTip }}
            </a>
            <span class="membership-price">
              <small>{{ member.priceLabel || "开通价格" }}</small>
              ¥{{ member.price }}
            </span>
          </div>
          <div class="membership-content">
            <p v-if="member.acquisition" class="membership-acquisition">
              <strong>获得方式</strong>
              <span>{{ member.acquisition }}</span>
            </p>
            <div v-if="member.images" class="benefit-images">
              <img
                v-for="(image, index) in member.images"
                :key="image"
                :src="image"
                :alt="`${member.name} 礼包物品图 ${index + 1}`"
                loading="lazy"
              />
            </div>
            <h3>权益清单</h3>
            <ul class="privilege-list">
              <li v-for="item in member.privileges" :key="item">{{ item }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section id="cumulative-packages" class="catalog-section">
      <div class="section-heading">
        <div>
          <h2>周目累计赞助礼包</h2>
        </div>
        <p>达到档位即可领取，并可同时领取之前档位。换周目后重新累计。</p>
      </div>
      <div class="notice">
        续费会员的赞助金额不计入周目累计赞助；单周目内累计赞助 550 元，可领取全部五档累计礼包。
      </div>
      <div class="milestone-grid">
        <article
          v-for="pack in cumulativePackages"
          :key="pack.amount"
          class="milestone-card"
        >
          <div class="milestone-card-header">
            <span><strong>累计 ¥{{ pack.amount }}</strong><small>达标可领取</small></span>
          </div>
          <ul>
            <li v-for="item in pack.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="permanent-packages" class="catalog-section">
      <div class="section-heading">
        <div>
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

    <section id="single-products" class="catalog-section single-products-section">
      <div class="section-heading">
        <div>
          <h2>单品</h2>
        </div>
        <p>支持购买更多其他单品，有需要可直接联系服主。</p>
      </div>
      <div class="product-table-wrap">
        <table class="product-table">
          <colgroup>
            <col class="product-name-column" />
            <col class="product-price-column" />
            <col class="product-duration-column" />
            <col class="product-note-column" />
          </colgroup>
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
              <td class="table-duration">{{ product[2] }}</td>
              <td class="table-note">{{ product[3] || "—" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="catalog-section compact-section">
      <div class="service-grid">
        <article class="enchant-product">
          <div class="service-title-row">
            <div>
              <h2>永久附魔定制</h2>
              <p>按选择的属性和等级计价，可组合购买。</p>
            </div>
            <span>永久生效</span>
          </div>
          <div class="enchant-prices">
            <div class="enchant-tier">
              <span class="tier-label">常规属性</span>
              <p><strong>¥3</strong><span>/ 属性 / 级</span></p>
              <small>适用于抢夺、时运以外的可选属性</small>
            </div>
            <div class="enchant-tier enchant-tier-premium">
              <span class="tier-label">稀有收益属性</span>
              <p><strong>¥6</strong><span>/ 属性 / 级</span></p>
              <small>仅适用于抢夺、时运</small>
            </div>
          </div>
          <p class="service-description">特殊属性、组合方案或其他定制需求，可直接私聊服主确认。</p>
        </article>
      </div>
    </section>

    <section id="donate" class="contact-panel">
      <div>
        <h2>赞助联系服主</h2>
        <p>可通过 QQ 联系服主进行赞助，服主 QQ：934664404。</p>
      </div>
      <button class="primary-action" type="button" @click="copyQQ">
        {{ copied ? "服主 QQ 已复制" : "复制服主 QQ 934664404" }}
      </button>
    </section>

  </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-sans-sc@5.3.0/index.css");

.sponsor-catalog {
  --sponsor-ink: #17233b;
  --sponsor-muted: #607086;
  --sponsor-navy: #132b49;
  --sponsor-blue: #2e7cf6;
  --sponsor-green: #139365;
  --sponsor-border: #d9e1ea;
  --sponsor-panel: #f7f9fc;
  color: var(--sponsor-ink);
  font-family:
    "PingFang SC", "Noto Sans SC Variable", "Microsoft YaHei UI",
    "Noto Sans CJK SC", "Noto Sans SC", system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.sponsor-catalog * {
  box-sizing: border-box;
}

:global(.vp-sidebar a[href*="/sponsor-new.html#"].active) {
  color: var(--c-text, #3c3c43) !important;
  font-weight: 400 !important;
}

:global(.vp-sidebar a[href*="/sponsor-new.html#"].sponsor-section-active) {
  color: var(--c-brand, #299764) !important;
  font-weight: 600 !important;
}

.sponsor-catalog h1,
.sponsor-catalog h2,
.sponsor-catalog h3 {
  padding-top: 0 !important;
  font-family:
    "PingFang SC", "Noto Sans SC Variable", "Microsoft YaHei UI",
    "Noto Sans CJK SC", "Noto Sans SC", system-ui, sans-serif;
  letter-spacing: -0.015em;
}

.sponsor-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.25rem;
  margin: 0 0 1.2rem;
  padding: 1rem 1.1rem;
  border: 1px solid #dce5df;
  border-radius: 9px;
  background: #f8faf9;
}

.sponsor-hero h1 {
  margin: 0;
  border: 0;
  font-size: clamp(1.35rem, 2.5vw, 1.65rem);
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.hero-lead {
  max-width: 760px;
  margin: 0.4rem 0 0;
  color: var(--sponsor-muted);
  font-size: 0.86rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0.55rem 0.8rem;
  border-radius: 7px;
  font: inherit;
  font-size: 0.86rem;
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

.primary-action:hover,
.primary-action:focus-visible {
  border-color: #155fcf;
  background: #155fcf;
}

.section-nav {
  position: sticky;
  z-index: 8;
  isolation: isolate;
  top: calc(var(--navbar-height) + 0.5rem);
  display: flex;
  gap: 0.35rem;
  margin: 0 0 2.2rem;
  padding: 0.38rem;
  overflow-x: auto;
  border: 1px solid rgba(183, 205, 193, 0.72);
  border-radius: 14px;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.72) 0%,
      rgba(235, 246, 240, 0.66) 100%
    );
  box-shadow:
    0 12px 28px rgba(20, 64, 45, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(18px) saturate(155%);
  -webkit-backdrop-filter: blur(18px) saturate(155%);
  scrollbar-width: none;
}

.section-nav::-webkit-scrollbar {
  display: none;
}

.section-nav a {
  position: relative;
  flex: 1 0 max-content;
  padding: 0.58rem 0.82rem;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 10px;
  color: #4f6258;
  font-size: 0.86rem;
  font-weight: 620;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.72);
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.section-nav a:hover,
.section-nav a:focus-visible {
  border-color: rgba(255, 255, 255, 0.96);
  background:
    radial-gradient(
      circle at 22% -18%,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.58) 34%,
      rgba(255, 255, 255, 0) 62%
    ),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.72),
      rgba(207, 241, 226, 0.56)
    );
  color: #08744c;
  box-shadow:
    0 6px 15px rgba(17, 117, 76, 0.14),
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -1px 1px rgba(54, 154, 108, 0.12);
}

.section-nav a.active {
  border-color: rgba(123, 203, 166, 0.72);
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(204, 245, 225, 0.82) 52%,
      rgba(216, 239, 255, 0.9) 100%
    );
  color: #067149;
  box-shadow:
    0 7px 17px rgba(12, 126, 81, 0.18),
    0 2px 4px rgba(44, 112, 82, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -2px 3px rgba(65, 166, 121, 0.1);
  transform: none;
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

.package-card > summary {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 64px;
  padding: 0.9rem 1.15rem;
  border-left: 4px solid #c9d8d0;
  background: #f7faf8;
  color: var(--sponsor-ink);
  cursor: pointer;
  list-style-position: inside;
}

.package-card > summary:hover,
.package-card > summary:focus-visible {
  background: #f0f7f3;
}

.package-card[open] > summary {
  border-bottom: 1px solid #dfe8e3;
  border-left-color: var(--sponsor-green);
  background: #f1f8f4;
}

.package-card > summary::marker {
  color: #73877c;
}

.package-name {
  font-size: 1.05rem;
  font-weight: 750;
}

.price-badge {
  flex: none;
  padding: 0.35rem 0.65rem;
  border: 1px solid #bbdfcf;
  border-radius: 7px;
  background: #e8f6f0;
  color: #08744c;
  font-weight: 750;
}

.summary-hint {
  margin-left: auto;
  color: #718078;
  font-size: 0.8rem;
}

.summary-hint-open {
  display: none;
  color: #0c8157;
}

.package-card[open] .summary-hint-open {
  display: inline;
}

.package-card[open] .summary-hint-closed {
  display: none;
}

.package-content {
  padding: 1rem 1.1rem;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 1.5rem;
}

.item-row {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.6rem;
  min-height: 56px;
  border-bottom: 1px solid #e6ebf1;
}

.item-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  overflow: hidden;
  border: 1px solid #dce3ea;
  border-radius: 7px;
  background: #f4f7fa;
}

.item-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
}

.item-name {
  min-width: 0;
  font-size: 0.84rem;
  font-weight: 620;
  line-height: 1.35;
}

.item-qty {
  color: #33445a;
  font-size: 0.82rem;
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
  display: block;
  columns: 2 300px;
  column-gap: 0.85rem;
}

.milestone-card {
  width: 100%;
  margin: 0 0 0.85rem;
  break-inside: avoid;
}

.milestone-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
}

.milestone-card-header span {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.milestone-card-header strong {
  font-size: 1.1rem;
}

.milestone-card-header small {
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
  grid-template-columns: 1fr;
  gap: 0.7rem;
}

.membership-feature {
  margin-bottom: 0.85rem;
  padding: 1rem 1.1rem;
  border: 1px solid #55d497;
  border-left: 5px solid #10a966;
  border-radius: 9px;
  background: linear-gradient(135deg, #e8fff3 0%, #e6f5ff 100%);
  box-shadow: 0 8px 22px rgba(16, 169, 102, 0.12);
}

.membership-feature h3 {
  margin: 0;
  color: #087747;
  font-size: 1.05rem;
}

.membership-feature p {
  margin: 0;
  color: #315f4b;
  font-size: 0.82rem;
  line-height: 1.55;
}

.membership-card-header {
  display: grid;
  grid-template-columns: 110px minmax(220px, 1fr) minmax(150px, auto) 105px;
  grid-template-areas: "level stats renewal price";
  align-items: center;
  gap: 1rem;
  min-height: 76px;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #e1e7e3;
  background: #f7faf8;
  color: var(--sponsor-ink);
}

.membership-card-header--compact {
  grid-template-columns: 110px max-content max-content minmax(0, 1fr) auto;
  grid-template-areas: "level renewal tip . price";
  column-gap: 0.8rem;
}

.membership-card-header--no-tip {
  grid-template-columns: 110px max-content minmax(0, 1fr) auto;
  grid-template-areas: "level renewal . price";
}

.membership-level {
  grid-area: level;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding-left: 0.7rem;
  border-left: 3px solid var(--sponsor-green);
}

.membership-level strong {
  font-size: 1.12rem;
  line-height: 1.35rem;
}

.membership-level small,
.membership-renewal small {
  color: #829087;
  font-size: 0.68rem;
  font-weight: 600;
  line-height: 1rem;
}

.membership-summary-stats {
  grid-area: stats;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.membership-summary-stats span {
  padding: 0.3rem 0.5rem;
  border: 1px solid #dce5e0;
  border-radius: 5px;
  background: #f7f9f8;
  color: #526159;
  font-size: 0.75rem;
  font-weight: 620;
}

.membership-renewal {
  grid-area: renewal;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  color: #46554d;
  font-size: 0.78rem;
  line-height: 1.4;
}

.membership-renewal-value {
  line-height: 1.35rem;
}

.membership-renewal-tip {
  grid-area: tip;
  align-self: flex-start;
  justify-self: start;
  margin-top: 1rem;
  padding: 0.25rem 0.42rem;
  border: 1px solid #edcf89;
  border-radius: 5px;
  background: #fff7df;
  color: #8c5b08;
  font-size: 0.68rem;
  font-weight: 750;
  line-height: 1.35;
  text-decoration: none !important;
  transition:
    border-color 150ms ease,
    background 150ms ease,
    color 150ms ease;
}

.membership-renewal-tip:hover,
.membership-renewal-tip:focus-visible {
  border-color: #d7a536;
  background: #ffedbb;
  color: #704500;
  text-decoration: none !important;
}

.membership-price {
  grid-area: price;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  color: #0b7651;
  font-size: 1.18rem;
  font-weight: 800;
  text-align: right;
}

.membership-price small {
  color: #829087;
  font-size: 0.68rem;
  font-weight: 600;
}

.membership-content {
  padding: 1rem 1.15rem 1.15rem;
  background: #fff;
}

.membership-acquisition {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 1rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid #efbd52;
  border-left: 4px solid #e39500;
  border-radius: 7px;
  background: linear-gradient(135deg, #fff8dc, #fff2c2);
  color: #784800;
  font-size: 0.88rem;
  font-weight: 720;
}

.membership-acquisition strong {
  flex: 0 0 auto;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  background: #e39500;
  color: #fff;
  font-size: 0.72rem;
}

.benefit-images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
}

.benefit-images img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid #e2e8ef;
  border-radius: 7px;
  background: #f8fafc;
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

.single-products-section {
  width: min(1080px, calc(100vw - var(--sidebar-width, 20rem) - 2.5rem));
  margin-left: 50%;
  transform: translateX(-50%);
}

.product-table-wrap {
  overflow-x: auto;
  border: 1px solid #cfddd5;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(30, 66, 50, 0.05);
}

.product-table {
  width: 100%;
  min-width: 820px;
  margin: 0;
  border: 0;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.88rem;
}

.product-name-column {
  width: 29%;
}

.product-price-column {
  width: 14%;
}

.product-duration-column {
  width: 18%;
}

.product-note-column {
  width: 39%;
}

.product-table th,
.product-table td {
  padding: 0.82rem 1rem;
  border: 0;
  border-bottom: 1px solid #e3ebe6;
  text-align: left;
  vertical-align: middle;
}

.product-table thead th {
  border-bottom: 1px solid #bdd8ca;
  background: #eaf5ef;
  color: #315f4a;
  font-size: 0.78rem;
  font-weight: 750;
  letter-spacing: 0.02em;
}

.product-table tbody th {
  color: var(--sponsor-ink);
  font-weight: 680;
}

.product-table tbody tr:nth-child(even) {
  background: #f8fbf9;
}

.product-table tbody tr:hover {
  background: #eef7f2;
}

.product-table tbody tr:last-child th,
.product-table tbody tr:last-child td {
  border-bottom: 0;
}

.table-price {
  color: #0b7a53;
  font-size: 0.92rem;
  font-weight: 800;
  white-space: nowrap;
}

.table-duration {
  color: #415449;
  font-weight: 620;
}

.table-note {
  color: #66766d;
  line-height: 1.55;
}

.service-grid {
  display: grid;
  grid-template-columns: 1fr;
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

.service-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.service-title-row h2 {
  margin: 0;
}

.service-title-row span {
  flex: none;
  padding: 0.25rem 0.5rem;
  border: 1px solid #b8decd;
  border-radius: 999px;
  background: #e6f6ee;
  color: #08744c;
  font-size: 0.72rem;
  font-weight: 720;
}

.service-grid .enchant-product {
  border-color: #9fcfba;
  background: linear-gradient(135deg, #f3fbf7 0%, #e8f6ef 100%);
  box-shadow: 0 8px 22px rgba(20, 105, 72, 0.08);
}

.enchant-prices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
  margin-top: 0.9rem;
}

.enchant-tier {
  padding: 0.75rem;
  border: 1px solid #c7dfd3;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.78);
}

.enchant-tier-premium {
  border-color: #e4c98e;
  background: #fffaf0;
}

.tier-label {
  color: #4b6859;
  font-size: 0.72rem;
  font-weight: 750;
}

.enchant-tier-premium .tier-label,
.enchant-tier-premium strong {
  color: #9a6410;
}

.service-grid .enchant-tier p {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin: 0.35rem 0 0.2rem;
  color: #52655b;
}

.enchant-prices strong {
  color: #08744c;
  font-size: 1.45rem;
  line-height: 1;
}

.enchant-prices span {
  font-size: 0.75rem;
  font-weight: 620;
}

.enchant-tier small {
  display: block;
  color: #718078;
  font-size: 0.7rem;
  line-height: 1.45;
}

.service-grid p:last-child {
  margin: 0.65rem 0 0;
  color: var(--sponsor-muted);
  font-size: 0.88rem;
  line-height: 1.65;
}

.service-grid .service-title-row p {
  margin: 0.3rem 0 0;
  color: #5c7166;
  font-size: 0.78rem;
}

.service-grid .enchant-product .service-description {
  margin-top: 0.8rem;
  color: #50675b;
}

.contact-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 0 1.5rem;
  padding: 1.4rem;
  border: 1px solid #b9d8c8;
  border-radius: 11px;
  background: linear-gradient(135deg, #f3faf6 0%, #e8f4ed 100%);
  color: var(--sponsor-ink);
  scroll-margin-top: calc(var(--navbar-height) + 6rem);
}

.contact-panel h2 {
  color: #193b2c;
}

.contact-panel p:last-child {
  margin: 0.45rem 0 0;
  color: #587064;
}

.contact-panel .primary-action {
  flex: none;
  border-color: #0b7a53;
  background: #0b7a53;
  box-shadow: 0 5px 14px rgba(11, 122, 83, 0.18);
}

.contact-panel .primary-action:hover,
.contact-panel .primary-action:focus-visible {
  border-color: #075f40;
  background: #075f40;
}

@media (max-width: 900px) {
  .sponsor-hero {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: max-content;
  }

  .membership-card-header {
    grid-template-columns: 100px minmax(0, 1fr) 100px;
    grid-template-areas:
      "level stats price"
      "level renewal price";
    gap: 0.45rem 0.85rem;
  }

  .membership-card-header--compact {
    grid-template-columns: 100px max-content max-content minmax(0, 1fr) auto;
    grid-template-areas: "level renewal tip . price";
    column-gap: 0.7rem;
  }

  .membership-card-header--no-tip {
    grid-template-columns: 100px max-content minmax(0, 1fr) auto;
    grid-template-areas: "level renewal . price";
  }

  .service-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 959px) {
  .single-products-section {
    width: auto;
    margin-left: 0;
    transform: none;
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

  .milestone-grid {
    columns: 1;
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

  .membership-card-header {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "level price"
      "stats stats"
      "renewal renewal";
    gap: 0.65rem;
    padding: 0.85rem;
  }

  .membership-card-header--compact {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "level price"
      "renewal renewal"
      "tip tip";
  }

  .membership-card-header--no-tip {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "level price"
      "renewal renewal";
  }

  .membership-renewal {
    padding-top: 0.55rem;
    border-top: 1px solid #e5eae7;
  }

  .membership-renewal-tip {
    margin-top: 0;
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

  .item-row {
    grid-template-columns: 40px minmax(0, 1fr) auto;
    min-height: 54px;
  }

  .item-icon {
    width: 36px;
    height: 36px;
  }

  .item-icon img {
    width: 30px;
    height: 30px;
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
