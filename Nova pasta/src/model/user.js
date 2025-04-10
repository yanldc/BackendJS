const mongoose = require('mongoose')
mongoose.Promise = global.Promisse;

const modelSchema = new mongoose.Schema({
    name: String,
    city: String,
    state: String,
    token: String,

});

const modelName = 'User'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else {
    module.exports = mongoose.model(modelName, modelSchema);
}