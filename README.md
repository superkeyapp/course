# 从 0 用 Vibe Coding 开发商业级 Windows 软件：超级快捷键 · 众筹落地页

爱学啊教育出品。

## 一、这是什么

课程的众筹宣传页：一页长图文，介绍课程讲什么、三个档位、众筹规则，引导用户去课程网站购买、加客服微信。
手机优先（大部分人在微信里打开），电脑上也适配。录课程介绍视频时，直接对着这个页面从上往下讲。

软件本身的功能介绍和演示视频不在这里重复写，统一放在软件官网（<https://superkeyapp.github.io>），这里只放入口。

## 二、用了什么技术

| 项目 | 说明 |
|---|---|
| 页面 | 普通的 HTML + CSS + JavaScript，不用任何框架 |
| [Vite](https://vite.dev) | 本地预览（改了文件自动刷新）、打包压缩；配置只有 `vite.config.js` 里的一行 |
| Node.js | 运行 Vite 用：20.19 以上，或 22.12 以上（推荐装最新的长期支持版） |

## 三、目录

```
index.html        全部文字和页面结构，从上往下就是页面的顺序
styles.css        样式：先写手机，屏幕宽度 720 以上再放宽成电脑布局；配色和软件官网一致，强调色是柔和的红
main.js           交互（首页）；works.js 作品墙，product.html + product.js 作品详情页（所有作品共用一个模板）
data/site.js      发布前要填的内容和所有链接：购买链接、客服微信、视频、账号（course）、站外链接（links，都是短链接）、网盘（hosts）、作品（products）
assets/           图标、截图：会被打包，文件名加上编号
public/           原样复制、不改名的文件（客服二维码）
vite.config.js    Vite 配置
package.json      依赖和命令
```

## 四、怎么修改

**改文字**：直接改 `index.html`。每一块前面有注释说明是哪一部分。

**改颜色、排版**：改 `styles.css`。最上面的 `:root` 里是全部颜色：`--brand` 是主色蓝，`--accent` 是强调色红。
强调色只用在最关键的地方（源码已完成、参与众筹按钮、价格、退款规则），不要到处用，用多了反而不突出。

**填购买网址、客服微信、视频、B 站、抖音、下载地址**：都在 `data/site.js` 里（`course`、`links`、`hosts`、各作品的 `downloads` 和 `video`），填好就生效；
站外链接一律先在 https://a.ixuea.com/uris/new 建短链接（Source 填目标地址，Media 填“众筹页”，Unit、Key 写位置和按钮名），再把短链接填进去，这样每个位置的点击次数都能统计；
空着时页面上给出“即将公布”之类的提示，不会出错。

| 字段 | 填什么 |
|---|---|
| `planLinks.standard`、`planLinks.advanced`、`planLinks.full` | 标准版、进阶版、全套版在课程网站上的课程页网址，点“参与众筹”直接跳过去 |
| `wechat.id` | 客服微信号 |
| `wechat.qr` | 客服微信名片（微信“我的二维码”，带头像、昵称）：图片放到 `public/` 目录，这里写文件名（如 `wechat-card-1.jpg`）；四角有黑边的先填成白色 |
| `videoUrl` | 课程介绍视频的 B 站地址（首屏的大封面） |
| `bilibili`、`douyin` | 账号名和主页地址；都空着时页面底部不显示这一行 |

**换图片**：
- `assets/` 里的图片（截图、图标）：直接替换同名文件即可，打包时文件名会自动加上新的编号。
- 客服名片（`public/` 里的）：**换一个新文件名**（如 `wechat-card-2.jpg`），再改 `data/site.js` 里 `course.wechat.qr`。
  `public/` 里的文件打包时不改名，用同一个文件名，用户的浏览器可能还在显示缓存里的旧图。

**临时占位**：还没定的文字可以写成 `<span class="todo">…</span>`，页面上显示成黄底，发布前全部替换掉。

## 五、修改后怎么预览

第一次使用先安装（只要装一次）：

```bash
npm install
```

然后：

```bash
npm run dev
```

命令行里会显示网址（默认 http://localhost:5173 ，被占用时自动换一个），浏览器打开即可。
改了文件保存后，页面自动刷新。看手机效果：浏览器按 F12 打开开发者工具，切换到手机模式。

## 六、怎么打包

```bash
npm run build      # 打包到 dist/：HTML、CSS、JS 压缩，图片等文件名加上按内容算出的编号
npm run preview    # 在本地打开打包后的结果，上传前确认一遍
```

`dist/` 里的东西就是要发布的全部文件。

注意：打包后的页面要通过网址打开（`npm run preview` 或放到服务器上），直接双击 `dist/index.html` 打不开，
因为浏览器不允许从本地文件加载模块格式的脚本。

## 七、怎么部署

把 `dist/` 目录里的**全部文件**上传到网站服务器的某个目录即可。放在网站根目录（如 `https://example.com/`）
或子目录（如 `https://example.com/course/`）都可以，因为 `vite.config.js` 里设置了用相对路径引用文件。

### 更新以后，用户会不会看到旧内容？

不会，只要服务器按下面设置缓存：

- **带编号的文件**（`assets/` 里，如 `index-BE8IVai_.css`）：内容一变，编号就变，文件名也就变了，
  浏览器一定会下载新的。这些文件可以让浏览器缓存很久。
- **`index.html`** 不带编号：要设置成**每次都向服务器确认有没有更新**（`no-cache`）。
  用户每次打开都拿到最新的 `index.html`，它再指向新编号的文件。
- **`public/` 里的文件**（二维码）也不带编号：换内容时换文件名（见第四节）。

Nginx 的配置示例（`/course/` 换成实际放的目录）：

```nginx
location /course/ {
    # index.html 等不带编号的文件：每次都向服务器确认
    add_header Cache-Control "no-cache";
}
location /course/assets/ {
    # 带编号的文件：缓存一年
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### 用 GitHub Pages 发布（已开启）

本仓库（`superkeyapp/course`，公开）已经开启 GitHub Pages，网址：<https://superkeyapp.github.io/course/>

**平时不用手动部署**：把改动推送到 `main` 分支，GitHub Actions（`.github/workflows/deploy.yml`）会自动
`npm run build` 并发布 `dist/`，一两分钟后生效。进度在仓库的 Actions 页面查看；也可以在那里手动运行“Deploy”。
GitHub Pages 默认缓存 10 分钟，更新后最多等 10 分钟就能看到，不需要另外设置。

## 八、约定

- 不写参考软件的名字；不放私有仓库的源码。
- 软件功能、演示视频只在软件官网维护，这里只放入口。
- 大的介绍视频放 B 站，这里只放封面。

## 声明

仅供学习和交流使用，请勿用于任何非法用途。
