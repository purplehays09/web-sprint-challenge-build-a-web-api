const express = require('express');

const Action = require('./actionModel');

const router = express.Router();

const validateId = (req,res,next) => {
    const id = req.params.id
    
    Action.get(id)
    .then(data => {
        if (data) {
            req.action = data;
            next()
        }else{
            next({ code: 400, message: 'There is no action with id ' + id })
        }
    })
    .catch(error=> {
      next({ code: 500, message:error.message })
    })
}

const validateBody = (req,res,next) => {
    const body = req.body

    if (!body.description || !body.notes){
        next({code:400, message: "you must have a description and notes"})
    }else{
        req.payload = body
        next()
    }
}

router.use((req, res, next) => {
    console.log('inside the action router');
    next();
});

router.get('/:id',validateId,(req,res) => {
    res.status(200).json(req.action)
})

router.post('/:id',validateBody, (req,res) => {
    Action.insert(req.payload)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:error.message})
    })
})

router.put('/:id',validateId,validateBody,(req,res) => {
    Action.update(req.params.id,req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .catch(error => {
        res.status(500).json({message:"Something went horribly wrong"})
    })
})

router.delete('/:id', validateId, (req,res) => {
    Action.remove(req.params.id)
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