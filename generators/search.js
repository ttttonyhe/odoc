"use strict";
exports.__esModule = true;
/*
  获取 pages/posts/ 目录下所有文件夹内的文件名称/路由
  不引索 index.mdx 文件
  建立引索
  {
    label: string,
    value: string
  }
*/
var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
var fileContent = {};
// 获取当前项目路径
var filesPath = resolve("../../") + "/src/pages/posts/";
// 获取路由排除路径
var filesExcludePath = resolve("../../") + "/src/pages";
// 初始化内容数组
var filesArray = [];
var findJsonFile = function (path) {
    // 获取路径下所有文件数组
    var files = fs.readdirSync(path);
    // 遍历文件数组
    files.forEach(function (item) {
        // 获取当前文件路劲
        var fPath = join(path, item);
        // 获取当前文件数据
        var stat = fs.statSync(fPath);
        // 判断是否为文件夹
        if (stat.isDirectory() === true) {
            // 排除三层及更深文件夹
            /* 判断为文件夹，跳过继续执行
             */
            // 判断为文件夹，递归获取文件夹内文件并传参文件夹子对象的键位
            findJsonFile(fPath);
        }
        // 判断是否为文件
        if (stat.isFile() === true) {
            // 判断不为文件夹内文件
            // 获取文件名称
            var fileName = fPath
                .split("/")[fPath.split("/").length - 1].replace(/\.mdx+$/g, "");
            // 判断是否为隐藏文件 (开头是否为 .)
            if (fileName.charAt(0) !== "." && fileName !== "index") {
                // 增加至 filesArray 数组
                filesArray.push({
                    label: fileName,
                    value: fPath.replace(filesExcludePath, "").replace(/\.mdx+$/g, "")
                });
            }
        }
    });
    return filesArray;
};
var file = resolve("../../") + "/src/data/searchindex.json";
//写入文件
fs.writeFile(file, JSON.stringify(findJsonFile(filesPath)), function (err) {
    if (err) {
        return console.log(err);
    }
    else {
        console.log("ready - search index has been generated");
    }
});
exports["default"] = {};
