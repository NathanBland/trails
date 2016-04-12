'use strict'

var express = require('express')
var router = module.exports = express.Router()
var TrailHead = require('../../models/trail_head')


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
      TrailHead.find(query)
      .limit(50)
      .sort('')
      .lean()
      .exec()
      .then(
        trailHeads => {
          res.status(200).json(trailHeads)
        },
        err => res.status(500).json({'error': 'Internal Server Error', message: err.message })
       )
    })
router.route('/:id') // this is /api/trail-head/:id
    .get(function(req, res) {
      Trail.findOne({_id: req.params.id})
        .exec()
        .then(
          trailHeads => res.status(200).json(trailHeads),
          err => res.status(500).json({'error': 'Internal Server Error', err })
        )
    })
