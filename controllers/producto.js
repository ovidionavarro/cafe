const { response } = require("express");
const Producto = require("../models/producto");

const crearProducto=async(req,res=response)=>{
    
    const {nombre,categoria,estado,precio,descripcion,disponible}=req.body
    
 
    //crear la data
    data={
        nombre,
        categoria,
        estado,
        precio,
        descripcion,
        disponible,
        usuario:req.user._id
    }
    //guardar db
    const producto= new Producto(data)
    await producto.save()

    res.status(201).json(producto)

}

const updateProduct=async(req,res=response)=>{
    const id= req.params.id
    const {estado,...data}=req.body
    
    data.usuario=req.user._id

    const producto=await Producto.findByIdAndUpdate(id,data,{new:true}).populate("usuario","nombre").populate("categoria","nombre");
    res.json(producto)
}

const deleteProduct=async(req,res=response)=>{
    const id=req.params.id

    data={
        estado:false,
        usuario:req.user._id
    }
    const product=await Producto.findByIdAndUpdate(id,data,{new:true}).populate("usuario","nombre").populate("categoria","nombre")

    res.json(product)

}

const productAllGet= async(req,res=response)=>{
    const {limite=5,desde=0}=req.query
    const query={estado:true}
    const [product,total]=await Promise.all([
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(desde)
        .limit(Number(limite)),
        Producto.countDocuments({estado:true})
    ])
    res.json({
        total,
        product,
        ok:true,
        msg:'Get'
    })
}

const productGetId=async(req,res=response)=>{
    const id=req.params.id
    const product=await Producto.findById(id).populate("usuario","nombre").populate("categoria","nombre");
    return res.json(product)
}







module.exports={
    crearProducto
    ,updateProduct,
    deleteProduct,
    productAllGet,
    productGetId
}