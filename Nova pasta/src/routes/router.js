const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const userValidator = require('../validator/userValidator');

router.get('/ping', (req, res) => {
    res.json({retorno:true});
});

router.get('/states', userController.getState);

router.get('/users', userController.getUsers);

router.put('/users', userValidator.editAction, userController.editUser )

module.exports = router;