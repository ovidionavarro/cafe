const Categoria  = require('../models/categoria');
const Role=require('../models/role')
const Usuario =require('../models/user.model')
Producto = require('../models/producto')

const es_rol_valido=async(rol='')=>{
    const existRol=await Role.findOne({rol});
    if(!existRol){
        throw new Error(`rol ${rol} no registrado`)
    }
}

const exist_Email=async(correo='')=>{
    const existeEmail=await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`correo ${correo} ya registrado`)
    }

}
const exist_Cat=async(id='')=>{
    const exist=await Categoria.findById(id)
    if(!exist){
        throw new Error(`categoria ${id} no existe`)
    }
}

const exsit_User=async(id='')=>{
    const exist=await Usuario.findById(id)
    if(!exist){
        throw new Error(`no existe usuario con id ${id}`)
    }  
}

const existProdutc=async(id='')=>{
    const exist=await Producto.findById(id)
    if(!exist){
        throw new Error(`no existe producto con id ${id}`)
    }  
}

const coleccionesPermitidas=(coleccion='',colecciones=[])=>{
    if(!colecciones.includes(coleccion)){
        throw new Error(`la colecccion ${coleccion} no es permitida, ${colecciones}`)
    }
    return true
}


module.exports={
    es_rol_valido,
    exist_Email,
    exsit_User,
    exist_Cat,
    existProdutc,
    coleccionesPermitidas
}