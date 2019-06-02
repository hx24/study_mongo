const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name: {
        type: 'string',
        require: true
    },
    age: {
        type: 'number',
    },
    code: {
        type: 'string',
        require: true
    }
})

module.exports = studentsSchema