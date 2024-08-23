const{Schema,model} =require('mongoose')



const ProductoSchema= Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio'],
        
    },
    estado:{
        type:Boolean,
        default:true,
        require:true        
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
        
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{type:String}

})
ProductoSchema.methods.toJSON=function(){
    const{_v,estado,...rest}=this.toObject();
    return rest
}


 
module.exports=model('Producto',ProductoSchema);