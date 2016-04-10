'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TrailHeads = new Schema({
  type: String,
  geometry: {
    'type': {
      type: String,
      default: 'Point'
    },
    coordinates: Schema.Types.Mixed
  },
  properties: {
    osm_id : String,
    name : String,
    barrier : String,
    highway : String,
    ref : String,
    address : String,
    is_in : String,
    place : String,
    man_made : String,
    other_tags : String,
    amenity : String,
    fee : String,
    parking : String,
    crossing: String,
    natural: String,
    mountain_pass: String,
    noexit: String,
    tourism: String
  }
}, { collection: 'trail_heads' })

module.exports = mongoose.model('trail_head', TrailHeads)