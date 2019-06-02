const express = require('express')
const Router = express.Router()
const Models = require('../models')
const mongoose = require('mongoose')

const Good = Models.getModel('Good')
const Kitten = Models.getModel('kitten')

Router.get('/info', (req,res)=>{
    // Good.find({}, (err, data)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         res.send(data)
    //     }
    // })

    Good.find({},'name').exec(function(err, data){
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
})

Router.get('/create', (req,res)=>{
    const JackCat = new Kitten({name: 'Jack'})
    JackCat.save(function(err, JackCat){
        if(err) return console.log(err)
        JackCat.speak()
    })

    const LuccyCat = new Kitten({name: 'Luccy'})
    LuccyCat.save(function(err, LuccyCat){
        if(err) return console.log(err)
        LuccyCat.speak()
    })
    res.send('create')
})

Router.get('/cats', (req,res)=>{
    const Jarry = new Kitten({name: 'Jack'})
    Jarry.findSimilar(function(err, data){
        console.log(data)
    })
    
    Kitten.find({name: /^Jack/}, (err, data)=>{
        if(err) return console.log(err)
        res.send(data)
    }).skip(2)
})

Router.get('/find/:name', (req,res)=>{
    console.log(req.params.name)
    // Kitten.findByName(req.params.name,function (err, data) {
    //     res.json(data)
    // })
    Kitten.countDocuments({name: new RegExp(req.params.name, 'i')}, function (err,count) {
        console.log(count)        
    })

    Kitten.find().byName(req.params.name,function (err, data) {
        res.json(data)
    })
})



module.exports= Router