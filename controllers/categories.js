const { response } = require("express");
const { Categoria } = require("../models");


//obtener categorias- paginado total -populate
const catGet= async(req,res=response)=>{
    const {limite=5,desde=0}=req.query
    const query={estado:true}
    const [cats,total]=await Promise.all([
        Categoria.find(query)
        .populate('usuario','nombre')
        .skip(desde)
        .limit(Number(limite)),
        Categoria.countDocuments({estado:true})
    ])
    res.json({
        total,
        cats,
        ok:true,
        msg:'Get'
    })
}


//obtener categorias-populate

const catGetId=async(req,res=response)=>{
    const id=req.params.id
    const cat=await Categoria.findById(id).populate("usuario","nombre");
    return res.json(cat)
}

const crearCategoria=async(req,res=response)=>{
    
    const nombre=req.body.nombre
    const categoriaDB=await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg:`la categoria ${categoriaDB.nombre} ya existe`
        })
    }
    const data={
        nombre,
        usuario:req.user._id
    }
    const categoria= new Categoria(data)

    //guardar db
    await categoria.save()

    res.status(201).json(categoria)

}

//actializar categoria
const catPut=async(req,res=response)=>{
    const id=req.params.id
    const {estado,nombre}=req.body
    
    const data={
        nombre,
        usuario:req.user._id
    }
    const categ=await Categoria.findByIdAndUpdate(id,data,{new:true}).populate("usuario","nombre");

    res.json(
        categ
        )
}

//borrar categoria estado:false
const catDelete=async(req,res=response)=>{
   const id = req.params.id
   data={
    estado:false,
    usuario:req.user._id
   }
   const categ=await Categoria.findByIdAndUpdate(id,data,{new:true}).populate("usuario","nombre");

   res.json(
    categ
   )
}


module.exports={
    catGet,
    crearCategoria,
    catGetId,
    catPut,
    catDelete
}