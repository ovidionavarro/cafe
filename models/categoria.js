const{Schema,model} =require('mongoose')



const CategoriaSchema= Schema({
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
    

})

 
module.exports=model('Categoria',CategoriaSchema);