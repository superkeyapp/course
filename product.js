// 作品详情页：按地址里的 id 从 data/site.js 取一个作品，显示是什么、在哪个档位、技术、优势、对应目录、截图、全部下载链接
import { productById, tierName, tiersIncluding } from './data/site.js'

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const root = document.getElementById('product')
const p = productById(new URLSearchParams(location.search).get('id'))

if (!p) {
  root.querySelector('.product-missing').hidden = false
} else {
  document.title = `${p.name} · 超级快捷键课程`
  const plans = tiersIncluding(p)
  const where = p.tier === 'public' ? '公开，不用购买' : `包含在：${plans.join('、')}`
  const downloads = p.visit
    ? `<p><a class="btn btn-brand" href="${esc(p.visit)}" target="_blank" rel="noopener">访问网站</a></p>`
    : p.downloads.length
      ? `<ul class="dl-list">${p.downloads.map((d, i) => `
          <li>
            <span class="dl-name">${esc(d.label)}${i === 0 ? '<small>推荐</small>' : ''}</span>
            ${d.note ? `<span class="dl-note">${esc(d.note)}</span>` : ''}
            ${d.url ? `<a class="btn btn-brand btn-sm" href="${esc(d.url)}" target="_blank" rel="noopener">下载</a>` : '<span class="work-soon">即将提供</span>'}
          </li>`).join('')}</ul>`
      : '<p class="work-soon">这个作品暂不提供下载。</p>'
  const shots = p.shots.length
    ? `<div class="shots">${p.shots.map((s) => `<button type="button" class="shot"><img src="screens/${esc(s)}" alt="${esc(p.name)} 截图" loading="lazy"></button>`).join('')}</div>`
    : '<p class="work-soon">截图即将补上。</p>'

  // 试验项目：标题下面一个醒目的提示，再单独一节“现状”（能用的、不完善的）
  const notice = p.experimental
    ? `<div class="exp-notice"><strong>试验项目，不完善</strong>按现状提供，不保证完整可用；目前没有更新计划，如果课程反响好，会考虑继续完善。适合当参考，看看这种做法；不适合当成日常使用的软件。</div>`
    : ''
  const status = p.status
    ? `<section>
        <h2>现状</h2>
        <h3 class="status-h">能用的</h3>
        <ul class="product-pros">${p.status.works.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <h3 class="status-h">不完善的</h3>
        <ul class="product-pros status-missing">${p.status.missing.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </section>`
    : ''

  root.insertAdjacentHTML('beforeend', `
    <section class="product-head">
      <h1>${esc(p.name)}</h1>
      <p class="product-tier">${p.experimental ? '<em class="exp">试验 · 不完善</em>' : ''}<em class="tier-${p.tier}">${esc(tierName(p.tier))}</em>${esc(where)}</p>
      ${notice}
      <p class="product-summary">${esc(p.summary)}</p>
      <ul class="work-tech">${p.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </section>
    <section>
      <h2>是什么</h2>
      <p>${esc(p.intro)}</p>
      <h2>优势</h2>
      <ul class="product-pros">${p.pros.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <h2>对应的源码目录</h2>
      <p class="product-dirs">${p.dirs.map((d) => `<code>${esc(d)}/</code>`).join('')}</p>
    </section>
    ${status}
    ${p.video ? `<section>
      <h2>效果演示</h2>
      <p><a class="btn btn-video" href="${esc(p.video)}" target="_blank" rel="noopener">▶ 观看效果演示视频</a></p>
    </section>` : ''}
    <section>
      <h2>截图</h2>
      ${shots}
    </section>
    <section id="download">
      <h2>${p.visit ? '访问' : '下载体验'}</h2>
      ${downloads}
    </section>
    <p class="product-back"><a class="btn btn-outline" href="index.html#works">← 看其他作品</a> <a class="btn btn-accent" href="index.html#price">参与众筹</a></p>`)

  // 点截图放大看
  const box = document.getElementById('lightbox')
  root.addEventListener('click', (e) => {
    const img = e.target.closest('.shot')?.querySelector('img')
    if (!img) return
    box.querySelector('img').src = img.src
    box.hidden = false
  })
  box.addEventListener('click', () => { box.hidden = true })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') box.hidden = true })
}
