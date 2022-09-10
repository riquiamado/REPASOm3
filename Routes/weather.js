const express = require('express')
const router = express.Router()
const axios = require('axios')


const apiKey = '4ae2636d8dfbdc3044bede63951a019b'

// router.get('/:city',(req,res)=>{
//     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`)
//     .then(response =>res.send({
//         id:response.data.id,
//         name:response.data.name,
//         temp:response.data.main.temp
//     }))
// })

router.get('/:city', async(req,res)=>{

    try {
        const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`)
        res.json({
            id:response.data.id,
            name:response.data.name,
            temp:response.data.main.temp
        })
    } catch (error) {
        res.status(404).send(error.toString())
    }
    })
 
module.exports = router;
/*
try {
       const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`)
        res.json({
            id:response.data.id,
            name:response.data.name,
            temp:response.data.main.temp
        })
       
    } catch (error) {
        res.status(404).send(error.toString())
*/