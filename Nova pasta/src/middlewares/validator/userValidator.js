const {checkSchema} = require('express-validator')

module.exports = {
    editAction: checkSchema({
        name:{
            notEmpty: true,
            trim: true,
            isLength:{
                options:{min:2}
            },
            errorMessage: "Nome precisa de pelo menos 2 caracteres"
        },
        email:{
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'Email invalido'
        },
        password:{
            isLength:{
                options:{min:8}
            },
            errorMessage:"A senha precisa de pelo menos 8 caracteres"
        },
        token:{
            notEmpty:true,
            errorMessage: 'Token obrigatorio'
        }
    })
}