const app = require('express')()
const initRouter = require('./routers')

initRouter(app)

app.listen('8000', ()=>{
    console.log('监听在8000端口 ');
})