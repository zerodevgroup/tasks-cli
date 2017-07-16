#!/usr/bin/env node
const packageJson = require('./package.json')
const program = require('commander')
const R = require('ramda')
const shell = require('shelljs')
const fs = require('fs')
const Task = require('./lib/task.js')

program
  .command('list')
  .description('List Tasks.')
  .action(() => {
    const task = new Task()
    task.list()
  })

program
  .command('done')
  .description('Mark a task done.')
  .action((taskIndex) => {
    const task = new Task()
    task.done(taskIndex)
  })

program
  .command('undone')
  .description('Mark a task undone.')
  .action((taskIndex) => {
    const task = new Task()
    task.undone(taskIndex)
  })

program
  .command('progress')
  .description('Mark a task in progress.')
  .action((taskIndex) => {
    const task = new Task()
    task.progress(taskIndex)
  })

program
  .command('remove')
  .description('Remove a task.')
  .action((taskIndex) => {
    const task = new Task()
    task.remove(taskIndex)
  })

program
  .command('doctor')
  .description('Show development environment settings')
  .action((type) => {
    const platform = process.platform
    const nodePath = R.trim(shell.which('node'))
    const npmVersion = R.trim(shell.exec('npm --version', { silent: true }).stdout)
    const npmPath = R.trim(shell.which('npm'))
    const nodeVersion = R.trim(shell.exec('node --version', { silent: true }).stdout)

    const body = `
\`\`\`
Computer
  Platform: ${platform}
Node
  Version: ${nodeVersion}
  Path: ${nodePath}
NPM
  Version: ${npmVersion}
  Path: ${npmPath}
\`\`\`
`
    console.log(body)
  })

program.parse(process.argv)

if(!program.args.length) program.help()
