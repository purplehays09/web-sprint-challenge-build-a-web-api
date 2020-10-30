const express = require('express');

const Action = require('./actionModel');

const router = express.Router();

const validateId = (req,res,next) => {
    const id = req.params.id
    
    Action.get(id)
    .then(data => {
        if (data) {
            req.actionId = data;
            next()
        }else{
            next({ code: 400, message: 'There is no action with id ' + id })
        }
    })
    .catch(error=> {
      next({ code: 500, message:error.message })
    })
}

router.use((req, res, next) => {
    console.log('inside the action router');
    next();
});



router.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message })
  });

module.exports = router;