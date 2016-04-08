'use strict'

var express = require('express')
var router = module.exports = express.Router()
var Trail = require('../../models/trail')


router.route('/') // this is /api/trails
    .get(function (req, res, next) {
      // query string will need updating.
      var query = {}
      if (req.query.center) {
        var pointArray = JSON.parse(req.query.center)
        console.log('query:', pointArray)
        query = {
          geometry: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: pointArray
              }
            }
          }
        }
      }
      Trail.find(query)
      .limit(100)
      .sort('')
      .exec()
      .then(
        trails => {
          console.log('found trails:', trails.length)
          res.status(200).json(trails)
        },
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
