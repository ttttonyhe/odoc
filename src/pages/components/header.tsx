// NOTE: 不通过 next/link 改变路由路径
import { useRouter } from "next/router";
import { Tabs } from "@zeit-ui/react";

function Header({ menuItems }) {
  const router = useRouter();
  /*
      NOTE: 进入 /posts/ 路由下，更改菜单项 value 为 /posts/:分类名
    */
  return (
    <header>
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
    </header>
  );
}

export default Header;
