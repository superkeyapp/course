// 页面上所有对外链接和“作品”的数据，都只写在这里：首页的作品墙、每个作品的详情页（product.html）、
// 首屏和常见问题里的下载、官网链接、购买链接、客服微信、视频，都从这里读。
//
// 站外链接（官网、下载、视频）都是短链接（见下面的 short），注释里写着跳到哪里。换下载地址、发新版本时，
// 新建短链接（目标填新地址），把代码换掉；短链接也可以在短链接服务里直接改指向，页面不用动。
// 加一个作品、改介绍或截图：改 products 里的一条，不用新建页面。

// ---- 站外链接都用短链接（a.ixuea.com），统计每个位置的点击次数 ----
// 新建：https://a.ixuea.com/uris/new，Source 填目标地址，Media 填“众筹页”，Unit 填位置，Key 填按钮名；
// 返回的代码拼在 https://a.ixuea.com/ 后面。每个位置单独一个，即使目标地址一样，才能分开统计
const short = (code) => `https://a.ixuea.com/${code}`

// ---- 页面里用到的固定链接（index.html 里写 data-link="名字"，main.js 填进去）；注释是短链接跳到哪里 ----
export const links = {
  site: short('cd'),                  // 页脚“软件官网”→ 官网首页（显示的文字仍是官网地址）
  siteDownloadHero: short('cw'),      // 首屏“免费下载体验软件”→ 官网下载页
  siteDownloadFaq: short('cy'),       // 常见问题“去官网下载”→ 官网下载页
  siteDownloadBottom: short('cM'),    // 页面底部“免费下载体验软件”→ 官网下载页
  siteFeaturesPreview: short('cb'),   // 软件介绍里的官网预览图 → 官网首页的功能演示（/#hotkey）
  siteFeaturesButton: short('cC'),    // “去官网看全部功能和演示”→ 官网首页的功能演示（/#hotkey）
}

