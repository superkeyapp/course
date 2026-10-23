// 作品墙：按档位显示作品卡片（数据在 data/site.js）。选一个档位，显示它包含的全部作品（高档位包含低档位的）；
// 公开的作品（官网）一直显示。每张卡片：缩略图、名称、档位、一句话、技术、查看详情 / 下载体验（主链接）/ 更多下载方式
import { products, tiers, tierName } from './data/site.js'

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const tierIndex = (id) => tiers.findIndex((t) => t.id === id)

function card(p) {
  const detail = `product.html?id=${p.id}`
  const shot = p.shots[0]
  const main = p.downloads[0]
  let actions
  if (p.visit) {
    actions = `<a class="btn btn-brand btn-sm" href="${esc(p.visit)}" target="_blank" rel="noopener">访问网站</a>`
  } else if (main?.url) {
    actions = `<a class="btn btn-brand btn-sm" href="${esc(main.url)}" target="_blank" rel="noopener">下载体验</a>`
      + (p.downloads.length > 1 ? `<a class="work-more" href="${detail}#download">更多下载方式 →</a>` : '')
  } else {
    actions = `<span class="work-soon">${p.downloads.length ? '下载即将提供' : '暂不提供下载'}</span>`
  }
  // 效果演示：有视频时一个按钮，点了在新窗口打开（如 B 站）
  const video = p.video ? `<a class="work-video" href="${esc(p.video)}" target="_blank" rel="noopener">▶ 效果演示</a>` : ''
  return `
    <article class="work" id="work-${p.id}">
      <a class="work-shot" href="${p.video ? esc(p.video) : detail}"${p.video ? ' target="_blank" rel="noopener"' : ''}>${shot ? `<img src="screens/${esc(shot)}" alt="${esc(p.name)}" loading="lazy">` : '<span>截图即将补上</span>'}${p.video ? '<i class="work-play" aria-hidden="true">▶</i>' : ''}</a>
      <div class="work-body">
        <div class="work-head"><h3>${esc(p.name)}</h3><span class="work-tags">${p.experimental ? '<em class="exp">试验 · 不完善</em>' : ''}<em class="tier-${p.tier}">${esc(tierName(p.tier))}</em></span></div>
        <p>${esc(p.summary)}</p>
        <ul class="work-tech">${p.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="work-actions"><a class="btn btn-outline btn-sm" href="${detail}">查看详情</a>${actions}${video}</div>
      </div>
    </article>`
}

export function renderWorks(section) {
  if (!section) return
  const tabs = section.querySelector('.works-tabs')
  const grid = section.querySelector('.works-grid')
  let current = 'full'   // 默认看全套版：全部作品都显示，卡片上的标签标明各自在哪个档位
  const show = () => {
    const max = tierIndex(current)
    grid.innerHTML = products.filter((p) => p.tier === 'public' || tierIndex(p.tier) <= max).map(card).join('')
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tier === current)))
    const hint = section.querySelector('.works-hint')   // 标准版：默认 WinUI，可以换成别的界面
    if (hint) hint.hidden = current !== 'standard'
  }
  tabs.innerHTML = tiers.map((t) => {
    const n = products.filter((p) => p.tier !== 'public' && tierIndex(p.tier) <= tierIndex(t.id)).length
    return `<button type="button" role="tab" data-tier="${t.id}">${esc(t.name)}<small>${n} 个</small></button>`
  }).join('')
  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('button')
    if (!b) return
    current = b.dataset.tier
    show()
  })
  show()
}
