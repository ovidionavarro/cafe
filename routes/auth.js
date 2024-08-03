const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validar_campos } = require("../middlewares/validar-campos");

const router=Router()
router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contrasena es obligatoria').not().isEmpty(),
    validar_campos
],login)


module.exports=router