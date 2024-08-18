const { Router } = require("express");
const { crearProducto, updateProduct, deleteProduct, productAllGet, productGetId } = require("../controllers/producto");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validar_campos } = require("../middlewares/validar-campos");
const { existProdutc, exist_Cat } = require("../helpers/db-validator");
const { es_Admin } = require("../middlewares/validar_rol");

const router=Router()



router.post('/',[
validarJWT,
check('nombre','el nombre es obligatorio').notEmpty(),
check('categoria','la categoria es obligatoria').notEmpty(),
check('categoria').custom(exist_Cat),
check('nombre','el nombre es obligatorio').not().isEmpty(),
validar_campos
],
crearProducto   )

router.put('/:id',[
    validarJWT,
    check('id').custom(existProdutc),
    check('categoria').custom(exist_Cat),
    validar_campos
],updateProduct)


router.delete('/:id',[
validarJWT,
check('id').custom(existProdutc),
es_Admin,
validar_campos
],
deleteProduct
)


router.get('/',productAllGet)
router.get('/:id',[
    check('id').custom(existProdutc),
    validar_campos

],
    productGetId)

module.exports=router