/*
 全站底部
*/

import React from "react";
import axios from "axios";
import { withRouter } from "next/router";

class Footer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postData: {},
    };
  }
  async componentDidMount() {
    this.getPostInfo();
    this.props.router.events.on("routeChangeComplete", () => {
      this.getPostInfo();
    });
  }
  async getPostInfo() {
    let routeArray = this.props.router.pathname.split("/");
    let postRoute: string = "";
    // 当前处在文章页内
    if (routeArray.length >= 4) {
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
    return this.props.router.pathname.split("/").length >= 4 ? (
      <div className="foot">
        <p>
          Edit this page on{" "}
          <a
            href={
              "https://github.com/HelipengTony/docs-site/tree/master/src/pages" +
              this.props.router.pathname +
              ".mdx"
            }
          >
            Github
          </a>
          | update date:
          {this.state.postData.updateDate}
        </p>
      </div>
    ) : (
      <div className="foot">
        <p>This is footer | nothing</p>
      </div>
    );
  }
}

export default withRouter(Footer);
