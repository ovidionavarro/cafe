const { response, json } = require("express");
const role = require("../models/role");

const es_Admin=(req,res=response,next)=>{
    const {rol,nombre}=req.user
    if(rol!='ADMIN'){
        return res.status(401).json({
            msg:`${nombre} no tiene rol ADMIN`
        })
    }
    next()
}

const tiene_rol=(...roles)=>{
    return (req,res=response,next)=>{
        const {rol,nombre}=req.user
        if(!roles.includes(rol)){
            return res.status(401).json({
                msg:`el servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}

module.exports={
    es_Admin,tiene_rol
}