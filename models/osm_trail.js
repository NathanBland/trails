'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const OSMTrail = new Schema({
  type: String,
  geometry: {
    'type': {
      type: String,
      default: 'LineString'
    },
    coordinates: Schema.Types.Mixed
  },
  properties: {
    osm_id : String,
    name : String,
    bicycle : String,
    foot : String,
    horse : String,
    motor_vehicle : String,
    motorcycle : String,
    atv : String,
    highway : String,
    waterway : String,
    aerialway : String,
    barrier : String,
    'man_made': String,
    'z_order': Number,
    'other_tags': String,
    '4wd_only': String,
    'mtb:scale': String,
    'surface': String,
    'tiger:cfcc': String,
    'tiger:county': String,
    ' MT': String,
    'tiger:name_base' : String,
    access : String,
    incline : String,

    tracktype : String
  }
}, {collection: 'osm_trails'})

module.exports = mongoose.model('osm_trail', OSMTrail)