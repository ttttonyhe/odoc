/*
  首页
*/
import React from "react";
import Link from "next/link";
import axios from "axios";

class Index extends React.Component<Readonly<{}>, { links: [] }> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      links: [],
    };
  }
  componentDidMount() {
    axios.get("api/list/personal/post").then((res) => {
      this.setState({
        links: res.data,
      });
    });
  }
  render() {
    return (
      <div>
        <p>this is the home</p>
        {this.state.links.map(
          (
            item: Readonly<{ folderName?: string; folderFiles?: [] }>,
            index
          ) => {
            if (item.folderName == undefined) {
              return (
                <Link href={"post" + item} key={"post" + index}>
                  {item}
                </Link>
              );
            } else {
              // map 的每一次有且只有一次 return
              return item.folderFiles.map((subitem: any, index) => {
                return (
                  <Link href={"post" + subitem} key={"subPost" + index}>
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
}
export default Index;