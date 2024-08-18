const { response } = require("express")
const {ObjectId } = require("mongoose").Types

const Usuario=require('../models/user.model.js')
const Categoria = require("../models/categoria")
const Producto=require('../models/producto')
const collectionPermitidas=[
    'usuarios',
    'categorias',
    'productos',
    'roles']



const buscaProducto=async(termino='',res=response)=>{
    const esMongoId= ObjectId.isValid(termino)
    if(esMongoId){
        const prod=await Producto.findById(termino)
                        .populate('categoria','nombre')
                        .populate('usuario','nombre')
                        
                        return res.json({
            results:(prod)?[prod]:[]
        })
    }

    const regex=new RegExp(termino,'i')
    const prod=await Producto.find({
        nombre:regex,
        estado:true
    }).populate('categoria','nombre')
    .populate('usuario','nombre')
    res.json({
    results:(prod)?[prod]:[]
    })

}





const buscaCategoria=async(termino='',res=response)=>{
    const esMongoId= ObjectId.isValid(termino)
    if(esMongoId){
        const cat=await Categoria.findById(termino).populate('usuario','nombre')
        return res.json({
            results:(cat)?[cat]:[]
        })
    }

    const regex=new RegExp(termino,'i')
    const cat=await Categoria.find({
        nombre:regex,
        estado:true
    }).populate('usuario','nombre')
    res.json({
    results:(cat)?[cat]:[]
    })

}



const buscarUsuarios=async(termino='',res=response)=>{
    const esMongoId= ObjectId.isValid(termino)
    if(esMongoId){
        const user=await Usuario.findById(termino)
        return res.json({
            results:(user)?[user]:[]
        })
    }

    const regex=new RegExp(termino,'i')
    const user=await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    })
    res.json({
    results:(user)?[user]:[]
    })

}

const buscar=async(req,res=response)=>{
    const {collection,term}=req.params
    if (!collectionPermitidas.includes(collection)){
        return res.status(400).json({
            msg:`las colecciones permitidas son :${collectionPermitidas}`
        })
    }

switch (collection) {
    case 'usuarios':
        buscarUsuarios(term,res)        
        break;
    case 'categorias':
        buscaCategoria(term,res)
        break;
    case 'productos':
        buscaProducto(term,res)
        break;
    default:
        return res.status(500).json({
            msg:'se me olvido pero lo permito'
        });
}

    
}

module.exports=buscar


