const { request, response } = require("express");

const userGet=(req=request, res=response) => {
    const {name='', edad=0}=req.query
    res.json({
        name,
        edad,
        ok:true,
        msg:'GET'
    })}

const userPost=(req=request, res=response) =>{ 
    const body=req.body

    res.json({
        body,        
        ok:true,
        msg:'POST'
    })}
const userPut=(req, res=response) => {
    const id=req.params.id//buscar el id despues de la ruta

    res.json({
        id,
        ok:true,
        msg:'PUT'
    })}
const userDelete=(req, res=response) => 
    res.json({
        ok:true,
        msg:'DELETE'
    })

module.exports={
    userDelete,
    userGet,
    userPost,
    userPut
}