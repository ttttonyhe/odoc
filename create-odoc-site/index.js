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
    ])

    new Listr([{
            title: 'Cloning ODoc example',
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
                    export default {
                        siteName: "${siteInfo.siteName}",
                        onlineSiteUrl: "${siteInfo.siteUrl}",
                        githubRepo: {
                            name: "${siteInfo.githubRepoName}",
                            branch: "${siteInfo.githubRepoBranch}"
                        }
                    }
                `;
                fs.writeFile("odoc.config.js", configContent, function (err) {
                    if (err) {
                        console.error('Generation failed');
                    } else {
                        console.log("ODoc setup has completed. Please wait...");
                        return;
                    }
                });
            }
        }
    ]).run();

})()