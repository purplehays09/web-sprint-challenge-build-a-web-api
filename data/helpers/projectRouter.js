const express = require('express');

const Project = require('./projectModel');

const router = express.Router();

const validateId = (req,res,next) => {
    const id = req.params.id
    
    Project.get(id)
    .then(data => {
        if (data) {
            req.project = data;
            next()
        }else{
            next({ code: 400, message: 'There is no project with id ' + id })
        }
    })
    .catch(error=> {
      next({ code: 500, message:error.message })
    })    
}

router.use((req, res, next) => {
    console.log('inside the project router');
    next();
});

router.get('/',(req,res) => {
    res.status(200).json({
        message:"you made it into the project router"
    })
})

router.get('/:id',validateId,(req,res) => {
    res.status(200).json(req.project)
})

// router.post('/',(req,res))

router.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message })
});

module.exports = router;