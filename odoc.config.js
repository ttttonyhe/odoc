module.exports = {
    siteName: "ODoc",
    onlineSiteUrl: "https://docs.ouorz.com",
    githubRepo: {
        name: "HelipengTony/docs-site",
        branch: "master"
    },
    siteDes: "One-click-away Documentation",
    siteKeywords: "docs,docs generator,documentation",
    i18nEnable: true,
    i18nConfig: {
        "default": "English",
        "English": "/posts/en",
        "Chinese": "/posts/cn"
    },
    i18nLangs: ["English", "Chinese"],
    i18nLangConfig: {
        "English": {
            footer: "Edit this page on",
            date: "last update",
            sidebar: {
                index: "Home",
                search: {
                    title: "search",
                    placeholder: "Search..."
                },
                share: {
                    title: "Share",
                    url: "Copy URL",
                    qr: "QR Code",
                    fb: "Facebook",
                    tw: "Twitter"
                },
                source: {
                    title: "Source",
                    repo: "Repository"
                },
                mobileIndex: "Click to view index"
            }
        },
        "Chinese": {
            footer: "参与此页面的编辑",
            date: "最后更新",
            sidebar: {
                index: "文档首页",
                search: {
                    title: "页面搜索",
                    placeholder: "关键词..."
                },
                share: {
                    title: "分享页面",
                    url: "复制链接",
                    qr: "二维码图",
                    fb: "脸书分享",
                    tw: "推特分享"
                },
                source: {
                    title: "内容仓库",
                    repo: "Github 仓库"
                },
                mobileIndex: "展开页面引索"
            }
        }
    }
}