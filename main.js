// 落地页的交互：功能视频滑到眼前才播放、手机上点“下载”给出电脑网址、付款和介绍视频（还没定时）的提示
(() => {
  const OFFICIAL_SITE = 'https://superkeyapp.github.io'
  const isPhone = /Android|iPhone|iPad|iPod|HarmonyOS|Mobile/i.test(navigator.userAgent)

  // ---- 弹窗 ----
  const dialog = document.getElementById('dialog')
  const title = document.getElementById('dialog-title')
  const text = document.getElementById('dialog-text')
  const copyBtn = document.getElementById('dialog-copy')
  let copyValue = ''

  function showDialog(t, body, copy) {
    title.textContent = t
    text.textContent = body
    copyValue = copy || ''
    copyBtn.hidden = !copy
    copyBtn.textContent = '复制网址'
    dialog.hidden = false
  }
  document.getElementById('dialog-close').addEventListener('click', () => { dialog.hidden = true })
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.hidden = true })
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
    } catch {
      // 微信里有时不允许直接写剪贴板：用一个临时输入框复制
      const input = document.createElement('textarea')
      input.value = copyValue
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    copyBtn.textContent = '已复制'
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
