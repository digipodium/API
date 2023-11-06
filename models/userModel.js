const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : String,
    email : String,
    password : String,
    role: {type : String, default: 'user'},
    avatar: String,
    createdAt: Date
});

module.exports = model('user', myschema);

