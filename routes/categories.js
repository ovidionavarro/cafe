const { Router, response } = require("express");
const { check } = require("express-validator");
const { validar_campos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { crearCategoria, catGet, catGetId, catPut, catDelete } = require("../controllers/categories");
const { exist_Cat } = require("../helpers/db-validator");
const { es_Admin } = require("../middlewares/validar_rol");

const router=Router()


//example {{url}}/api/categories

//todas las categorias
router.get('/',catGet)
//categoria especifica
router.get('/:id',[
    check('id').custom(exist_Cat),
    validar_campos
],catGetId)

//crear categoria desde un token valido
router.post('/',[validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validar_campos

],crearCategoria)

//actualizar categoria especifica
router.put('/:id',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('id').custom(exist_Cat),
    validar_campos
    ]
    ,catPut)
//borrar categoria especifica
router.delete('/:id',[validarJWT,
    check('id').custom(exist_Cat),
    es_Admin,
    validar_campos
    ],
    catDelete)


module.exports=router 