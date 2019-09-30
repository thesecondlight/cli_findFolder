// #!/user/bin/env node
let  fs = require('fs');
let path=require('path')
const zgit=new RegExp(/\.git$/i)

function findSync(startPath) { //某路径下全部文件
    var result=[]
    var that=this
    function hh(startPath,...result){
        fs.readdir(startPath,function(err,files){
            if(err){
                //console.warn(err)
            }
            else{
                files.forEach((val) => {
                    var fPath=path.join(startPath,val);
                    
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
                                //console.log(result)  
                                                      
                            }
                            
                        }
                          
                    })
                    
                });  
                
                 
            }
            
        })
    }
    hh(startPath, result)
    //console.log(result)
    //return result  
    return result 

}
  
var startPath=path.resolve('D:\\js')
let fileNames=findSync(startPath)
console.log(fileNames)//存.git文件夹下的文件路径

// console.log(filepaths[2])
//从config中取出远程地址和当前分支 所在文件夹
async function doTruncate(FilePath) {
    //let filehandle = null;
    let ur=new RegExp(/(?<=url = ).*/);
    let bran=new RegExp(/(?<=branch ").*?(?="])/);
    try {
      const fr=await fs.readFileSync(FilePath, 'utf8');
      const url=fr.match(ur)
      const branch=fr.match(bran)
      console.log("远程地址",url[0])
      console.log("当前分支",branch[0])
    } catch(err) {
      console.log(err)
    }
  }
let conf=new RegExp(/config$/i)
// const FilePath=[]
// for(let i=0;i<fileNames.length;i++){
//     if(fileNames[i].match(conf)){
//         FilePath.push(fileNames[i])
//         //console.log(FilePath)
//     }
// }
// for(let i=0;i<filepaths.length;i++)
// {
//     doTruncate(filepaths[i])
// }


