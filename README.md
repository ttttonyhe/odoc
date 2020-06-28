# ODoc
One-click-away Documentation

<br/>

ODoc 是一个支持**热加载/预览**、一键**生产环境**部署，基于 [MDX](https://mdxjs.com) 文件生成路由的文档站点生成引擎。基于 [Next.js](https://www.nextjs.cn) 开发并支持框架提供的全部特性，插件、热预览、静态站点生成等。
零代码需求，只需撰写 **MarkDown** 文件并通过文件夹按分类归档，即可快速生成文档站点。支持 **React 组件**的预览和内容嵌入、支持按**标题搜索**的功能(全文搜索后续更新)、通过 [Prism.js](https://prismjs.com) 支持**代码高亮**等。

<br/>

## 快速开始

ODoc 提供一个 Starter Kit，你可以一键安装已完善好环境配置的站点包，快速开始进行内容装载。只需在终端执行以下命令 (可通过 npm 或 yarn 安装)，当然，在此之前请确保你的本地环境支持 Node.js / TypeScript，并已经初始化好一个 NPM 项目。
```bash
npm create odoc-site / yarn create odoc-site
```

<br/>

## 慢速开始

如果你对上面的命令行不熟悉，我们也可以从头开始讲。请先行建立一个空白文件夹，并进行 NPM 初始化：
```bash
npm init / yarn init
```
接下来在终端执行：
```bash
npm create odoc-site
```