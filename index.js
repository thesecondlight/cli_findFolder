// #!/user/bin/env node
let  fs = require('fs');
let  join = require('path').join;
let Path='F:\\'
const zgit=new RegExp(/\.git$/i) //包含.git的所有路径
let zresult=new RegExp(/.*?(?=\\\.git)/)
let fileNames=findSync(Path)   //存.git文件夹下的文件路径
function findSync(startPath) { //某路径下全部文件
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path)
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile() && path.match(zgit)){           
                    result.push(fPath);
            } //包含git的
        });
    }
    finder(startPath)
    return result
}

//console.log(fileNames)
//所在文件夹
function zfilepath(){
    let zzr=[]
    for(let i=0;i<fileNames.length;i++){
        const filepath=fileNames[i].match(zresult)
        zzr.push(filepath[0])
        //console.log("所在文件夹=>",filepath[0])  //存在重复
    }
    for(let i=0;i<zzr.length-1;i++){
        if(zzr[i]=== zzr[i+1]){
            zzr.splice(i,1)
            i--
        } 
    }
    return zzr
}
const zz=zfilepath()
console.log("包含.git的文件夹",zz)
//从config中取出远程地址和当前分支 
let k=0
async function doTruncate(FilePath) {
    //let filehandle = null;
    let ur=new RegExp(/(?<=url = ).*/);
    let bran=new RegExp(/(?<=branch ").*?(?="])/);
    try {
      const fr=await fs.readFileSync(FilePath, 'utf8');
      const url=fr.match(ur)
      const branch=fr.match(bran)
      
      console.log(zz[k++],"远程地址=>",url[0])
      console.log("当前分支=>",branch[0])
    } catch(err) {
      console.log(err)
    }
  }
let conf=new RegExp(/config$/i)
const FilePath=[]
for(let i=0;i<fileNames.length;i++){
    if(fileNames[i].match(conf)){
        FilePath.push(fileNames[i])
        //console.log(FilePath)
    }
}
for(let i=0;i<FilePath.length;i++)
{
    doTruncate(FilePath[i])
}
