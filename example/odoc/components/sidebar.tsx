/*
  全站左边栏
*/
import Link from "next/link";
import { useRouter } from "next/router";

// 获取已生成的左边栏数据
import sidebarItems from "../../src/data/sidebaritems.json";

interface sidebarItemsType {
  name?: string;
  path?: string;
  href?: any;
  folderName?: string;
  folderFiles?: [];
}

function Sidebar() {
  const router = useRouter();
  let cate: string =
    router.pathname.split("/")[1] == "posts"
      ? "/posts/" + router.pathname.split("/")[2]
      : "";
  if (cate == "") {
    return (
      <div className="side">
        <p>this is sidebar</p>
      </div>
    );
  } else {
    // 当前分类主页按钮
    const homeRoute =
      router.pathname.split("/")[1] == "posts"
        ? "/" +
          router.pathname.split("/")[1] +
          "/" +
          router.pathname.split("/")[2]
        : router.pathname;
    return (
      <div className="side">
        <Link href={homeRoute}>
          <a>
            <h4 className={homeRoute == router.pathname ? "active" : ""}>
              主页 Introduction
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
                                subitem.path == router.pathname ? "active" : ""
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
        )}
      </div>
    );
  }
}

export default Sidebar;
