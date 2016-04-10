var express = require('express')        // call express
var app = express()                 // define our app using express
var bodyParser = require('body-parser'),
  routes = require('./routes/api'),
  mongoose = require('mongoose'),
  sass = require('node-sass-middleware')

var config = {
  db: {
    user: process.env.dbUser,
    pass: process.env.dbPass,
    name: process.env.dbName
  }
}

app.use(
  sass({
    root: __dirname,
    indentedSyntax: true,
    src: '/sass',
    dest: '/public/css',
    prefix: '/css',
    debug: false
  })
)
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/.build'))

app.set('view engine', 'jade')

console.log('running with config:', config)

mongoose.connect('mongodb://'+config.db.user+':'+config.db.pass+'@ds017070.mlab.com:17070/'+config.db.name)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

app.get('/', function (req, res, next) {
  return res.render('index', {
    title: 'Trails Database'
  })
})

app.use('/api',routes)

app.listen(port)
console.log('Trail data on port ' + port)
