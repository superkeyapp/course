// Vite 的配置：只有这一项，其余全用默认（入口是根目录的 index.html，打包到 dist/，public/ 原样复制）
export default {
  // 打包后的文件用相对路径引用：放在网站根目录、子目录（如 /course/）都能用
  base: './',
}
