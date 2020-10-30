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

const validateBody = (req,res,next) => {
    const body = req.body

    if (!body.description || !body.name){
        next({code:400, message: "you must have a description and name"})
    }else{
        req.payload = body
        next()
    }
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

router.post('/',validateBody,(req,res) => {
    Project.insert(req.payload)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:"Something went horribly wrong"})
    })
})

router.put('/:id',validateId,validateBody,(req,res) => {
    Project.update(req.params.id,req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:"Something went horribly wrong"})
    })
})

router.delete('/:id', validateId, (req,res) => {
    Project.remove(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message:"Something wen horribly wrong"})
    })
})

router.get('/:id/actions',validateId,(req,res) => {
    Project.getProjectActions(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message:"Something wen horribly wrong"})
    })
})

router.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message })
});

module.exports = router;