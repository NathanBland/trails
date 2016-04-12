'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const EsriTrail = new Schema({
  type: String,
  geometry: {
    'type': {
      type: String,
      default: 'Polygon'
    },
    coordinates: Schema.Types.Mixed
  },
  properties: {
    ATV: Number,
    BIKE: Number,
    DATA_SECURITY: Number,
    DISTRIBUTION_POLICY: String,
    FCODE: Number,
    FTYPE: Number,
    GLOBALID: String,
    GNIS_ID: String,
    HIKE: Number,
    LENGTH: Number,
    LOADDATE: Date,
    MOTORCYCLE: Number,
    NAME: String,
    NONMOTORIZEDONLY: Number,
    OBJECTID: String,
    PACKORSADDLE: Number,
    PERMANENT_IDENTIFIER: String,
    WIDTH: Number
  }
}, {collection: 'ESRI_trials'})

module.exports = mongoose.model('esri-trail', EsriTrail)