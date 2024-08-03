const { request, response } = require("express");
const Usuario=require('../models/user.model.js');
const bcryptjs =require('bcryptjs');
const { validationResult } = require("express-validator");

const userGet=async(req=request, res=response) => {
    const {limite=5,desde=0}=req.query

    // const users=await Usuario.find({estado:true})
    //     .skip(desde)
    //     .limit(Number(limite))
    // const total= await Usuario.countDocuments({estado:true});


    const [users,total]=await Promise.all([
        Usuario.find({estado:true})
        .skip(desde)
        .limit(Number(limite)),
        Usuario.countDocuments({estado:true})

    ])
    res.json({
        total,
        users,
        ok:true,
        msg:'GET'
    })}

const userPost=async (req=request, res=response) =>{ 
    


    const {nombre,correo,password,rol}=req.body
    const user=new Usuario( {nombre,correo,password,rol})
    


    //encriptar contrasena
    const salt =bcryptjs.genSaltSync()
    user.password=bcryptjs.hashSync(password,salt);
    
    //guardar user
    await user.save()
    res.json({
        user,        
        ok:true,
        msg:'POST'
    })}
const userPut=async(req, res=response) => {
    const id=req.params.id//buscar el id despues de la ruta

    const {_id,password,google,correo,...rest}=req.body


    if(password){
        const salt =bcryptjs.genSaltSync()
        rest.password=bcryptjs.hashSync(password,salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,rest)

    res.json({
        usuario,
        ok:true,
        msg:'PUT'
    })}
const userDelete=async(req, res=response) =>{
    
    const id=req.params.id
    const user_ref=req.user
    const user= await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        user,
        user_ref,
        msg:'DELETE',
    })
}

module.exports={
    userDelete,
    userGet,
    userPost,
    userPut
}