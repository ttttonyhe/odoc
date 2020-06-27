/*
  获取 pages/posts/ 目录下所有文件夹名称/路由
  {
    cateName:string,
    catePath:string
  }
*/

const fs = require("fs");
const { resolve } = require("path");
const join = require("path").join;

// 获取当前项目路径
let catePath: string = resolve("../../") + "/src/pages/posts";
// 获取当前项目排除路径
let cateExcludePath: string = resolve("../../") + "/src/pages";
// 初始化内容数组
let catesArray: { cateName: string; catePath: string }[] = [];

// 获取路径下所有文件数组
let cates = fs.readdirSync(catePath);
// 遍历文件数组
cates.forEach(function (item: any) {
  // 获取当前文件路劲
  let cPath: string = join(catePath, item);
  // 获取当前文件数据
  let stat = fs.statSync(cPath);
  // 判断是否为文件夹
  if (stat.isDirectory() === true) {
    catesArray.push({
      cateName: cPath.replace(catePath + "/", ""),
      catePath: cPath.replace(cateExcludePath, ""),
    });
  }
});

const file = resolve("../../") + "/src/data/menuitems.json";

//写入文件
fs.writeFile(file, JSON.stringify(catesArray), function (err: any) {
  if (err) {
    return console.log(err);
  } else {
    console.log("ready - menu has been generated");
  }
});

export default {};
