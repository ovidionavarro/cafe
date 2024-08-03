const Role=require('../models/role')
const Usuario =require('../models/user.model')


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


const exsit_User=async(id='')=>{
    const exist=await Usuario.findById(id)
    if(!exist){
        throw new Error(`no existe usuario con id ${id}`)
    }  
}
module.exports={
    es_rol_valido,
    exist_Email,
    exsit_User
}