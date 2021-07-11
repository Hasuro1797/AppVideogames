require('dotenv').config();
const express = require('express');
const router = express.Router();
const {API_KEY} = process.env;
const fetch = require('node-fetch');

router.get('/',function(req,res){
    
    res.send("hola mundo desde genres")
})

module.exports = router;