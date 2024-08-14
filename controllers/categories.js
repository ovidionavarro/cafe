const { response } = require("express");
const { Categoria } = require("../models");


//obtener categorias- paginado total -populate

//obtener categorias-populate

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

    res.status(201).json({categoria})

}
//actializar categoria

//borrar categoria estado:false



module.exports={
    crearCategoria
}