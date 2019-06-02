const mongoose = require('mongoose')

const teachersSchema = new mongoose.Schema({
    name: {
        type: 'string',
        require: true
    },
    age: Number
})

module.exports = teachersSchema
