'use strict'

var express = require('express')
var router = module.exports = express.Router()
var Trail = require('../../models/osm_trail')


router.route('/') // this is /api/trails
    .get(function (req, res) {
      // query string will need updating.
      var query = {}
      if (req.query.center) {
        var pointArray = JSON.parse(req.query.center)
        query = {
          geometry: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: pointArray
              }
            }
          }
        }
      }
      Trail.find(query)
      .limit(100)
      .sort('')
      .lean()
      .exec()
      .then(
        trails => {
          res.status(200).json(trails)
        },
        err => res.status(500).json({'error': 'Internal Server Error', err })
       )
    })
router.route('/:id') // this is /api/trails/:id
    .get(function(req, res) {
      Trail.findOne({_id: req.params.id})
        .exec()
        .then(
          trails => res.status(200).json(trails),
          err => res.status(500).json({'error': 'Internal Server Error', err })
        )
    })
