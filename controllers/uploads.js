const path=require('path')
const {v4:uuid4}=require('uuid');
const fs=require('fs')
const { response } = require("express");
const { subirArch } = require("../helpers/subir-arch");
const Usuario=require('../models/user.model')
const Producto=require('../models/producto');

const cargarArchivo=async(req,res=response)=>{
    
    
    try {
    
        const nombre=await subirArch(req.files,undefined,'imgs')
        res.json({
            nombre:nombre
        })        
    } catch (error) {
        res.status(400).json({msg:error})

    }    


    // const {archivo}=req.files
    // const nombreCortado=archivo.name.split('.')
    // const extension=nombreCortado[nombreCortado.length-1]
    
    // const extensionValid=['png','jpg','jpeg','txt','md']
    // if(!extensionValid.includes(extension)){
    //     return res.status(400).json({
    //         msg:`la extension ${extension} no es permitida , ${extensionValid}`
    //     })
    // }
   
    // const nombreTemp=uuid4()+'.'+extension
    // const uploadPath= path.join(__dirname,'../uploads/'+nombreTemp)

    // archivo.mv(uploadPath,(err)=>{
    //     if(err){
    //         return res.status(500).json({err})
    //     }
    //     res.json({
    //         msg:`archivo ${archivo.name} subido correctamente a ${uploadPath}`
    //     })
    // })



}   

const actualizarImagen=async(req,res=response)=>{
    const {id,coleccion}=req.params;

    let modelo;
    let nombre
    switch (coleccion) {
        case 'usuarios':
            modelo=await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe usuario con id ${id}`
                })
            }
           
            break;
    
        case 'productos':
            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe producto con id ${id}`
                })
            }
           
            break;

        default:
            return res.status(500).json({msg:'Seme olvido validar esto'})
    }

  
    if(modelo.img){
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }
    nombre=await subirArch(req.files,undefined,coleccion)
    modelo.img=nombre
    await modelo.save()

    res.json({
       modelo
    })

}

const mostrarImagen=async(req,res=response)=>{
    const {id,coleccion}=req.params
    
    
    let modelo;
    let nombre
    switch (coleccion) {
        case 'usuarios':
            modelo=await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe usuario con id ${id}`
                })
            }
           
            break;
    
        case 'productos':
            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`no existe producto con id ${id}`
                })
            }
           
            break;

        default:
            return res.status(500).json({msg:'Seme olvido validar esto'})
    }

  
    if(modelo.img){
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }
 

    const pathImagen=path.join(__dirname,'../asssets/user.ico')
    res.sendFile(pathImagen)

}


module.exports={
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}