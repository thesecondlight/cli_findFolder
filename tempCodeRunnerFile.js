async function doTruncate(FilePath) {
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
