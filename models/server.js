require ('dotenv').config();
const fileUpload=require('express-fileupload')
const express=require('express');
const dbConnection = require('../database/mongoConfig');



class Server{   
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        this.paths={
            auth:'/api/auth',
            categories:'/api/categories',
            user:'/user/api',
            producto:'/api/producto',
            busqueda:'/api/buscar',
            uploads:'/api/uploads'
        }
        this.authPath='/api/auth'
        this.categories='/api/categories'
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        this.app.use(this.paths.user,require('../routes/user'))
        this.app.use( this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.categories,require('../routes/categories'))
        this.app.use(this.paths.producto,require('../routes/producto'))
        this.app.use(this.paths.busqueda,require('../routes/busqueda'))
        this.app.use(this.paths.uploads,require('../routes/uploads'))
        
    }
    listen(){
        this.app.listen(this.port, 
            () => console.log(`Example app listening on port ${this.port}!`)
        )
    }

}

module.exports=Server