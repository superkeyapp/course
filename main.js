// 落地页的交互：功能视频滑到眼前才播放、手机上点“下载”给出电脑网址、付款和介绍视频（还没定时）的提示
(() => {
  const OFFICIAL_SITE = 'https://superkeyapp.github.io'
  // 客服微信：只改这里。二维码图片换成真的以后，把 qr 改成 'assets/wechat-qr.png'（页面底部那张在 index.html 里也改一下）
  const WECHAT = { id: '', qr: 'assets/wechat-qr.svg' }
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
  if (WECHAT.id) {
    document.querySelectorAll('.js-wechat-id').forEach((el) => {
      el.textContent = WECHAT.id
      el.classList.remove('todo')
    })
  }
  const wechatTip = '在微信里长按二维码即可添加；也可以复制微信号，到微信里搜索添加。'
  document.querySelectorAll('.js-contact').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      showDialog('联系客服微信', (WECHAT.id ? `微信号：${WECHAT.id}。` : '微信号待定。') + wechatTip, WECHAT.id,
        { image: WECHAT.qr, imageAlt: '客服微信二维码', copyLabel: '复制微信号' })
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

  // ---- 参与众筹：付款方式定了以后，把这里换成真正的付款链接或二维码 ----
  document.querySelectorAll('.js-join[data-plan]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      showDialog(`参与众筹：${a.dataset.plan}`, '付款方式即将公布，敬请关注。')
    })
  })

  // ---- 介绍视频：data-url 填上 B 站地址后直接跳过去；还没有时提示即将上线 ----
  document.querySelectorAll('.js-video').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = a.dataset.url
      if (url) {
        a.href = url
        a.target = '_blank'
        a.rel = 'noopener'
        return
      }
      e.preventDefault()
      showDialog('介绍视频即将上线', '视频会发布在 B 站，上线后点这里就能观看。')
    })
  })

  // ---- 功能演示视频：滑到眼前才加载、播放，滑走就暂停（省流量） ----
  const videos = document.querySelectorAll('video.js-autoplay')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) target.play().catch(() => {})
        else target.pause()
      }
    }, { threshold: 0.4 })
    videos.forEach((v) => io.observe(v))
  } else {
    videos.forEach((v) => { v.autoplay = true })
  }
})()
