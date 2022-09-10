// configuraciones que necesito 
const express  = require("express")
const server = express();
const morgan = require("morgan")
const users = require('./Routes/users')
const productRoutes = require('./Routes/productRoutes')
const weatherRouter = require('./Routes/weather')

let id = 4
let names = [{id:1,name:"riqui"},{id:2,name:"ivan"},{id:3,name:"romy"}]

//middleware es una funcion
function logger(req,res,next){
    console.log(req.url);
    next();
}
//request --->middleware--> callback---> response
//  ----->request --> morgan("tiny")
server.use(morgan("tiny"))
//lo vamos a usar para poder interpretar la informacion que nos llega
//por body ,ya que la misma llega en un formato json y el json por si solo no puede ser interpretado el middleware se encargara de transformarlo en un objeto
server.use(express.json())
server.use('/users',users)
server.use('/products',productRoutes)
server.use('/weather',weatherRouter)

server.get('/',logger,(req,res,next)=>{
  //  res.send('bienvenidos')
  console.log("previo al next")
  next();
})

server.get('/',(req,res)=>{
    //res.type("html")
    res.send("bienvinidos a nuestro server luego de un next")
})

server.get('/json',(req,res)=>{
    res.json('hola ruta/json')
})
server.get('/send',(req,res)=>{
    res.send('hola ruta /send')
})
//quiero recibir por parametro un id,por query un nombre y por parametros tammbien un apellido,quiero  ademas responder que si el nombre no vino,responda un 404 que el nombre no vino,y si  el id es mayor a 5 responde un 404 que el id es mayor a 5 y sino,responder un string todo concatenado
server.get('/uno/:id/:apellido',(req,res)=>{
    let {id,apellido}=req.params
    let {nombre}=req.query
    if(!nombre) return res.sendStatus(404)
    if(id > 5) return res.status(400).send({mesage:'el is es mayor a 5'})
    res.send(`${id} ${apellido} ${nombre}`)

    
})

server.post('/addName/:name',(req,res)=>{
    const {name}= req.params;
    const {location ,age} = req.body;
    if(!location || !age || !name)return res.sendStatus(404)
    names.push({id:id++, name , location ,age})
    res.send(names)
})

server.get('/search/:id',(req,res)=>{
    let id = req.params.id;
    let find = names.find(e=> e.id === parseInt(id))
      if(find) return res.send(find.name)
      res.sendStatus(400)
})

server.get('*',(req,res)=>{
    res.status(404).send('no existe ninguna ruta con dicha url')
})

server.post('/',(req,res)=>{
    console.log(req.body)
    let {id,title,contents}=req.body
    res.send(`El ${id} tiene un titulo:${title} y su contenido es ${contents}`)
})


server.listen(3000,()=>{console.log('listening on port 3000')})