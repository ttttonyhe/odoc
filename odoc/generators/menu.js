"use strict";
/*
  获取 pages/posts/ 目录下所有文件夹名称/路由
  {
    cateName:string,
    catePath:string
  }
*/
exports.__esModule = true;
var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
var odocConfig = require("../../odoc.config");
// 获取当前项目路径
var catePath = resolve("../../") + "/src/pages/posts";
// 获取当前项目排除路径
var cateExcludePath = resolve("../../") + "/src/pages";
// 初始化内容数组
var catesArray = [];
// i18n 开启时再深入一级目录来获取分类
if (odocConfig.i18nEnable) {
    var getFileFunction_1 = function (path, count) {
        var eachCount = 0;
        // 获取路径下所有文件数组
        var cates = fs.readdirSync(path);
        // 遍历文件数组
        cates.forEach(function (item) {
            // 获取当前文件路劲
            var cPath = join(path, item);
            // 获取当前文件数据
            var stat = fs.statSync(cPath);
            // 判断是否为文件夹
            if (stat.isDirectory() === true && !count) {
                // 递归一次
                getFileFunction_1(cPath, 1);
            }
            else {
                var fileName = cPath.split("/")[cPath.split("/").length - 1];
                if (fileName !== "index.mdx" && fileName.charAt(0) !== ".")
                    catesArray.push({
                        cateName: cPath.replace(catePath + "/", ""),
                        catePath: cPath.replace(cateExcludePath, "")
                    });
            }
        });
        return eachCount;
    };
    getFileFunction_1(catePath, 0);
}
else {
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
}
var file = resolve("../../") + "/src/data/menuitems.json";
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
