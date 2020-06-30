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
import {
  ZeitProvider,
  CssBaseline,
  Modal,
  ButtonDropdown,
} from "@zeit-ui/react";
import { Globe } from "@zeit-ui/react-icons";

// MDX 代码高亮
import { MDXProvider } from "@mdx-js/react";

// 通过 Prism-react-render 实现代码高亮
import CodeBlock from "../../odoc/lib/components/codeBlock";

// 导入 ODoc 全局配置文件
import odocConfig from "../../odoc.config";

// 配置代码高亮选项
const components = {
  pre: (
    props: JSX.IntrinsicAttributes &
      import("react").ClassAttributes<HTMLDivElement> &
      import("react").HTMLAttributes<HTMLDivElement>
  ) => <div {...props} />,
  code: CodeBlock,
};

// 函数组件
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Modal 组件关闭开启状态，用于手机端展示 sidebar
  const [state, setState] = React.useState(false);
  let [langNow, setLang] = React.useState<any>(odocConfig.i18nConfig.default);
  const handler = () => setState(true);
  const closeHandler = () => {
    setState(false);
  };

  // 网页标题获取
  let title: string;
  if (router.pathname == "/") {
    // 全站主页
    title = `${odocConfig.siteName} - ${odocConfig.siteDes}`;
  } else if (router.pathname.split("/").length == 3) {
    // 分类主页
    title = router.pathname.split("/")[2];
  } else if (router.pathname.split("/").length >= 4) {
    // 按 / 分隔长度大于 4 的地址取最后一项为标题
    title = router.pathname.split("/")[router.pathname.split("/").length - 1];
  }

  return (
    <ZeitProvider>
      <Head>
        <title>{title}</title>
        <meta name="description" content={odocConfig.siteDes} />
        <meta name="keywords" content={odocConfig.siteKeywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      {
        /* 
        i18n 开启判断，开启时展示语言切换按钮
        ButtonDropdown.Item 带 main 属性为默认展示
        切换语言时路由回到主页以完善体验
      */
        odocConfig.i18nEnable ? (
          <ButtonDropdown size="mini" auto className="lang">
            <ButtonDropdown.Item
              main
              onClick={() => {
                setLang(langNow);
                router.push("/");
              }}
            >
              <Globe /> {langNow}
            </ButtonDropdown.Item>
            {odocConfig.i18nLangs.map((item, key) => {
              return (
                <ButtonDropdown.Item
                  onClick={() => {
                    setLang(item);
                    router.push("/");
                  }}
                  key={"lang" + key}
                >
                  {item}
                </ButtonDropdown.Item>
              );
            })}
          </ButtonDropdown>
        ) : (
          ""
        )
      }
      <Header i18n={langNow} />
      {
        /* 
        非主页页面手机端展示「点击查看目录」的按钮
        以激活下方 Modal 展示 sidebar 组件
      */
        router.pathname !== "/" ? (
          <div onClick={handler} className="mobile-side">
            <p>
              {odocConfig.i18nEnable && langNow !== "default"
                ? odocConfig.i18nLangConfig[langNow].sidebar.mobileIndex
                : "Click to view Index"}
            </p>
          </div>
        ) : (
          ""
        )
      }
      <Modal open={state} onClose={closeHandler}>
        <Modal.Content>
          <div onClick={closeHandler}>
            <Sidebar i18n={langNow} />
          </div>
        </Modal.Content>
      </Modal>
      <div className="main markdown-body">
        {
          // 主页不展示 Sidebar
          router.pathname !== "/" ? <Sidebar i18n={langNow} /> : ""
        }
        <div className={router.pathname !== "/" ? "view" : "view home"}>
          <div className="center">
            <div className="content">
              <MDXProvider components={components}>
                <Component {...pageProps} />
              </MDXProvider>
            </div>
            <div className="aside">
              <RightSide i18n={langNow} />
            </div>
          </div>
          <Footer i18n={langNow} />
        </div>
      </div>
    </ZeitProvider>
  );
}

export default MyApp;
