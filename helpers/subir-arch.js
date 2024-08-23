const path=require('path')
const {v4:uuid4}=require('uuid')



const subirArch=(files,extensionValid=['png','jpg','jpeg','txt','md','ico'] ,carpeta='')=>{

    return new Promise((resolve,reject)=>{
        const {archivo}=files
        const nombreCortado=archivo.name.split('.')
        const extension=nombreCortado[nombreCortado.length-1]
        
        
        if(!extensionValid.includes(extension)){
            return reject(`la extension ${extension} no es permitida, ${extensionValid}`
            )
        }
    
        const nombreTemp=uuid4()+'.'+extension
        const uploadPath= path.join(__dirname,'../uploads/',carpeta,nombreTemp)

        archivo.mv(uploadPath,(err)=>{
            if(err){
               reject(err)
            }
           resolve(nombreTemp)
        })


    })


    
}


module.exports={
    subirArch
}