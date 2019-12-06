var httpProxy = require('http-proxy-middleware')

module.exports = function proxy (app) {
  function onProxyReq(proxyReq, req, res) {
    console.log('Proxy')
  }

  app.use(httpProxy('/geoip', {
    target: 'https://ip.seeip.org',
    changeOrigin: true,
    onProxyReq
  }))

  app.use(httpProxy('/test', {
    target: 'http://local.hunliji.com:8001',
    changeOrigin: true,
    onProxyReq
  }))
}