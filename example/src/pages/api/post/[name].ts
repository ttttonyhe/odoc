/*
  根据路由 :name 获取文件信息
  :name 内容以 - 分隔表示目录
*/

const fs = require("fs");
const { resolve } = require("path");

export default (
  req: Readonly<{
    query: {
      name: string;
    };
  }>,
  res: {
    statusCode: number;
    setHeader: (arg0: string, arg1: string) => void;
    send: (arg0: string) => void;
  }
) => {
  let fileString: string = req.query.name;

  // 获取当前文件路径 / 替换 -
  let filePath: string =
    resolve("./") +
    "/src/pages/posts/" +
    fileString.replace(/-/g, "/") +
    ".mdx";

  // 判断文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err: any) => {
    if (!err) {
      // 获取当前文件数据
      let stat = fs.statSync(filePath);

      if (stat.isFile() === true) {
        // 获取当前文件修改日期
        let timeNumber: Date = new Date(stat.mtime);

        // 获取当前文件项目内完整路由
        let fileRoute: string = "/posts/" + fileString.replace("-", "/");

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            postRoute: fileRoute,
            updateDate: timeNumber.toLocaleDateString().replace(/\//g, "-"),
          })
        );
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            errMsg: "No such file",
          })
        );
      }
    } else {
      // 文件不存在
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          errMsg: "No such file or directory",
        })
      );
    }
  });
};
