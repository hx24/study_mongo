const mongoose = require('mongoose')

const goodsSchema = new mongoose.Schema({
    name: String,
    price: Number
})

module.exports = goodsSchema
