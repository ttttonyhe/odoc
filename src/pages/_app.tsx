/*
  页面主要入口
*/
import { AppProps } from "next/app";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import menuItems from "../data/menuitems.json";
import sidebarItems from "../data/sidebaritems.json";

// 引入 Zeit-UI React
import { ZeitProvider, CssBaseline } from "@zeit-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Header menuItems={menuItems} />
      <div>
        <Sidebar sidebarItems={sidebarItems} />
        <Component {...pageProps} />
      </div>
    </ZeitProvider>
  );
}

export default MyApp;
