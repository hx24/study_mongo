const dataRouter = require('./data')

module.exports = (app) => {
    app.use('/data', dataRouter)
}