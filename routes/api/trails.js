'use strict'

var express = require('express')
var router = module.exports = express.Router()
var Trail = require('../../models/trail')
var utils = require('./utils')

router.route('/') // this is /api/trails
    .get(function(req, res, next) {
      // query string will need updating.
      var query = {}
      if (req.query.center) {
        var pointArray = JSON.parse(req.query.center)
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
      .limit(500)
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
    
    
// router.route('/:z/:x/:y')
// .get(function(req, res){
//     const bounds = utils.getTileBounds(req.params)
//     const top = bounds.ne.lat
//     const bottom = bounds.sw.lat
//     const left = bounds.sw.lng
//     const right = bounds.ne.lng
//     var query = {}
//       if (req.query.center) {
//         var pointArray = JSON.parse(req.query.center)
//         query = {
//           geometry: {
//             $geoIntersects: {
//               $geometry: {
//                 type: "Polygon", 
//                 coordinates: [[
//                   [left, bottom],
//                   [left, top],
//                   [right, top],
//                   [right, bottom],
//                   [left, bottom]
//                 ]]
//               }
//             }
//           }
//         }
//       }
//     Trail.find(query)
//       .limit(100)
//       .sort('')
//       .exec()
//       .then(
//         trails => {
//           res.status(200).json(trails)
//         },
//         err => res.status(500).json({'error': 'Internal Server Error', err })
//       )
// })