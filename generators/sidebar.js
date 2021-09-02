"use strict";
exports.__esModule = true;
/*
  获取 pages/posts/ 目录下所有文件夹内的文件名称/路由
  不引索 index.mdx 文件
  {
    catePath: {
      listContent:[{
        folderName:string,
        folderFiles:[
          {
            name:string,
            path:string
          }
        ]
      }]
    }
  }
*/
var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
fs.readFile(resolve("../../") + "/src/data/menuitems.json", "utf-8", function (err, menuItems) {
    if (err) {
        console.error("error - menu has not been created");
    }
    else {
        var fileContent = {};
        menuItems = JSON.parse(menuItems);
        var _loop_1 = function (i) {
            var fileString = menuItems[i].cateName;
            // 获取当前项目路径
            var filesPath = resolve("../../") + "/src/pages/posts/" + fileString;
            // 获取路由排除路径
            var filesExcludePath = resolve("../../") + "/src/pages";
            // 初始化内容数组
            var filesArray = [];
            var findJsonFile = function (path, key) {
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
                        if (key == undefined) {
                            /* 判断为文件夹，向 filesArray 增加文件夹子对象
                           {
                             folderName: string,
                             folderFiles: array
                           }
                        */
                            filesArray.push({
                                folderName: fPath.replace(filesPath + "/", ""),
                                folderFiles: []
                            });
                            // 判断为文件夹，递归获取文件夹内文件并传参文件夹子对象的键位
                            findJsonFile(fPath, filesArray.length - 1);
                        }
                    }
                    // 判断是否为文件
                    if (stat.isFile() === true) {
                        // 判断是否非文件夹内的文件
                        if (key !== undefined) {
                            // 判断为文件夹内文件，增加至文件夹子对象 folderFiles 数组
                            var array = filesArray[key].folderFiles;
                            // 获取文件名称
                            var fileName = fPath
                                .replace(filesPath + "/" + filesArray[key].folderName + "/", "")
                                .replace(/\.mdx+$/g, "");
                            // 判断是否为隐藏文件 (开头是否为 .)
                            if (fileName.charAt(0) !== "." && fileName !== "index") {
                                // 只替换字符串右侧 .mdx 字符，避免文件(夹)名中出现 .mdx 字符
                                filesArray[key].folderFiles[array.length] = {
                                    name: fileName,
                                    path: fPath
                                        .replace(filesExcludePath, "")
                                        .replace(/\.mdx+$/g, "")
                                };
                            }
                        }
                        else {
                            // 判断不为文件夹内文件
                            // 获取文件名称
                            var fileName = fPath
                                .replace(filesPath + "/", "")
                                .replace(/\.mdx+$/g, "");
                            // 判断是否为隐藏文件 (开头是否为 .)
                            if (fileName.charAt(0) !== "." && fileName !== "index") {
                                // 增加至 filesArray 数组
                                filesArray.push({
                                    name: fileName,
                                    path: fPath
                                        .replace(filesExcludePath, "")
                                        .replace(/\.mdx+$/g, "")
                                });
                            }
                        }
                    }
                });
                return filesArray;
            };
            fileContent[menuItems[i].catePath] = {
                listContent: findJsonFile(filesPath)
            };
        };
        for (var i = 0; i < menuItems.length; i++) {
            _loop_1(i);
        }
        var file = resolve("../../") + "/src/data/sidebaritems.json";
        //写入文件
        fs.writeFile(file, JSON.stringify(fileContent), function (err) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log("ready - sidebar has been generated");
            }
        });
    }
});
exports["default"] = {};
