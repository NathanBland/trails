var express = require('express')

var router = module.exports = express.Router()

router.use('/trails', require('./trails'))
router.use('/trail-heads', require('./trail-heads'))

router.get('/', function(req, res, next) {
  var data = req.query
  return res.status(200).json({ message: 'reuqest processed.', data: data })
})