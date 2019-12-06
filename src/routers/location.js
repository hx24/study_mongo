const express = require('express')
const Router = express.Router()
const axios = require('axios')

Router.get('/', async (req, res) => {
  var ip = "103.88.46.33"
  // var ip = "183.129.168.74"
  const url = 'http://api.ip138.com/query'
  const {status, data} = await axios.get(url, {
    params: {
      ip,
      token: 'cba4ff87c0b9d31c67121a6aa07f15a8',
      oid: 25570,
      mid: 88033
    }
  })
  
  if(status === 200 && data.ret === 'ok'){
    const [country, province,city] = data.data
    console.log({
      country,
      province,
      city
    })
  }
  res.json(data)
})

module.exports = Router
