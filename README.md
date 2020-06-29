<div align="center">
  <h1>ODoc</h1>
  <p>One-click-away Documentation</p>
  <a href="https://github.com/HelipengTony/odoc">
    <img src="https://img.shields.io/github/forks/HelipengTony/odoc.svg" alt="forks">
  </a>

  <a href="https://github.com/HelipengTony/odoc">
    <img src="https://img.shields.io/github/stars/HelipengTony/odoc.svg" alt="stars">
  </a>

  <a href="https://github.com/HelipengTony/odoc">
    <img src="https://img.shields.io/github/license/HelipengTony/odoc.svg" alt="license">
  </a>
</div>

<br/>

<br/>

ODoc 是一个支持**热加载/预览**、一键**生产环境**部署，基于 [MDX](https://mdxjs.com) 文件生成路由的文档站点生成引擎。基于 [Next.js](https://www.nextjs.cn) 开发并支持框架提供的全部特性，插件、热预览、静态站点生成等。
零代码需求，只需撰写 **MarkDown** 文件并通过文件夹按分类归档，即可快速生成文档站点。支持 **React 组件**的预览和内容嵌入、支持按**标题搜索**的功能(全文搜索后续更新)、通过 [Prism.js](https://prismjs.com) 支持**代码高亮**等。

<br/>

## Get Started 快速开始

ODoc 提供一个 Starter Kit，你可以一键安装已完善好环境配置的站点包，快速开始进行内容装载。只需在终端执行以下命令 (可通过 npm 或 yarn 安装)，当然，在此之前请确保你的本地环境支持 Node.js / TypeScript，并已经初始化好一个 NPM 项目。
```bash
npm create odoc-site / yarn create odoc-site
```
如果出现 Connection Refused 或其他如 Promise Error 等本地网络与 Github 连接问题，请尝试直接通过以下命令获取 ODoc，克隆完成后需手动修改 odoc.config.js 以配置全局设置。
```bash
git clone -b example git@github.com:HelipengTony/odoc.git
yarn install / npm install
```

<br/>

## Slow-mo 慢速开始

如果你对上面的命令行不熟悉，我们也可以从头开始讲。请先行建立一个空白文件夹，并进行 NPM 初始化：
```bash
npm init / yarn init
```
接下来在终端执行：
```bash
npm create odoc-site
```
如果出现 Connection Refused 或其他如 Promise Error 等本地网络与 Github 连接问题，请尝试直接通过以下命令获取 ODoc，克隆完成后需手动修改 odoc.config.js 以配置全局设置。
```bash
git clone -b example git@github.com:HelipengTony/odoc.git
yarn install / npm install
```
接下来进行 odoc.config.js 全局文件配置，输入关键信息：
+ 站点名
+ 站点在线地址
+ 站点 Github 仓库
+ 站点 Repo 分支

![configuration_generation_1](https://i.loli.net/2020/06/29/A65Q8ioMqfYcjae.png)

接下来等待步骤完成，并自动开始配置：

![configuration_generation_2](https://i.loli.net/2020/06/29/AZbDkqpRnKtiI5Y.png)


<br/>

## Donation 赞助作者
Your name will be on the list [Donation](https://www.ouorz.com/donation)
<br/>

![Donate](https://i.loli.net/2019/02/18/5c6a80afd1e26.png)

<br/>

File an issue if you encountered any problem
<br/>
I will reply you as soon as possible