'use strict'

var express = require('express')
var router = module.exports = express.Router()
var Trail = require('../../models/osm_trail')


router.route('/') // this is /api/trails
    .get(function (req, res) {
      // query string will need updating.
      /* query = {
          geometry: {
            $geoNear: {
              spherical: true,
              near: {
                "$geometry": {
                  type: 'Point',
                  coordinates: pointArray
                }
              },
              query: {
                geometry: {
                  $geoWithin: {
                    "$geometry": {
                      type: 'Polygon',  
                      coordinates: [ [
                        [ left, bottom ],
                        [ left, top ],
                        [ right, top ],
                        [ right, bottom ],
                        [ left, bottom ]
                      ] ]
                    }
                  }
                }
              }
            }
          }
        }
      }
      */
      var query = {}
      if (req.query.center) {
        var pointArray = JSON.parse(req.query.center)
        query = {
          geometry: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: pointArray
              },
              $maxDistance: 15000
            }
          }
        }
      }
      Trail.find(query)
      .lean()
      .limit(500)
      .exec()
      .then(
        trails => {
          console.log('count:', trails.length)
          res.status(200).json(trails)
        },
        err => res.status(500).json({'error': 'Internal Server Error', message: err.message })
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
