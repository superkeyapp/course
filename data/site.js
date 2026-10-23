// 页面上所有对外链接和“作品”的数据，都只写在这里：首页的作品墙、每个作品的详情页（product.html）、
// 首屏和常见问题里的下载、官网链接、购买链接、客服微信、视频，都从这里读。
//
// 换下载地址（比如从 GitHub 换成国内网盘、自己部署的网站）：只改 hosts 里对应的一行，各条链接都在它后面拼路径。
// 加一个作品、改介绍或截图：改 products 里的一条，不用新建页面。

// ---- 网址的前半部分：只写一次 ----
export const hosts = {
  site: 'https://superkeyapp.github.io',   // 软件官网
  github: '',                              // 下载仓库的发布页，如 https://github.com/superkeyapp/downloads/releases/download/v1.0.0
  pan: '',                                 // 网盘的分享地址
}

// ---- 页面里用到的固定链接（index.html 里写 data-link="名字"，main.js 填进去） ----
export const links = {
  site: hosts.site,
  siteDownload: `${hosts.site}/download`,   // 官网的下载页
  siteFeatures: `${hosts.site}/#hotkey`,    // 官网的功能和演示
}

// ---- 发布前要填的内容：填好就生效；空着的地方页面上会给出“即将公布”之类的提示 ----
export const course = {
  // 三个档位各对应课程网站上的一个课程：点“参与众筹”直接跳过去
  planLinks: {
    standard: '',   // 标准版 ¥298 的课程页网址
    advanced: '',   // 进阶版 ¥698 的课程页网址
    full: '',       // 全套版 ¥798 的课程页网址
  },
  // 客服微信：微信号（没有就空着：页面上不显示微信号和“复制微信号”，只提示扫码 / 长按添加）；
  // 名片图（微信“我的二维码”，带头像、昵称）放到 public/ 目录，这里写文件名。
  // 以后换图时换一个新文件名（如 wechat-card-2.jpg），否则用户浏览器可能还显示缓存里的旧图
  wechat: { id: 'ixueaedu', qr: 'wechat-card-1.jpg' },
  // 课程介绍视频的地址（首屏那个大封面点了跳过去，如 B 站）
  videoUrl: '',
  // B 站、抖音：name 是显示的账号名，url 是主页地址；都空着时页面底部不显示这一行
  bilibili: { name: '', url: '' },
  douyin: { name: '', url: '' },
}

// 档位：每个作品写它最早出现在哪个档位；高档位包含低档位的全部作品
export const tiers = [
  { id: 'standard', name: '标准版' },
  { id: 'advanced', name: '进阶版' },
  { id: 'full', name: '全套版' },
]

// 拼一条下载链接：host 没填时返回空（页面上显示“即将提供”）
const at = (host, path) => (host ? `${host}/${path}` : '')

