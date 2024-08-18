const { Router } = require("express");
const { userGet, userPost, userPut, userDelete } = require("../controllers/user");
const { check } = require("express-validator");
const { validar_campos } = require("../middlewares/validar-campos");
const { es_rol_valido, exist_Email, exsit_User } = require("../helpers/db-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { es_Admin, tiene_rol } = require("../middlewares/validar_rol");

const router = new Router();

router.get('/', userGet)

router.post('/',[
    check('nombre','nombre es obligatorio').not().isEmpty(),
    check('correo','correo no valido').isEmail(),
    check('correo').custom(exist_Email),
    check('password','el password debe tener mas de 6 letras').isLength({min:6}),
    check('rol','no es rol valido').isIn(['ADMIN','USER']),
    check('rol').custom(es_rol_valido),
    validar_campos
], userPost)

router.put('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(exsit_User),
    check('rol').custom(es_rol_valido),   
    validar_campos
],userPut)

router.delete('/:id',[
    validarJWT,
    tiene_rol('ADMIN','asd'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(exsit_User),
    validar_campos
], userDelete)


module.exports = router; 
