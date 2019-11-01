#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const zgit = new RegExp(/\.git\\config|\.git\\HEAD$/i)
const conf = new RegExp(/config$/i)
const head = new RegExp(/head$/i)
const zresult = new RegExp(/.*?(?=\\\.git)/)
const ur = new RegExp(/(?<=url = ).*/)
const bran = new RegExp(/(?<=refs\/heads\/).*/)

function findAll (startPath) {
  fs.readdir(startPath, (err, files) => {
    if (err) {
      if (err.code === 'EPERM') {
        console.log('无权限访问')
      } else if (err.code === 'ENOENT') {
        console.log('无文件或目录')
      } else {
        console.warn(err)
      }
    } else {
      files.forEach((val) => {
        const fPath = path.join(startPath, val)
        fs.stat(fPath, (err, stats) => {
          if (err) {
            if (err.code === 'EPERM') {
              console.log('无权限访问')
            } else if (err.code === 'ENOENT') {
              console.log('无文件或目录')
            } else {
              console.warn(err)
            }
          } else {
            const isDir = stats.isDirectory()
            if (isDir) {
              findAll(fPath)
            }
            if (stats.isFile() && fPath.match(zgit)) {
              all(fPath)
            }
          }
        })
      })
    }
  })
}

for (let i = 65; i <= 90; i++) {
  const disk = String.fromCharCode(i)
  const startPath = path.resolve(disk + ':/')
  findAll(startPath)
}
function all (fPath) {
  const file = fPath.match(zresult)
  const fileconfig = fPath.match(conf)
  const filehead = fPath.match(head)
  if (fileconfig !== null) {
    url(file, fileconfig)
  }
  if (filehead !== null) {
    branch(file, filehead)
  }
}
function url (file, fileconfig) {
  const url = fileconfig.input
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) console.warn(err)
    else {
      const result = data.match(ur)
      if (result && file) {
        console.log('所在文件目录', file[0], '\n远程地址：', result[0])
      } else if (!result && file) {
        console.log('所在文件目录', file[0], '\n不存在远程地址\n当前无分支')
      } else {

      }
    }
  })
}
function branch (file, filehead) {
  const url = filehead.input
  fs.readFile(url, 'utf8', (err, data) => {
    const result = data.match(bran)
    if (err) console.warn(err)
    else if (result && file) {
      console.log('所在文件目录', file[0], '\n所在分支：', result[0])
    } else if (!result && file) {
      console.log('所在文件目录', file[0], '\n当前无分支')
    } else {

    }
  })
}
