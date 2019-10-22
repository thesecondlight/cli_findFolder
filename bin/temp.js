#!/usr/bin/env node
let  fs = require('fs');
let path=require('path')
const zgit=new RegExp(/\.git$/i)
const conf = new RegExp(/config$/i)
const head=new RegExp(/head$/i)
const zresult = new RegExp(/.*?(?=\\\.git)/)
let url=[]
let branch=[]
let cnt=1
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
let startPath
for(let i=65;i<=90;i++){
    let a=String.fromCharCode(i)
    startPath = path.resolve(a+':/')
    //console.log(startPath)
    let fileNames = findSync(startPath)
}
// startPath = path.resolve('D://c')
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
      if(filepath===null){
        break
      }
        let qwq=filepath[0]
      
      //console.log('上----- 包含.git的文件夹',filepath[0])
      if (qwq === zzr[1]) {
        break;
      }
      else{
        zzr.push(qwq)
        count_all++;
      }
      //console.log("下---所在文件夹=>",filepath[0])  //存在重复
    }
    
    for (let i = 0; i < zzr.length - 1; i++) {
        if (zzr[i] === zzr[i + 1]) {
          zzr.splice(i, 1)
          i--
          break;
          return 
          //删除
          //console.log("xixi 这一行",zzr[oo])
          //zzr[i+1]='undefined'
          //console.log("xixixixiixix",zzr[oo])
        }
    }
      return zzr
  }
 
  let zz = zfilepath()
  //去重  很多次去重，怎么没用？？
  for(let i=0;i<zz.length;i++){
    if(zz[i] === zz[i+1]){
      zz.splice(i,1)
      i--
   }
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
        //console.log('远程地址=>', url[i])
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

