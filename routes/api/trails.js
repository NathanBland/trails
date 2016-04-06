var express = require('express')
var router = module.exports = express.Router()
var Trail = require('../../models/trail')

router.route('/') // this is /api/trails
    .get(function(req, res, next) {
      // query string will need updating.
      console.log('request:', JSON.parse(req.query.box))
      Trail.find({
        geometry: {
          "$geoWithin": {
            "$box":JSON.parse(req.query.box)
          }
        }
      })
      .limit(50)
      .sort('')
      .exec()
      .then(
        trails => res.status(200).json(trails),
        err => res.status(500).json({'error': 'Internal Server Error', err })
       )
    })
    
router.route('/:id') // this is /api/trails/:id
    .get(function(req, res, next) {
      Trail.findOne({_id: req.params.id})
        .exec()
        .then(
          trails => res.status(200).json(trails),
          err => res.status(500).json({'error': 'Internal Server Error', err })
        )
    })