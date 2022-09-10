const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Estoy parado en /user/')
})
router.get('/:name',(req,res)=>{
    res.send(`${req.params.name} de /users/:name`)
})



module.exports = router;