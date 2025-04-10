const mongoose = require ('mongoose');
const User = require ('../model/user');
const State = require ('../model/state');

module.exports = {
    getState: async(req, res) =>{
        let states = await State.find();
        res.json({states});
    }, 

    getUsers: async(req, res) =>{
        let users = await User.find();
        res.json({users});
    }, 
};