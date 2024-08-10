const { response } = require("express");
const Usuario=require('../models/user.model');
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar_jwt");

const login=async(req,res=response)=>{

    const {correo,password}=req.body

    try {  

    
        const user= await Usuario.findOne({correo})
        if (!user){
            return res.status(400).json({
                msg:`correo ${correo} no encontrado`
            })
        }
        if (!user.estado){
            return res.status(400).json({
                msg:`usuario ${correo} tiene estado en falso`
            })
        }


        
        const validPassword=bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:`constrasena ${password} incorrecta`
            })
        }
        
        // generar jwt 
        
        const token=await generarJWT(user.id)

        return res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'internal server error1'
        })
    }

}

const googleSingIn=async(req,res=response)=>{
    const {id_token}=req.body
    res.json({
        msg:'ok',
        id_token
    })
}
module.exports={
    login,
    googleSingIn
}