// ---- 作品：每个目录做出来的软件或网站 ----
//   tier       在哪个档位（public = 公开，不用买）
//   dirs       对应源码里的哪些目录
//   shots      截图：放在 public/screens/ 下，写文件名；第一张是作品墙卡片上的缩略图
//   downloads  下载链接：第一个是主链接（作品墙上的“下载体验”），详情页列出全部；url 空着显示“即将提供”
//   visit      网站类作品：访问地址（代替下载）
//   video      效果演示视频的地址（如 B 站）：作品墙和详情页出现“▶ 效果演示”，点了在新窗口打开；空着不显示
//   experimental  试验项目：卡片上标“试验 · 不完善”，详情页最上面写明现状（status：能用的、不完善的）
export const products = [
  {
    id: 'winui',
    tier: 'standard',
    name: '超级快捷键 正式版',
    tech: ['WinUI 3', '.NET 10', 'C++ 核心'],
    summary: '微软现在主推的原生界面技术，Windows 11 设置的风格，深色 / 浅色跟随系统。',
    intro: '正式发布给普通用户用的版本。界面用 WinUI 3（Windows App SDK）写，快捷键、手势等所有功能都在 C++ 核心里，'
      + '界面通过命名管道连接核心、按核心给的“界面描述”显示。关掉窗口后只剩轻量的后台核心。',
    pros: ['界面最接近 Windows 11 自带的设置', '深色 / 浅色、云母背景、动画都是系统原生的', '界面和核心分开：界面关掉不影响快捷键'],
    dirs: ['superkey-winui', 'superkey-client', 'superkey'],
    shots: ['winui-overview.webp', 'winui-hotkey.webp', 'winui-hotkey-edit.webp', 'winui-gesture.webp'],
    video: '',
    downloads: [
      { label: '网盘下载', url: at(hosts.pan, ''), note: '' },
      { label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-1.0.0-x64-Setup.exe'), note: '' },
    ],
  },
  {
    id: 'core',
    tier: 'standard',
    name: 'C++ 核心（自带 Win32 界面）',
    tech: ['C++20', 'Win32 API', 'CMake'],
    summary: '所有功能都在这里：快捷键与手势引擎、配置、托盘；给 WinUI、Electron 等界面用，也自带一套系统控件界面。',
    intro: '整个软件的核心。键盘鼠标钩子、手势和热键引擎、配置、托盘都在这里；每个页面有哪些设置由核心用 JSON 描述，'
      + '各种界面只负责把描述画出来，所以所有界面看到的内容始终一致。核心自己也带一套 Win32 系统控件的界面。',
    pros: ['所有界面共用一个核心，功能只写一次', '常驻后台的只是核心，占用很少', '界面描述协议有完整文档，可以自己再写一种界面'],
    dirs: ['superkey'],
    shots: ['core-overview.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-Win32-1.0.0-x64-Setup.exe'), note: '' }],
  },
  {
    id: 'wpf',
    tier: 'advanced',
    name: 'WPF 版',
    tech: ['WPF', '.NET 10', 'C++ 核心'],
    summary: '.NET 里最成熟的桌面界面技术，用它自带的 Windows 11 风格（Fluent）主题。',
    intro: '和正式版连的是同一个核心、同一套界面描述，只是界面换成 WPF。适合对照着看：同样的需求，换一种界面技术怎么写。',
    pros: ['技术成熟，资料最多', '和 WinUI 版共用 .NET 客户端库'],
    dirs: ['superkey-wpf'],
    shots: ['wpf-overview.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-WPF-1.0.0-x64-Setup.exe'), note: '' }],
  },
  {
    id: 'electron',
    tier: 'advanced',
    name: 'Electron 版',
    tech: ['Electron', 'TypeScript', 'React', 'Fluent UI'],
    summary: '用网页技术写的桌面界面：React + 微软的 Fluent UI 组件。',
    intro: '界面是一个 React 网页，用微软的 Fluent UI React 组件；Electron 负责窗口，并通过命名管道连接 C++ 核心。',
    pros: ['会网页开发就能改界面', '同一套界面代码，Tauri 版也在用'],
    dirs: ['superkey-electron'],
    shots: ['electron-overview.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-Electron-1.0.0-x64-Setup.exe'), note: '' }],
  },
  {
    id: 'tauri',
    tier: 'advanced',
    name: 'Tauri 版',
    tech: ['Tauri', 'Rust', 'React', 'Fluent UI'],
    summary: '和 Electron 版同一套 React 界面，外壳换成 Rust，安装包小很多。',
    intro: '界面代码和 Electron 版相同，窗口和连接核心的部分用 Rust 写，用系统自带的 WebView2 显示网页，所以安装包只有几 MB。',
    pros: ['安装包小', '对照 Electron 版，看两种外壳的差别'],
    dirs: ['superkey-tauri'],
    shots: ['tauri-overview.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-Tauri-1.0.0-x64-Setup.exe'), note: '' }],
  },
  {
    id: 'keycast',
    tier: 'advanced',
    name: 'KeyCast 按键显示',
    tech: ['WPF', '.NET 10'],
    summary: '录屏、讲课时把按下的键显示在屏幕上；官网的演示视频就是用它录的。',
    intro: '一个独立的小工具，不依赖超级快捷键。录演示视频时，观众能看到按了哪些键。',
    pros: ['单个 exe，不用另装 .NET', '不依赖第三方库'],
    dirs: ['keycast'],
    shots: ['keycast-settings.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'KeyCast-1.0.0-x64.zip'), note: '' }],
  },
  {
    id: 'classic',
    tier: 'full',
    name: '超级快捷键 经典版',
    tech: ['C++20', 'Win32 API'],
    summary: '核心和系统控件界面编在一个 exe 里，不用装 .NET，安装包只有约 3 MB。',
    intro: '另一种架构：去掉命名管道和 JSON 界面描述，界面直接调用核心，整个软件就是一个文件。功能和正式版完全一样，界面是传统 Windows 样式。',
    pros: ['单个文件，体积最小', '不用装任何运行库'],
    dirs: ['superkey-win32'],
    shots: ['classic-overview.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-Classic-1.0.0-x64-Setup.exe'), note: '' }],
  },
  {
    id: 'd2d',
    tier: 'full',
    name: 'Direct2D 自绘版',
    experimental: true,
    tech: ['C++20', 'Direct2D'],
    summary: '试验项目：功能做完了，但没有经过实际使用，可能有显示问题，按现状提供。整个设置窗口用 Direct2D 自己画。',
    intro: '整个设置窗口不用任何界面框架，用 Direct2D 自己画，外观照着 WinUI 版。适合想了解“不用界面框架、自己画界面”的同学，不适合当成日常使用的软件。',
    pros: ['看怎么从零自绘一套界面'],
    status: {
      works: ['核心的全部功能（快捷键、手势等）和自绘的设置窗口都做完了'],
      missing: ['没有经过实际使用，可能有显示上的小问题（比如搜索框上有一条断开的痕迹）', '按现状提供；目前没有更新计划，如果课程反响好，会考虑继续完善'],
    },
    dirs: ['superkey-d2d'],
    shots: ['d2d-overview.webp'],
    video: '',
    downloads: [{ label: 'GitHub 下载', url: at(hosts.github, 'SuperKey-Direct2D-1.0.0-x64-Setup.exe'), note: '' }],
  },
  {
    id: 'aardio',
    tier: 'full',
    name: 'aardio 版',
    experimental: true,
    tech: ['aardio', 'C++ 核心'],
    summary: '试验项目：开发到一半，界面和操作都不完整，按现状提供。用 aardio 原生窗口做的界面，连接同一个 C++ 核心。',
    intro: '用 aardio（一个小众的 Windows 开发语言）写的界面，和正式版连同一个 C++ 核心、用同一套界面描述。'
      + '适合想看“小众语言怎么接入同一个核心”的同学，不适合当成能用的软件。',
    pros: ['看小众语言怎么接入同一个核心'],
    status: {
      works: ['能连上核心，显示导航、概览和各页面的设置'],
      missing: [
        '改变窗口大小后，左侧导航可能不显示',
        '无边框窗口，阴影很淡，和桌面分不太清',
        '界面里自己的固定文字只有中文；弹出菜单没有深色样式',
        '部分键盘操作还没做（卡片上回车、Delete 删除、对话框里 Tab 切换）',
        '按现状提供；目前没有更新计划，如果课程反响好，会考虑继续完善',
      ],
    },
    dirs: ['superkey-aardio'],
    shots: ['aardio-overview.webp'],
    video: '',
    downloads: [],
  },
  {
    id: 'website',
    tier: 'public',
    name: '软件官网',
    tech: ['VitePress'],
    summary: '超级快捷键的官方网站：功能介绍、演示视频、下载、使用文档。公开，任何人都能看。',
    intro: '用 VitePress 写的静态网站，部署在 GitHub Pages。课程里也讲怎么用 AI 做出这样的宣传网站。',
    pros: ['公开，现在就能看'],
    dirs: ['superkeyapp.github.io'],
    shots: ['website-home.webp'],
    video: '',
    downloads: [],
    visit: hosts.site,
  },
]

export const productById = (id) => products.find((p) => p.id === id)
export const tierName = (id) => (id === 'public' ? '公开' : tiers.find((t) => t.id === id)?.name ?? '')
// 包含这个作品的档位：标准版的作品三个档位都有
export const tiersIncluding = (p) => {
  if (p.tier === 'public') return []
  const i = tiers.findIndex((t) => t.id === p.tier)
  return tiers.slice(i).map((t) => t.name)
}
