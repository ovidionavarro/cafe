require ('dotenv').config();
const express=require('express')



class Server{   
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        
        
        //middlewares
        this.middlewares()
        //routes

        this.routes=this.routes()
    
    }
    middlewares(){
        //directorio publico
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/user/api',require('../routes/user'))

    }
    listen(){
        this.app.listen(this.port, 
            () => console.log(`Example app listening on port ${this.port}!`)
        )
    }

}

module.exports=Server