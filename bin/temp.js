#!/usr/bin/env node
let  fs = require('fs');
let path=require('path')
const zgit=new RegExp(/\.git$/i)
const conf = new RegExp(/config$/i)
const head=new RegExp(/head$/i)
const zresult = new RegExp(/.*?(?=\\\.git)/)
let url=[]
let branch=[]
let cnt=0
let allpath=new RegExp(/^[A-Za-z]+$/)
function findSync(startPath) { //某路径下全部文件
    var result=[]
    function hh(startPath,...result){
        const aPromise=new Promise((resolve,reject)=>{
        fs.readdir(startPath,function(err,files){
            if(err){
                //console.warn(err)
            }
            else{
                files.forEach((val) => {
                    var fPath=path.join(startPath,val);
                    var result=[]
                    fs.stat(fPath,(err,stats)=>{
                        if(err){
                            //console.warn('获取文件stats失败')
                        }else{
                                var isDir=stats.isDirectory()
                                if(isDir){
                                    findSync(fPath)
                                }
                                if(stats.isFile() && startPath.match(zgit)){  //匹配 .git文件路径             
                                    result.push(fPath)   
                                    resolve(result) 
                                    //console.log(result)
                                    all(result)               
                                }
                        }  
                    })
                });      
            }
        })
    })
    }
    hh(startPath, result)
    //return result
}
let startPath = path.resolve("D://")
let fileNames = findSync(startPath)
let count_all = 0
// console.log(fileNames)//存.git文件夹下的文件路径
let zzr = []
function all(result){
    // console.log(fileNames)
    // 所在文件夹
function zfilepath () {
    for (let i = 0; i < result.length; i++) {
      const filepath = result[i].match(zresult)
      if (filepath === zzr[1]) {
        break;
      }
      else{
        zzr.push(filepath[0])
        count_all++;
      }
      // console.log("所在文件夹=>",filepath[0])  //存在重复
    }
    for (let i = 0; i < zzr.length - 1; i++) {
        if (zzr[i] === zzr[i + 1]) {
          zzr.splice(i, 1)
          i--
          return 123
        }
    }
      return zzr
  }
 
  const zz = zfilepath()
    if(!zz[cnt]=='undefined'){
        console.log('包含.git的文件夹', zz[cnt])
    }
  // 从config中取出远程地址和当前分支
  let k = 0
  async function doTruncate (FilePath) {
    // let filehandle = null;
    const ur = new RegExp(/(?<=url = ).*/)
    try {
      const fr = await fs.readFileSync(FilePath, 'utf8')
      url = fr.match(ur)
      for(let i=0;i<url.length;i++){
         console.log(zz[cnt++], '远程地址=>', url[i])
      }
    } catch (err) {
      //console.log(err)
    }
  }
  async function doBranch (BFilePath) {
    // let filehandle = null;
    const bran = new RegExp(/(?<=refs\/heads\/).*/)
    try {
      const fr = await fs.readFileSync(BFilePath, 'utf8')
      branch = fr.match(bran)
      for(let i=0;i<url.length;i++){
   
        console.log('当前分支=>', branch[i])
      }
    } catch (err) {
      //console.log(err)
    }
  }
  let FilePath = []
  let BFilePath=[]
  for (let i = 0; i < result.length; i++) {
    if (result[i].match(conf)) {
      FilePath.push(result[i])
      //console.log(FilePath)
    }
  }

  for (let i = 0; i < result.length; i++) {
    if(result[i].match(head)){  //分支
        BFilePath.push(result[i])
    }
  }


  for (let i = 0; i < FilePath.length; i++) {
    doTruncate(FilePath[i])
  }
  for (let i = 0; i < BFilePath.length; i++) {
    doBranch(BFilePath[i])
  }
}
