import React from "react";
import Link from "next/link";
import axios from "axios";

// NOTE: 不通过 next/link 改变路由路径
import Router from "next/router";

import { Tabs } from "@zeit-ui/react";

/*
	NOTE:
	1. 类组件只能使用 withRouter()
	2. withRouter 的 TypeScript 类型支持需要从 "next/dist/client/with-router" 引入 WithRouterProps
*/
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

interface propsType extends WithRouterProps {}

class Header extends React.Component<
  propsType,
  { menuItems: []; notAtHomePath: string }
> {
  constructor(props: propsType) {
    super(props);
    this.state = {
      menuItems: [],
      notAtHomePath: null,
    };
  }
  componentDidMount() {
    // 获取全部分类
    axios.get("/api/list/cates/all").then((res) => {
      this.setState({
        menuItems: res.data,
      });
    });
  }
  // 处理路由跳转
  navigateTo = (path: string): void => {
    Router.push(path);
  };
  render() {
    /*
      NOTE: 进入 /posts/ 路由下，更改菜单项 value 为 /posts/:分类名
    */
    return (
      <header>
        <Tabs
          value={
            this.props.router.pathname.split("/")[1] == "posts"
              ? "/" +
                this.props.router.pathname.split("/")[1] +
                "/" +
                this.props.router.pathname.split("/")[2]
              : this.props.router.pathname
          }
          initialValue="/"
          hideDivider
          onChange={this.navigateTo}
        >
          <Tabs.Item label="Home" value="/"></Tabs.Item>
          {this.state.menuItems.map((item: any, index) => {
            return (
              <Tabs.Item
                label={item.cateName}
                value={item.catePath}
                key={"menu" + index}
              ></Tabs.Item>
            );
          })}
        </Tabs>
      </header>
    );
  }
}
export default withRouter(Header);
