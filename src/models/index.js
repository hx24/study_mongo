const mongoose = require('mongoose')
const Good = require('./goods')
const students = require('./students')
const teachers = require('./teachers')
const kitten = require('./kitten')
const stats = require('./stat')

const DB_URL = 'mongodb://118.24.4.200/ssrStat'  // 链接到testDB库
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('mongoose 链接成功')
})

const models = {
    // Good,
    // students,
    // teachers,
    // kitten,
    stats
}

for (let m in models) {
    mongoose.model(m, models[m])
}

module.exports = {
    getModel: name => mongoose.model(name)
}