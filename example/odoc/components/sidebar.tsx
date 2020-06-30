/*
  全站左边栏
*/
import Link from "next/link";
import { useRouter } from "next/router";

import { Home } from "@zeit-ui/react-icons";
import { Button } from "@zeit-ui/react";

// 获取已生成的左边栏数据
import sidebarItems from "../../src/data/sidebaritems.json";

// 全局配置文件
import odocConfig from "../../odoc.config";

interface sidebarItemsType {
  name?: string;
  path?: string;
  href?: any;
  folderName?: string;
  folderFiles?: [];
}

function Sidebar({ i18n }) {
  const router = useRouter();
  let cate: string =
    router.pathname.split("/")[1] == "posts"
      ? "/posts/" +
        (odocConfig.i18nEnable
          ? router.pathname.split("/")[2] + "/" + router.pathname.split("/")[3]
          : router.pathname.split("/")[2])
      : "";
  if (
    cate == "" ||
    (odocConfig.i18nEnable && router.pathname.split("/").length < 4)
  ) {
    return (
      <div className="side">
        <p>404 Not Found</p>
        <Button
          auto
          type="success-light"
          onClick={() => {
            router.push("/");
          }}
        >
          Back to Home
        </Button>
      </div>
    );
  } else {
    // 路由 / 分隔数组
    const routerArray = router.pathname.split("/");
    // 当前分类主页按钮
    const homeRoute =
      routerArray[1] == "posts"
        ? odocConfig.i18nEnable
          ? "/" + routerArray[1] + "/" + routerArray[2] + "/" + routerArray[3]
          : "/" + routerArray[1] + "/" + routerArray[2]
        : router.pathname;
    return (
      <div className="side">
        <Link href={homeRoute}>
          <a>
            <h4 className={homeRoute == router.pathname ? "active" : ""}>
              <Home />
              {odocConfig.i18nEnable && i18n !== "default"
                ? odocConfig.i18nLangConfig[i18n].sidebar.index
                : "Home"}
            </h4>
          </a>
        </Link>
        {
          // 数据对象按照路由名称为键获取数据
          sidebarItems[cate].listContent.map(
            (item: Readonly<sidebarItemsType>, index: string) => {
              if (item.folderName == undefined) {
                return (
                  <Link href={item.path} key={"post" + index}>
                    <a>
                      <h4
                        className={item.path == router.pathname ? "active" : ""}
                      >
                        {item.name}
                      </h4>
                    </a>
                  </Link>
                );
              } else {
                /* 
                获取文件夹内文件
                map 的每一次有且只有一次 return
              */
                return (
                  <div key={"folder" + item.folderName} className="section">
                    <h3>{item.folderName}</h3>
                    {item.folderFiles.map(
                      (subitem: Readonly<sidebarItemsType>, index) => {
                        return (
                          <Link href={subitem.path} key={"subPost" + index}>
                            <a>
                              <h4
                                className={
                                  subitem.path == router.pathname
                                    ? "active"
                                    : ""
                                }
                              >
                                {subitem.name}
                              </h4>
                            </a>
                          </Link>
                        );
                      }
                    )}
                  </div>
                );
              }
            }
          )
        }
      </div>
    );
  }
}

export default Sidebar;
