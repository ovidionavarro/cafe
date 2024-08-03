const mongoose=require('mongoose')


const dbConnection=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/CAFE')
        console.log('conexion establecida por CAFE');
    }
    catch(error){
        console.log(error)
        throw new Error('ERROR A LA HORA DE CONECTAR')
    }
}
module.exports=dbConnection