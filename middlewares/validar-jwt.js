const { response } = require("express")
const jwt = require("jsonwebtoken")
const Usuario=require('../models/user.model.js');

const validarJWT=async(req,res=response,next)=>{
    token=req.header('x-token')
    console.log(token)
    if(!token){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        })
    }

    try {

        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        req.uid=uid

        const user=await Usuario.findById(uid)
        if(!user){
            return res.status(401).json({
                msg:`no existe usuario con id=${uid}`
            })
        }
        if(!user.estado){
            return res.status(401).json({
                msg:`token no valido -> estado en false`
            })
        }
        req.user=user



        next()

    } catch (error) {
        
        res.status(401).json({
            msg:'token no valido'
        })
    }





}


module.exports={
    validarJWT
}