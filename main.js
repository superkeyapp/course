// 落地页的交互：手机上点“下载”给出电脑网址、联系客服、购买链接和介绍视频（还没填时）的提示
// 网址、作品都在 data/site.js：这里把 data-link 的链接填好、生成作品墙（works.js）
import { course, links } from './data/site.js'
import { renderWorks } from './works.js'

// 页面里写 data-link="名字" 的链接：地址从 data/site.js 的 links 里取。
// 加了 data-link-text 的，链接文字也换掉：写了值就显示这个值（链接是短链接时显示真正的网址），空着就显示链接本身
document.querySelectorAll('a[data-link]').forEach((a) => {
  const url = links[a.dataset.link]
  if (!url) return
  a.href = url
  if (a.hasAttribute('data-link-text')) a.textContent = a.dataset.linkText || url.replace(/^https?:\/\//, '')
})
renderWorks(document.getElementById('works'))

// 下面是原来的交互（开头的分号：避免和上一行连成一个调用）

;(() => {
  // 发布前要填的内容（购买链接、客服微信、视频、账号）都在 data/site.js 的 course 里
  const CONFIG = course

  const OFFICIAL_SITE = links.site
  const WECHAT = CONFIG.wechat
  const PLAN_LINKS = CONFIG.planLinks
  const isPhone = /Android|iPhone|iPad|iPod|HarmonyOS|Mobile/i.test(navigator.userAgent)

  // ---- 弹窗 ----
  const dialog = document.getElementById('dialog')
  const title = document.getElementById('dialog-title')
  const text = document.getElementById('dialog-text')
  const copyBtn = document.getElementById('dialog-copy')
  const img = document.getElementById('dialog-img')
  let copyValue = ''
  let copyLabel = ''

  // copy：要复制的内容（有才显示“复制”按钮）；options.image：显示一张图（客服二维码）
  function showDialog(t, body, copy, options = {}) {
    title.textContent = t
    text.textContent = body
    copyValue = copy || ''
    copyLabel = options.copyLabel || '复制网址'
    copyBtn.hidden = !copy
    copyBtn.textContent = copyLabel
    img.hidden = !options.image
    if (options.image) {
      img.src = options.image
      img.alt = options.imageAlt || ''
    }
    dialog.hidden = false
  }
  document.getElementById('dialog-close').addEventListener('click', () => { dialog.hidden = true })
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.hidden = true })
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // 微信里有时不允许直接写剪贴板：用一个临时输入框复制
      const input = document.createElement('textarea')
      input.value = value
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
  }
  copyBtn.addEventListener('click', async () => {
    await copyText(copyValue)
    copyBtn.textContent = '已复制'
  })

  // ---- 联系客服微信：弹出二维码和微信号；页面底部另有一块“联系客服” ----
  // 有微信号才显示“微信号：…”和“复制微信号”；没有时只提示扫码 / 长按名片添加
  if (WECHAT.id) {
    document.querySelectorAll('.js-wechat-id').forEach((el) => {
      el.textContent = WECHAT.id
    })
    document.querySelectorAll('.js-wechat-has-id').forEach((el) => { el.hidden = false })
  }
  document.querySelectorAll('img.js-wechat-qr').forEach((img) => { img.src = WECHAT.qr })
  const wechatTip = '在微信里长按名片即可识别添加；在电脑上看的，用手机微信扫一扫。' + (WECHAT.id ? '也可以复制微信号，到微信里搜索添加。' : '')
  document.querySelectorAll('.js-contact').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      showDialog('联系客服微信', (WECHAT.id ? `微信号：${WECHAT.id}。` : '') + wechatTip, WECHAT.id,
        { image: WECHAT.qr, imageAlt: '爱学啊客服的微信名片（二维码）', copyLabel: '复制微信号' })
    })
  })
  document.querySelectorAll('.js-copy-wechat').forEach((b) => {
    b.addEventListener('click', async () => {
      if (!WECHAT.id) return
      await copyText(WECHAT.id)
      b.textContent = '已复制，去微信搜索添加'
    })
  })

  // ---- 下载体验：软件只能装在 Windows 电脑上，手机上给出网址让用户到电脑上打开 ----
  document.querySelectorAll('.js-download').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!isPhone) return
      e.preventDefault()
      showDialog('请在电脑上下载', `超级快捷键是 Windows 电脑软件，请在电脑浏览器里打开：${OFFICIAL_SITE.replace('https://', '')}`, OFFICIAL_SITE)
    })
  })

  // ---- 参与众筹：跳到课程网站上对应的课程；网址还没填时提示 ----
  document.querySelectorAll('.js-join[data-plan]').forEach((a) => {
    const url = PLAN_LINKS[a.dataset.plan]
    if (url) {
      a.href = url
      a.target = '_blank'
      a.rel = 'noopener'
      return
    }
    a.addEventListener('click', (e) => {
      e.preventDefault()
      showDialog(`参与众筹：${a.dataset.name}`, '购买链接即将公布，敬请关注。也可以先加客服微信了解。')
    })
  })

  // ---- 介绍视频：CONFIG.videoUrl 填上视频地址后直接跳过去；还没有时提示即将上线 ----
  document.querySelectorAll('.js-video').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = CONFIG.videoUrl
      if (url) {
        a.href = url
        a.target = '_blank'
        a.rel = 'noopener'
        return
      }
      e.preventDefault()
      showDialog('介绍视频即将上线', '视频上线后，点这里就能观看。')
    })
  })

  // ---- B 站、抖音：填了哪个显示哪个，都没填就不显示这一行 ----
  const social = document.querySelector('.js-social')
  if (social) {
    const parts = [['B 站', CONFIG.bilibili], ['抖音', CONFIG.douyin]].filter(([, v]) => v.name)
    for (const [label, v] of parts) {
      const item = document.createElement('span')
      item.append(`${label}：`)
      const link = document.createElement(v.url ? 'a' : 'span')
      link.textContent = v.name
      if (v.url) {
        link.href = v.url
        link.target = '_blank'
        link.rel = 'noopener'
        link.className = 'link'
      }
      item.append(link)
      social.append(item)
    }
    social.hidden = parts.length === 0
  }

})()
