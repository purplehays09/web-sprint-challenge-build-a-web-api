const express = require('express');

const Project = require('./projectModel');

const router = express.Router();

const validateId = (req,res,next) => {
    const id = req.params.id
    
}


module.exports = router;