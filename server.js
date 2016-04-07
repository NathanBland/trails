var express = require('express')        // call express
var app = express()                 // define our app using express
var bodyParser = require('body-parser')
var routes = require('./routes/api')
var mongoose = require('mongoose')
var config = {
  db: {
    user: process.env.dbUser,
    pass: process.env.dbPass
  }
}
var fs = require('fs')
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'jade')

mongoose.connect('mongodb://'+config.db.user+':'+config.db.pass+'@ds017070.mlab.com:17070/trails')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

app.get('/', function (req, res, next) {
  console.log('index loaded')
  return fs.readFile("./index.html", function(err, data) {
    if (err) {
      next(err)
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    return res.end(data, 'utf8');
    });
})

app.use('/api',routes)

app.listen(port)
console.log('Trail data on port ' + port)
