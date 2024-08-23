const { Router } = require("express");
const { check } = require("express-validator");
const { validar_campos } = require("../middlewares/validar-campos");
const { cargarArchivo, actualizarImagen, mostrarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers/db-validator");
const { valid_arch } = require("../middlewares/validar_archivo");

const router=Router()

router.post('/',valid_arch,cargarArchivo
)

router.put('/:coleccion/:id',[
    valid_arch,
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validar_campos
],actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validar_campos

],mostrarImagen)

module.exports=router