import React from "react";
import Link from "next/link";

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

class Header extends React.Component<propsType, any> {
  constructor(props: propsType) {
    super(props);
  }
  navigateTo = (path: string): void => {
    Router.push(path);
  };
  render() {
    return (
      <header>
        <Tabs
          value={this.props.router.pathname}
          initialValue="/"
          hideDivider
          onChange={this.navigateTo}
        >
          <Tabs.Item label="Hello" value="/post/hello"></Tabs.Item>
          <Tabs.Item label="Home" value="/"></Tabs.Item>
        </Tabs>
      </header>
    );
  }
}
export default withRouter(Header);
