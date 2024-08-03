require ('dotenv').config();
const express=require('express');
const dbConnection = require('../database/mongoConfig');



class Server{   
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        this.authPath='/api/auth'
        //connected database
        this.connectedDB()
        //middlewares
        this.middlewares()
        //routes

        this.routes=this.routes()
    
    }

    async connectedDB(){
        await dbConnection();
    }

    middlewares(){
        //directorio publico
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/user/api',require('../routes/user'))
        this.app.use( this.authPath,require('../routes/auth'))
    }
    listen(){
        this.app.listen(this.port, 
            () => console.log(`Example app listening on port ${this.port}!`)
        )
    }

}

module.exports=Server