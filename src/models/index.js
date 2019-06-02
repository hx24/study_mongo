const mongoose = require('mongoose')
const goods = require('./goods')
const students = require('./students')
const teachers = require('./teachers')
const kitten = require('./kitten')

const DB_URL = 'mongodb://127.0.0.1:27017/testDB'  // 链接到testDB库
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('mongoose 链接成功')
})

const models = {
    goods,
    students,
    teachers,
    kitten
}

for (let m in models) {
    mongoose.model(m, models[m])
}

module.exports = {
    getModel: name => mongoose.model(name)
}