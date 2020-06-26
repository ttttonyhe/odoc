/*
  首页
*/
import Link from "next/link";
import { useRouter } from "next/router";
import sidebarItems from "../../data/sidebaritems.json";

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
      <div>
        <p>this is sidebar</p>
      </div>
    );
  } else {
    console.log(cate);
    return (
      <div>
        <p>this is sidebar</p>
        {sidebarItems[cate].listContent.map(
          (item: Readonly<sidebarItemsType>, index: string) => {
            if (item.folderName == undefined) {
              return (
                <Link href={item.path} key={"post" + index}>
                  <p>
                    {item.name}({item.path})
                  </p>
                </Link>
              );
            } else {
              // map 的每一次有且只有一次 return
              return (
                <div key={"folder" + item.folderName}>
                  <h5>{item.folderName}</h5>
                  {item.folderFiles.map(
                    (subitem: Readonly<sidebarItemsType>, index) => {
                      return (
                        <Link href={subitem.path} key={"subPost" + index}>
                          <p>
                            {subitem.name}({subitem.path})
                          </p>
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
