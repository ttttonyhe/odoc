/*
  全站顶部
*/
// NOTE: 不通过 next/link 改变路由路径
import React from "react";
import { useRouter } from "next/router";
import { Tabs, Button, ButtonDropdown } from "@zeit-ui/react";
import { Book, Github, FileText, Coffee } from "@zeit-ui/react-icons";

// 读取全局配置
import odoc from "../../odoc.config";

// 获取已生成的菜单数据
import menuItems from "../../src/data/menuitems.json";

function Header({ i18n }) {
  const router = useRouter();
  let routerArray = router.pathname.split("/");
  let currentRoute =
    routerArray[1] == "posts"
      ? odoc.i18nEnable
        ? "/" + routerArray[1] + "/" + routerArray[2] + "/" + routerArray[3]
        : "/" + routerArray[1] + "/" + routerArray[2]
      : router.pathname;
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
        value={currentRoute}
        initialValue="/"
        hideDivider
        onChange={(path) => {
          router.push(path);
        }}
        className={odoc.i18nEnable ? "i18nTabs" : ""}
      >
        <Tabs.Item label="Home" value="/"></Tabs.Item>
        {menuItems.map((item: any, index) => {
          // 判断 i18n 开启，只展示当前语言目录下的分类 Tab
          if (odoc.i18nEnable && i18n !== undefined) {
            if (item.catePath.indexOf(odoc.i18nConfig[i18n]) > -1) {
              // 配置结构缺陷解决方案
              if (i18n == "default") {
                var i18nReplace = odoc.i18nConfig[odoc.i18nConfig[i18n]];
              } else {
                var i18nReplace = odoc.i18nConfig[i18n];
              }
              return (
                <Tabs.Item
                  label={item.catePath.replace(i18nReplace + "/", "")}
                  value={item.catePath}
                  key={"menu" + index}
                ></Tabs.Item>
              );
            }
          } else {
            return (
              <Tabs.Item
                label={item.cateName}
                value={item.catePath}
                key={"menu" + index}
              ></Tabs.Item>
            );
          }
        })}
      </Tabs>
      <div className="right-div">
        {
          // i18n 开启时不展示作者按钮
          odoc.i18nEnable ? (
            ""
          ) : (
            <a href="https://www.ouorz.com" target="_blank">
              <Button size="mini" auto>
                <FileText />
                ODoc Author
              </Button>
            </a>
          )
        }
        <a href="https://github.com/HelipengTony" target="_blank">
          <Button size="mini" auto>
            <Github />
            ODoc
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
