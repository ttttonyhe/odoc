/*
  页面主要入口
*/
import { AppProps } from "next/app";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

// 引入 Zeit-UI React
import { ZeitProvider, CssBaseline } from "@zeit-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Header/>
      <div>
        <Sidebar/>
        <Component {...pageProps} />
        <Footer />
      </div>
    </ZeitProvider>
  );
}

export default MyApp;
