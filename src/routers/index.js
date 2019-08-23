// const dataRouter = require('./data')
const statRouter = require('./stat')

module.exports = (app) => {
    // app.use('/data', dataRouter)
    app.use('/stat', statRouter)
}