/*
 文章底部
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
    if (routeArray.length >= 4) {
      for (let i = 2; i < routeArray.length; ++i) {
        if (i == 2) postRoute += routeArray[i];
        else postRoute += "-" + routeArray[i];
      }
      let data: {
        updateDate: string;
        postRoute: string;
      };
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
      <p>
        This is footer | update date:
        {this.state.postData.updateDate}
      </p>
    ) : (
      <p>This is footer | nothing</p>
    );
  }
}

export default withRouter(Footer);
