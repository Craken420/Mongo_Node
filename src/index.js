const http = require('http'),
      app = require('./app/app'),
      server = http.createServer(app)

server.listen(app.get('port'), () => {
    console.log(`Server is runnnig on: http://localhot/${app.get('port')}`)
})
