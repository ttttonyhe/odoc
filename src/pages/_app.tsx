/*
  页面主要入口
*/
import { AppProps } from "next/app";
import Header from "./components/header";

// 引入 Zeit-UI React
import { ZeitProvider, CssBaseline } from "@zeit-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ZeitProvider>
      <CssBaseline />
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </ZeitProvider>
  );
}

export default MyApp;
