"use strict";
/*
  获取 :page 目录下所有目录中所有路由路径
  :page 内容以 - 分隔表示目录
*/
exports.__esModule = true;
var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
// 获取当前项目路径
var catePath = resolve("../") + "/src/pages/posts";
// 获取当前项目排除路径
var cateExcludePath = resolve("../") + "/src/pages";
// 初始化内容数组
var catesArray = [];
// 获取路径下所有文件数组
var cates = fs.readdirSync(catePath);
// 遍历文件数组
cates.forEach(function (item) {
    // 获取当前文件路劲
    var cPath = join(catePath, item);
    // 获取当前文件数据
    var stat = fs.statSync(cPath);
    // 判断是否为文件夹
    if (stat.isDirectory() === true) {
        catesArray.push({
            cateName: cPath.replace(catePath + "/", ""),
            catePath: cPath.replace(cateExcludePath, "")
        });
    }
});
var file = resolve("../") + "/src/data/menuitems.json";
//写入文件
fs.writeFile(file, JSON.stringify(catesArray), function (err) {
    if (err) {
        return console.log(err);
    }
    else {
        console.log("ready - menu has been generated");
    }
});
exports["default"] = {};
