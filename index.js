const Container = require('./resorces/Container.js')
const express= require('express')
const app= express()
const port=process.env.port||3002
const c = new Container();

//funcion para generar numeros randoms
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

app.get('/products',async(req,res)=>{
    
    let products=await c.getAll() // usar await es importante porque todas las funciones usadas son Async
    console.log(typeof products)
    console.log(products)
    res.send(products)
})

app.get('/productRandom',async(req,res)=>{
    let products=await c.getById(random(1,7)) // usar await es importante porque todas las funciones usadas son Async
    console.log(typeof products)
    console.log(products)
    res.send(products)
})

app.listen(port,()=>{

    console.log(`runinng server on port: ${port}`)
})