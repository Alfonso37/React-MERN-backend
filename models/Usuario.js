const { Schema, model, models } = require('mongoose');

const UsaurioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        uniqued: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = model('Usuario', UsaurioSchema);
