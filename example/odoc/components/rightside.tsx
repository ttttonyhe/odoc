/*
  全站右边栏
*/
import React from "react";

// 引入路由
import { useRouter } from "next/router";

// 引入 UI 库
import {
  Chrome,
  ChevronsRight,
  Github,
  Facebook,
  Twitter,
  Codesandbox,
  ChevronsLeft,
} from "@zeit-ui/react-icons";
import {
  Button,
  AutoComplete,
  useClipboard,
  useToasts,
  Tooltip,
} from "@zeit-ui/react";

// 获取全局配置
import odoc from "../../odoc.config";

// 导入搜索引索
import searchIndex from "../../src/data/searchindex.json";

// 二维码生成依赖
import Qrcode from "qrcode.react";

function RightSide({ i18n }) {
  const router = useRouter();

  // 剪贴板访问
  const { copy } = useClipboard();

  // 提示组件
  const [, setToast] = useToasts();

  /* 搜索配置 */
  const allOptions = searchIndex;
  /* 
    NOTE:在函数组件中使用状态
    [name,function] = React.useState<nameType>()
  */
  const [options, setOptions] = React.useState<any>();
  let [searchValue, setValue] = React.useState<string>();
  // 搜索后的回调
  const searchHandler = (currentValue: string) => {
    if (currentValue) {
      const relatedOptions = allOptions.filter((item) =>
        item.value.includes(currentValue)
      );
      setOptions(relatedOptions);
    }
  };
  // 选择后的回调
  const selectHandler = (selectedValue: string) => {
    if (selectedValue) {
      router.push(selectedValue);
      setValue(selectedValue.replace("/posts/", ""));
    }
  };
  /* 搜索配置 */

  return (
    <div className="inside">
      <h3>
        {odoc.i18nEnable && i18n !== "default"
          ? odoc.i18nLangConfig[i18n].sidebar.search.title
          : "Search"}
      </h3>
      <AutoComplete
        options={options}
        value={searchValue}
        placeholder={
          odoc.i18nEnable && i18n !== "default"
            ? odoc.i18nLangConfig[i18n].sidebar.search.placeholder
            : "Search..."
        }
        onSearch={searchHandler}
        onSelect={selectHandler}
        clearable
        width="233px"
        size="large"
      />

      <h3>
        {odoc.i18nEnable && i18n !== "default"
          ? odoc.i18nLangConfig[i18n].sidebar.share.title
          : "Share"}
      </h3>
      <div className="card">
        <div className="icon icon0">
          <Chrome />{" "}
          <p>
            {odoc.i18nEnable && i18n !== "default"
              ? odoc.i18nLangConfig[i18n].sidebar.share.url
              : "Copy URL"}
          </p>
        </div>
        <div>
          <Button
            auto
            type="success"
            onClick={() => {
              copy(odoc.onlineSiteUrl + router.pathname);
              setToast({ text: "URL copied", type: "success" });
            }}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
      <div className="card">
        <div className="icon icon3">
          <Codesandbox />{" "}
          <p>
            {odoc.i18nEnable && i18n !== "default"
              ? odoc.i18nLangConfig[i18n].sidebar.share.qr
              : "QR Code"}
          </p>
        </div>
        <div>
          <Tooltip
            text={
              <>
                <Qrcode value={odoc.onlineSiteUrl + router.pathname} />
              </>
            }
            placement="left"
          >
            <Button auto type="success" className="qrcode">
              <ChevronsLeft />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="card">
        <div className="icon icon1">
          <Facebook />{" "}
          <p>
            {odoc.i18nEnable && i18n !== "default"
              ? odoc.i18nLangConfig[i18n].sidebar.share.fb
              : "Facebook"}
          </p>
        </div>
        <div>
          <a
            href={
              "https://www.facebook.com/sharer/sharer.php?u=" +
              odoc.onlineSiteUrl +
              router.pathname
            }
            target="_blank"
          >
            <Button auto type="success">
              <ChevronsRight />
            </Button>
          </a>
        </div>
      </div>
      <div className="card">
        <div className="icon icon2">
          <Twitter />{" "}
          <p>
            {odoc.i18nEnable && i18n !== "default"
              ? odoc.i18nLangConfig[i18n].sidebar.share.tw
              : "Twitter"}
          </p>
        </div>
        <div>
          <a
            href={
              "http://twitter.com/share?text=ODoc is the best&url=" +
              odoc.onlineSiteUrl +
              router.pathname
            }
            target="_blank"
          >
            <Button auto type="success">
              <ChevronsRight />
            </Button>
          </a>
        </div>
      </div>

      <h3>
        {odoc.i18nEnable && i18n !== "default"
          ? odoc.i18nLangConfig[i18n].sidebar.source.title
          : "Source"}
      </h3>
      <div className="card">
        <div className="icon">
          <Github />{" "}
          <p>
            {odoc.i18nEnable && i18n !== "default"
              ? odoc.i18nLangConfig[i18n].sidebar.source.repo
              : "Repository"}
          </p>
        </div>
        <div>
          <a
            href={"https://github.com/" + odoc.githubRepo.name}
            target="_blank"
          >
            <Button auto type="success">
              <ChevronsRight />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
