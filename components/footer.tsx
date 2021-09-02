/*
 全站底部
*/

import React from "react";
import axios from "axios";
import { Link } from "@geist-ui/react";
import { withRouter } from "next/router";

// 获取全局配置
import odoc from "../../odoc.config";

class Footer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postData: {},
    };
  }
  async componentDidMount() {
    // 请求 API 获取文章信息
    this.getPostInfo();
    // 监听路由改变重新获取信息
    this.props.router.events.on("routeChangeComplete", () => {
      this.getPostInfo();
    });
  }
  async getPostInfo() {
    let routeArray = this.props.router.pathname.split("/");
    let postRoute: string = "";
    /*
      当前处在文章页内
      i18n 开启时路由地址按 / 分隔长度大于 5
      i18n 关闭时路由地址按 / 分隔长度大于 4
    */
    if (
      (odoc.i18nEnable && routeArray.length >= 5) ||
      (!odoc.i18nEnable && routeArray.length >= 4)
    ) {
      // 获取文章页路由
      for (let i = 2; i < routeArray.length; ++i) {
        if (i == 2) postRoute += routeArray[i];
        else postRoute += "-" + routeArray[i];
      }
      let data: {
        updateDate: string;
        postRoute: string;
      };
      // 获取文章信息
      data = await axios.get("/api/post/" + postRoute).then((res) => {
        return res.data;
      });
      this.setState({
        postData: data,
      });
    } else {
      this.setState({
        postData: "default",
      });
    }
  }
  render() {
    let routeArray = this.props.router.pathname.split("/");
    // 文章页内与主页判断
    return (odoc.i18nEnable && routeArray.length >= 5) ||
      (!odoc.i18nEnable && routeArray.length >= 4) ? (
      <div className="foot">
        <p>
          <span>
            {odoc.i18nEnable && this.props.i18n !== "default"
              ? odoc.i18nLangConfig[this.props.i18n].footer
              : "Edit this page on"}
            &nbsp;
            <b>
              <Link
                href={
                  "https://github.com/" +
                  odoc.githubRepo.name +
                  "/tree/" +
                  odoc.githubRepo.branch +
                  "/src/pages" +
                  this.props.router.pathname +
                  ".mdx"
                }
                icon
                color
              >
                Github
              </Link>
            </b>
          </span>
          <span>
            {odoc.i18nEnable && this.props.i18n !== "default"
              ? odoc.i18nLangConfig[this.props.i18n].date
              : "last update"}{" "}
            &nbsp;
            <b>{this.state.postData.updateDate}</b>
          </span>
        </p>
      </div>
    ) : (
      <div className="foot">
        <p className="default">
          {odoc.i18nEnable && this.props.i18n !== "default"
            ? odoc.i18nLangConfig[this.props.i18n].footer
            : "Edit this page on"}
          &nbsp;
          <b>
            <Link
              href={
                "https://github.com/" +
                odoc.githubRepo.name +
                "/tree/" +
                odoc.githubRepo.branch +
                "/src/pages" +
                this.props.router.pathname +
                (this.props.router.pathname == "/" ? "index.mdx" : "/index.mdx")
              }
              icon
              color
              target="_blank"
            >
              Github
            </Link>
          </b>
        </p>
      </div>
    );
  }
}

export default withRouter(Footer);
