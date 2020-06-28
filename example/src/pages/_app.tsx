/*
  页面主要入口
*/
import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

// 引入全局组件
import Header from "../../odoc/components/header";
import Sidebar from "../../odoc/components/sidebar";
import RightSide from "../../odoc/components/rightside";
import Footer from "../../odoc/components/footer";

// 引入全局样式
import "../../odoc/style/main.scss";
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
import { ZeitProvider, CssBaseline, Modal } from "@zeit-ui/react";

// MDX 代码高亮
import { MDXProvider } from "@mdx-js/react";

// 通过 Prism-react-render 实现代码高亮
import CodeBlock from "../../odoc/lib/components/codeBlock";
const components = {
  pre: (
    props: JSX.IntrinsicAttributes &
      import("react").ClassAttributes<HTMLDivElement> &
      import("react").HTMLAttributes<HTMLDivElement>
  ) => <div {...props} />,
  code: CodeBlock,
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Modal 组件关闭开启状态，用于手机端展示 sidebar
  const [state, setState] = React.useState(false);
  const handler = () => setState(true);
  const closeHandler = () => {
    setState(false);
  };

  // 网页标题获取
  let title: string;
  if (router.pathname == "/") {
    title = "ODoc - One-click-away Documentation";
  } else if (router.pathname.split("/").length == 3) {
    title = router.pathname.split("/")[2];
  } else if (router.pathname.split("/").length >= 4) {
    title = router.pathname.split("/")[router.pathname.split("/").length - 1];
  }
  return (
    <ZeitProvider>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <Header />
      {router.pathname !== "/" ? (
        <div onClick={handler} className="mobile-side">
          <p>Click to view Index</p>
        </div>
      ) : (
        ""
      )}
      <Modal open={state} onClose={closeHandler}>
        <Modal.Content>
          <div onClick={closeHandler}>
            <Sidebar />
          </div>
        </Modal.Content>
      </Modal>
      <div className="main markdown-body">
        {router.pathname !== "/" ? <Sidebar /> : ""}
        <div className={router.pathname !== "/" ? "view" : "view home"}>
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
