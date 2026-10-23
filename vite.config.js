// Vite 的配置：入口是根目录的 index.html（课程介绍）和 product.html（作品详情页，所有作品共用），打包到 dist/，public/ 原样复制
export default {
  // 打包后的文件用相对路径引用：放在网站根目录、子目录（如 /course/）都能用
  base: './',
  build: {
    rollupOptions: {
      input: { main: 'index.html', product: 'product.html' },
    },
  },
}
