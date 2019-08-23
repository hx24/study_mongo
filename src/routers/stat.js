const express = require('express')
const Router = express.Router()
const Models = require('../models')

const StatInstance = Models.getModel('stats')

Router.get('/', (req, res) => {
  const { per_page = 20, page = 1 } = req.query

  const filter = {
    pageName: '首页',
  }
  StatInstance.getStatByDate(filter, Number(per_page), Number(page), (stat, total) => {
    const list =  stat.map(({ date, pv, uv }) => ({
      date,
      pv,
      uv
    }))
    res.json({list, total})
  })
})

module.exports = Router
