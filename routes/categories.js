const { Router, response } = require("express");
const { check } = require("express-validator");
const { validar_campos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { crearCategoria } = require("../controllers/categories");

const router=Router()


//example {{url}}/api/categories

//todas las categorias
router.get('/',(req,res=response)=>{
    res.json({msg:'get'})
})
//categoria especifica
router.get('/:id',(req,res=response)=>{
    res.json({msg:'get-id'})
})




//crear categoria desde un token valido
router.post('/',[validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validar_campos

],crearCategoria)




//actualizar categoria especifica
router.put('/:id',(req,res=response)=>{
    res.json({msg:'put'})
})
//borrar categoria especifica
router.delete('/:id',(req,res=response)=>{
    res.json({msg:'delete'})
})
module.exports=router 