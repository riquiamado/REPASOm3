let express = require('express');
const router = express.Router();
const {addProducts, getProducts}= require('../models/productModels');




router.post('/:name',(req,res)=>{
    try {
        // let {name} = req.body
      let response =  addProducts(req.params.name)
        return res.status(200).send(response)
    } catch (error) {
        
        return res.status(400).send(error.toString())
    }
})

router.get('/',(req,res)=>{
    res.send(getProducts())
})
module.exports= router;