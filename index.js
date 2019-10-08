// #!/user/bin/env node
let  fs = require('fs');
let ppath=require('path')
let  join = require('path').join;
let Path='D:\\js'
const zgit=new RegExp(/\.git$/i)
const dirgit=new RegExp(/(?<=\\).*?(?=\\.git)/);
let fileNames=findSync(Path)   //存.git文件夹下的文件路径
function findSync(startPath) { //某路径下全部文件
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path)
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile() && path.match(zgit)) result.push(fPath); //包含git的
        });
    }
    finder(startPath);
    //return result;
    return result[0].match(dirgit)
}
let pp=new RegExp(/(?<= \ ).*/);
let result=fileNames[0].match()
console.log(result)

//从config中取出远程地址和当前分支 所在文件夹
// async function doTruncate(FilePath) {
//     //let filehandle = null;
//     let ur=new RegExp(/(?<=url = ).*/);
//     let bran=new RegExp(/(?<=branch ").*?(?="])/);
//     try {
//       const fr=await fs.readFileSync(FilePath, 'utf8');
//       const url=fr.match(ur)
//       const branch=fr.match(bran)
//       console.log("远程地址",url[0])
//       console.log("当前分支",branch[0])
//     } catch(err) {
//       console.log(err)
//     }
//   }
// let conf=new RegExp(/config$/i)
// const FilePath=[]
// for(let i=0;i<fileNames.length;i++){
//     if(fileNames[i].match(conf)){
//         FilePath.push(fileNames[i])
//         //console.log(FilePath)
//     }
// }
// for(let i=0;i<FilePath.length;i++)
// {
//     doTruncate(FilePath[i])
// }
