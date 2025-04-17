const mongoose = require ('mongoose');
const User = require ('../model/user');
const State = require ('../model/state');
const{validationResult, matchedData} = ('express-validator');
const bcrypt = require ('bcrypt');

module.exports = {
    getState: async(req, res) =>{
        let states = await State.find();
        res.json({states});
    }, 

    getUsers: async(req, res) =>{
        let users = await User.find();
        res.json({users});
    }, 

    editUser: async(req, res) =>{
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.status(400).res.json({
                error:erros.mapped()
            });
            return;
        }

        const data = matchedData(req);
        let updates = {};

        if(data.name){
            updates.name = data.name;
        }
        if(data.city){
            updates.city = data.city;
        }
        if(data.email){
            const emailCheck = await User.findOne({email:data.email});
            if(emailCheck){
                res.json({erro: 'Email ja existe'});
                return;
            }
            updates.email = data.email;
        }
        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.states)){
                const stateCheck = await State.findById(data.state);
                if(!stateCheck){
                    res.json({erro: 'Estado nao cadastrado'})
                    return;
                }
                updates.states = data.state;
            }else{
                res.json({erro: 'Codigo do estado fora do padrao'});
                return;
            }
        }
        if(data.password){
            updates.password = await bcrypt.hash(data.password,10)
        }
        
        await User.findOneAndUpdate({token: data.token}, {$set:updates});
        res.status(201).res.json({sucess:true});

    }
};