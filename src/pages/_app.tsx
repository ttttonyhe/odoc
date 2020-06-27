/*
  页面主要入口
*/
import { AppProps } from "next/app";
import { useState } from "react";

// 引入全局组件
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import RightSide from "../components/rightside";
import Footer from "../components/footer";

// 引入全局样式
import "../style/main.scss";
import "github-markdown-css";

// Nprogress 进度条引入与配置
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease-in-out",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.2,
});
// React Router 引入以配置进度条
import Router from "next/router";
// React Router 配置加载进度条
Router.events.on("routeChangeStart", () => {
  NProgress.inc();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

// 引入 Zeit-UI React
import { ZeitProvider, CssBaseline } from "@zeit-ui/react";

// MDX 代码高亮
import { MDXProvider } from "@mdx-js/react";

// 通过 Prism-react-render 实现代码高亮
import CodeBlock from "./codeBlock";
const components = {
  pre: (props) => <div {...props} />,
  code: CodeBlock,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [themeType, setThemeType] = useState('dark')
  const switchThemes = () => {
    setThemeType(lastThemeType => lastThemeType === 'dark' ? 'light' : 'dark')
  }
  return (
    <ZeitProvider theme={{ type: themeType }}>
      <CssBaseline />
      <Header />
      <div className="main markdown-body">
        <Sidebar />
        <div className="view">
          <div className="center">
            <div className="content">
              <MDXProvider components={components}>
                <Component {...pageProps} />
              </MDXProvider>
            </div>
            <div className="aside">
              <RightSide />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </ZeitProvider>
  );
}

export default MyApp;
