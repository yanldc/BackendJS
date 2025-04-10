const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/ping', (req, res) => {
    res.json({retorno:true});
});

router.get('/states', userController.getState);

router.get('/users', userController.getUsers);

module.exports = router;