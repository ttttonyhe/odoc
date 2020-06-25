/*
  获取 :page 目录下所有目录中所有路由路径
  :page 内容以 - 分隔表示目录
*/

const fs = require("fs");
const { resolve } = require("path");
const join = require("path").join;

export default (
  req: Readonly<{}>,
  res: {
    statusCode: number;
    setHeader: (arg0: string, arg1: string) => void;
    end: (arg0: string) => void;
  }
) => {
  // 获取当前项目路径
  let catePath: string = resolve("./") + "/src/pages/posts";
  // 获取当前项目排除路径
  let cateExcludePath: string = resolve("./") + "/src/pages";
  // 初始化内容数组
  let catesArray: any = [];

  // 获取路径下所有文件数组
  let cates = fs.readdirSync(catePath);
  // 遍历文件数组
  cates.forEach(function (item: any) {
    // 获取当前文件路劲
    let cPath = join(catePath, item);
    // 获取当前文件数据
    let stat = fs.statSync(cPath);
    // 判断是否为文件夹
    if (stat.isDirectory() === true) {
      catesArray.push({
        cateName:cPath.replace(catePath + '/', ""),
        catePath:cPath.replace(cateExcludePath, "")
      });
    }
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(catesArray));
};
