const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    name: String
})

catSchema.methods.speak = function(){
    const greeting = this.name ? `Meaw name is ${this.name}` : `I don't have a name`
    console.log(greeting)
}

// 实例方法
catSchema.methods.findSimilar = function(cb) {
    this.model('kitten').find({name: this.name}, cb)
}


// 静态方法， 按姓名查找
catSchema.statics.findByName = function(name, cb) {
    this.model('kitten').find({name: new RegExp(name, 'i')}, cb)
}

// 查询助手（链式调用），   实现与上面一样的按姓名查找
catSchema.query.byName = function(name, cb) {
    return this.find({name: new RegExp(name, 'i')}, cb)
}

module.exports = catSchema