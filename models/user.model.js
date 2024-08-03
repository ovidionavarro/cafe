const{Schema,model} =require('mongoose')



const userSchema= Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio'],
        
    },
    
    correo:{
        type:String,
        required:[true,'el correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'la contrasena es obligatoria'],
        
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN','USER']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:true
    }
    

})

userSchema.methods.toJSON=function(){
    const {__v ,password,_id,...user}=this.toObject()
    user.uid=_id
    return user
}

module.exports=model('Usuario',userSchema);