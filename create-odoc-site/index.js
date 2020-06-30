#!/usr/bin/env node

const prompts = require("prompts");
const Listr = require('listr');
const odocRepo = require("github-download-parts");
const fs = require("fs");
const execa = require("execa");

(async () => {
    const siteInfo = await prompts([{
            type: "text",
            name: "siteName",
            message: "Please enter your ODoc site name(default will be: ODoc)",
            initial: "ODoc"
        },
        {
            type: "text",
            name: "siteUrl",
            message: "Please enter your ODoc site url(default will be: https://docs.ouorz.com)",
            initial: "https://docs.ouorz.com"
        },
        {
            type: "text",
            name: "githubRepoName",
            message: "Please enter your github repo. directory(default will be: HelipengTony/odoc)",
            initial: "HelipengTony/odoc"
        },
        {
            type: "text",
            name: "githubRepoBranch",
            message: "Please enter your github repo. branch(default will be master)",
            initial: "master"
        },
        {
            type: "text",
            name: "siteDes",
            message: "Please enter your site description",
            initial: "One-click-away Documentation"
        },
        {
            type: "text",
            name: "siteKeywords",
            message: "Please enter your site keywords (separate using ',')",
            initial: "docs,documentation"
        },
        {
            type: "text",
            name: "siteI18n",
            message: "Do you want to enable i18n? (enter 'true' or 'false')",
            initial: "true"
        },
    ])

    new Listr([{
            title: 'Basic structure generation',
            task: async () => {
                await odocRepo('HelipengTony/odoc', '.', 'example')
            }
        },
        {
            title: 'Dependencies installation',
            task: async () => {
                await execa("yarn", ["install"])
            }
        },
        {
            title: 'Configuration file generation',
            task: async () => {
                const configContent = `
                    module.exports = {
                        siteName: "${siteInfo.siteName}",
                        onlineSiteUrl: "${siteInfo.siteUrl}",
                        githubRepo: {
                            name: "${siteInfo.githubRepoName}",
                            branch: "${siteInfo.githubRepoBranch}"
                        },
                        siteDes: "${siteInfo.siteDes}",
                        siteKeywords: "${siteInfo.siteKeywords}",
                        i18nEnable: "${siteInfo.siteI18n}",
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
                `;
                fs.writeFile("odoc.config.js", configContent, function (err) {
                    if (err) {
                        console.error('Generation failed');
                    } else {
                        if (siteInfo.siteI18n) {
                            console.log("You have enabled i18n, please edit 'odoc.config.js' to customize translation");
                        }
                        console.log("ODoc setup has completed. Please wait...");
                        return;
                    }
                });
            }
        }
    ]).run();

})()