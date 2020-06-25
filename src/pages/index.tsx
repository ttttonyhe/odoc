/*
  首页
*/
import React from "react";
import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";

function Index({ links }) {
  return (
    <div>
      <p>this is the home</p>
      {links.map(
        (
          item: Readonly<{
            href?: any;
            folderName?: string;
            folderFiles?: [];
          }>,
          index
        ) => {
          if (item.folderName == undefined) {
            return (
              <Link href={item} key={"post" + index}>
                {item}
              </Link>
            );
          } else {
            // map 的每一次有且只有一次 return
            return item.folderFiles.map((subitem: any, index) => {
              return (
                <Link href={subitem} key={"subPost" + index}>
                  {subitem}
                </Link>
              );
            });
          }
        }
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const links = await axios
    .get(`https://${context.req.headers.host}/api/list/posts/post`)
    .then((res) => {
      return res.data;
    })
    .catch(async () => {
      return await axios
        .get(`http://${context.req.headers.host}/api/list/posts/post`)
        .then((res) => {
          return res.data;
        });
    });
  return { props: { links } };
};

export default Index;
