'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const EsriTrail = new Schema({
  type: String,
  geometry: {
    'type': {
      type: String,
      default: 'MultiLineString'
    },
    coordinates: Schema.Types.Mixed
  },
  properties: Schema.Types.Mixed
}, {collection: 'ESRI_trials'})

module.exports = mongoose.model('esri-trail', EsriTrail)