// ---- 发布前要填的内容：填好就生效；空着的地方页面上会给出“即将公布”之类的提示 ----
export const course = {
  // 三个档位各对应课程网站上的一个课程：点“参与众筹”直接跳过去
  planLinks: {
    standard: short('Rp'),   // 标准版 ¥298：爱学啊 courses/198
    advanced: short('RW'),   // 进阶版 ¥698：爱学啊 courses/200
    full: short('RU'),       // 全套版 ¥798：爱学啊 courses/210
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

// 详情页“下载体验”下面的“在 GitHub 查看全部版本和文件”：安装包分在两个公开仓库，各一个短链接，
// 指向最新版本的 Release 页（releases/latest），发新版本不用改。作品的 release 写用哪一个
export const releasePages = {
  release: short('R4'),   // superkey-release 最新版本的 Release 页（超级快捷键、经典版）
  demo: short('RI'),      // superkey-demo 最新版本的 Release 页（学习用的版本、KeyCast）；RI 是大写的 i
}

// 学习用的版本在网盘上是同一个分享（所有学习版本放在一起），各作品共用这几个按钮、同一个短链接
const learningPans = [
  { label: '123 网盘', url: short('RK'), note: '免费账号登录就能下载，速度快' },   // 123 网盘“超级快捷键课程-学习版本”的分享
  { label: '百度网盘', url: short('Rt'), note: '不开会员会限速' },   // 百度网盘“超级快捷键课程-学习版本”的分享（Rt 是小写 t）
]

// ---- 作品：每个目录做出来的软件或网站 ----
//   tier       在哪个档位（public = 公开，不用买）
//   dirs       对应源码里的哪些目录
//   shots      截图：放在 public/screens/ 下，写文件名；第一张是作品墙卡片上的缩略图
//   downloads  下载链接：详情页的“下载”一节列出全部（作品墙上的“下载体验”跳到那里），第一个标“推荐”；url 空着显示“即将提供”。
//              网盘和官网下载页用同一个分享（123 网盘：超级快捷键、经典版各一个分享；百度网盘：两个在同一个分享里），按钮名写网盘名、note 写要不要登录 / 会员
//   release    下载在哪个公开仓库（releasePages 里的 release / demo）：详情页显示“在 GitHub 查看全部版本和文件”
//   visit      网站类作品：访问地址（代替下载）
//   video      效果演示视频的地址（如 B 站）：作品墙和详情页出现“▶ 效果演示”，点了在新窗口打开；空着不显示
//   experimental  试验项目：卡片上标“试验 · 不完善”，详情页最上面写明现状（status：能用的、不完善的）
export const products = [
  {
    id: 'winui',
    tier: 'standard',
    name: '超级快捷键（WinUI）',
    tech: ['WinUI 3', '.NET 10', 'C++ 核心'],
    summary: '微软现在主推的原生界面技术，Windows 11 设置的风格，深色 / 浅色跟随系统。',
    intro: '正式发布给普通用户用的版本。界面用 WinUI 3（Windows App SDK）写，快捷键、手势等所有功能都在 C++ 核心里，'
      + '界面通过命名管道连接核心、按核心给的“界面描述”显示。关掉窗口后只剩轻量的后台核心。',
    pros: ['界面最接近 Windows 11 自带的设置', '深色 / 浅色、云母背景、动画都是系统原生的', '界面和核心分开：界面关掉不影响快捷键'],
    dirs: ['superkey-winui', 'superkey-client-dotnet', 'superkey-core'],
    shots: ['winui-overview.webp', 'winui-hotkey.webp', 'winui-hotkey-edit.webp', 'winui-gesture.webp'],
    video: short('RB'),   // B 站 BV1g6kkB5E1G
    release: 'release',
    downloads: [
      { label: '123 网盘', url: short('Ro'), note: '免费账号登录就能下载，速度快' },
      { label: '百度网盘', url: short('Rr'), note: '不开会员会限速' },
      { label: 'GitHub 下载', url: short('c3'), note: '' },   // superkey-release 1.0.0 的 SuperKey-1.0.0-x64-Setup.exe
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
    dirs: ['superkey-core'],
    shots: ['core-overview.webp'],
    video: '',
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('c6'), note: '' },   // superkey-demo 1.0.0 的 SuperKey-Win32-1.0.0-x64-Setup.exe
    ],
  },
  {
    id: 'wpf',
    tier: 'advanced',
    name: 'WPF 版',
    tech: ['WPF', '.NET 10', 'C++ 核心'],
    summary: '.NET 里最成熟的桌面界面技术，用它自带的 Windows 11 风格（Fluent）主题。',
    intro: '和超级快捷键（WinUI）连的是同一个核心、同一套界面描述，只是界面换成 WPF。适合对照着看：同样的需求，换一种界面技术怎么写。',
    pros: ['技术成熟，资料最多', '和 WinUI 版共用 .NET 客户端库'],
    dirs: ['superkey-wpf'],
    shots: ['wpf-overview.webp'],
    video: '',
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('cX'), note: '' },   // superkey-demo 1.0.0 的 SuperKey-WPF-1.0.0-x64-Setup.exe
    ],
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
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('cu'), note: '' },   // superkey-demo 1.0.0 的 SuperKey-Electron-1.0.0-x64-Setup.exe
    ],
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
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('ch'), note: '' },   // superkey-demo 1.0.0 的 SuperKey-Tauri-1.0.0-x64-Setup.exe
    ],
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
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('RF'), note: '' },   // superkey-demo 1.0.0 的 KeyCast-1.0.0-x64.zip
    ],
  },
  {
    id: 'classic',
    tier: 'full',
    name: '超级快捷键 经典版',
    tech: ['C++20', 'Win32 API'],
    summary: '核心和系统控件界面编在一个 exe 里，不用装 .NET，安装包只有约 3 MB。',
    intro: '另一种架构：去掉命名管道和 JSON 界面描述，界面直接调用核心，整个软件就是一个文件。功能和超级快捷键（WinUI）完全一样，界面是传统 Windows 样式。',
    pros: ['单个文件，体积最小', '不用装任何运行库'],
    dirs: ['superkey-classic'],
    shots: ['classic-overview.webp'],
    video: '',
    release: 'release',
    downloads: [
      { label: '123 网盘', url: short('RE'), note: '在分享里的“经典版”文件夹' },
      { label: '百度网盘', url: short('RG'), note: '在分享里的“经典版”文件夹' },
      { label: 'GitHub 下载', url: short('c8'), note: '' },   // superkey-release 1.0.0 的 SuperKey-Classic-1.0.0-x64-Setup.exe
    ],
  },
  {
    id: 'qt',
    tier: 'full',
    name: 'Qt 版',
    tech: ['Qt 6', 'QML', 'C++ 核心'],
    summary: 'Qt Quick（QML）写的界面，Qt 官方的 Windows 11 风格（FluentWinUI3），连接同一个 C++ 核心。',
    intro: '用 Qt 6 的 Qt Quick 写的界面，全部按 Qt 官方推荐的方式：QML 描述界面、C++ 连接核心（命名管道），和超级快捷键（WinUI）连同一个核心、用同一套界面描述。'
      + '安装包约 22 MB、打开设置时内存约 57 MB，比 WinUI、WPF 版都省。',
    pros: ['Qt 官方推荐的写法，界面和 C++ 分得清楚', '体积、内存比 WinUI、WPF 小', '看 C++ 程序员最熟悉的界面框架怎么接入同一个核心'],
    dirs: ['superkey-qt'],
    shots: ['qt-overview.webp'],
    video: '',
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('Ri'), note: '' },   // superkey-demo 1.0.0 的 SuperKey-Qt-1.0.0-x64-Setup.exe
    ],
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
    dirs: ['superkey-direct2d'],
    shots: ['d2d-overview.webp'],
    video: '',
    release: 'demo',
    downloads: [
      ...learningPans,
      { label: 'GitHub 下载', url: short('Rz'), note: '' },   // superkey-demo 1.0.0 的 SuperKey-Direct2D-1.0.0-x64-Setup.exe
    ],
  },
  {
    id: 'aardio',
    tier: 'full',
    name: 'aardio 版',
    experimental: true,
    tech: ['aardio', 'C++ 核心'],
    summary: '试验项目：开发到一半，界面和操作都不完整，按现状提供。用 aardio 原生窗口做的界面，连接同一个 C++ 核心。',
    intro: '用 aardio（一个小众的 Windows 开发语言）写的界面，和超级快捷键（WinUI）连同一个 C++ 核心、用同一套界面描述。'
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
    visit: short('cO'),   // 作品墙“访问网站”→ 官网首页
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
