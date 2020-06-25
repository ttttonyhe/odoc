/*
  获取 :page 目录下所有目录中所有路由路径
  :page 内容以 - 分隔表示目录
*/

const fs = require("fs");
const { resolve } = require("path");
const join = require("path").join;

export default (
  req: Readonly<{
    query: {
      page: string;
    };
  }>,
  res: {
    statusCode: number;
    setHeader: (arg0: string, arg1: string) => void;
    end: (arg0: string) => void;
  }
) => {
  let fileString: string = req.query.page;
  // 获取当前项目路径
  let filesPath: string =
    resolve("./") + "/src/pages/posts/" + fileString.replace(/-/g, "/");
  // 获取路由排除路径
  let filesExcludePath: string =
    resolve("./") + "/src/pages";
  // 初始化内容数组
  let filesArray: any = [];

  let findJsonFile = (path: string, key?: number): [] => {
    // 获取路径下所有文件数组
    let files = fs.readdirSync(path);
    // 遍历文件数组
    files.forEach(function (item: any) {
      // 获取当前文件路劲
      let fPath = join(path, item);
      // 获取当前文件数据
      let stat = fs.statSync(fPath);
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
            folderName: fPath.replace(filesPath + '/', ""),
            folderFiles: [],
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
          let array = filesArray[key].folderFiles;
          filesArray[key].folderFiles[array.length] = fPath
            .replace(filesExcludePath, "")
            .split(".")[0];
        } else {
          // 判断不为文件夹内文件，增加至 filesArray 数组
          filesArray.push(fPath.replace(filesExcludePath, "").split(".")[0]);
        }
      }
    });
    return filesArray;
  };
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(findJsonFile(filesPath)));
};
