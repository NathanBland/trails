'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Trail = new Schema({
  type: String,
  geometry: {
    'type': {
      type: String,
      default: 'MultiLineString'
    },
    coordinates: Schema.Types.Mixed
  },
  properties: {
    'SOURCE_D00': String,
    'SOURCE_ORI': String,
    'NAME': String,
    'FTYPE': String,
    'FCODE': String,
    'length_km': Number
  }
}, {collection: 'trails'})

module.exports = mongoose.model('trail', Trail)