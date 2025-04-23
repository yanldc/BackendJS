const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: 'Email e ou senha são obrigatorio'});
        }

        const user = await User.findOne({email})
        if(!user) return res.status(401).json({error: "Emamil ou senha incorretos"});

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({error: "Emamil ou senha incorretos"});

        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: '1d'});

        user.token = token

        await user.save();

    }
}