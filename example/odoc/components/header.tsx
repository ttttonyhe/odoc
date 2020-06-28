/*
  全站顶部
*/
// NOTE: 不通过 next/link 改变路由路径
import React from "react";
import { useRouter } from "next/router";
import { Tabs, Button } from "@zeit-ui/react";
import { Book, Github, FileText, Coffee } from "@zeit-ui/react-icons";

// 读取全局配置
import odoc from "../../odoc.config";

// 获取已生成的菜单数据
import menuItems from "../../src/data/menuitems.json";

function Header() {
  const router = useRouter();
  /*
      NOTE: 进入 /posts/ 路由下，更改菜单项 value 为 /posts/:分类名
    */
  return (
    <header className="header">
      <div className="logo">
        <Book />
        <span>{odoc.siteName}</span>
      </div>
      <Tabs
        value={
          router.pathname.split("/")[1] == "posts"
            ? "/" +
              router.pathname.split("/")[1] +
              "/" +
              router.pathname.split("/")[2]
            : router.pathname
        }
        initialValue="/"
        hideDivider
        onChange={(path) => {
          router.push(path);
        }}
      >
        <Tabs.Item label="Home" value="/"></Tabs.Item>
        {menuItems.map((item: any, index) => {
          return (
            <Tabs.Item
              label={item.cateName}
              value={item.catePath}
              key={"menu" + index}
            ></Tabs.Item>
          );
        })}
      </Tabs>
      <div className="right-div">
        <a href="https://www.ouorz.com" target="_blank">
          <Button size="mini" auto>
            <FileText />
            Author
          </Button>
        </a>
        <a href="https://github.com/HelipengTony" target="_blank">
          <Button size="mini" auto>
            <Github />
            Github
          </Button>
        </a>
        <a href="https://www.ouorz.com/donation" target="_blank">
          <Button size="mini" auto type="warning" ghost>
            <Coffee />
            Donation
          </Button>
        </a>
      </div>
    </header>
  );
}

export default Header;
