#!/usr/bin/env node
'use strict'

const commander = require('commander');

commander
    .usage('<command>')

commander
    .command('dev')
    .description('project is running at http://10.8.27.168:8088')
    .action(()=>{
        require('../command/devAction')
    })
commander
    .command('build')
    .option('-p, --progress','show compile progress') //打印出编译进度的百分比值
    .action((options)=>{
        require('../command/prodAction')(options)
    })
commander.parse(process.argv)
