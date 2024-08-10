const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/auth");
const { validar_campos } = require("../middlewares/validar-campos");

const router=Router()
router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contrasena es obligatoria').not().isEmpty(),
    validar_campos
],login)

router.post('/google',[
    check('id_token','id_token de google es necesario').not().isEmpty(),
    validar_campos
],googleSingIn)


module.exports=router