'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Trail = new Schema({
  type: String,
  geometry: {
    'type': {
      type: String,
      default: "MultiLineString"
    },
    coordinates: Schema.Types.Mixed
  },
  properties: {
    "PERMANENT_": String,
    "SOURCE_FEA": String,
    "SOURCE_DAT": String,
    "SOURCE_D00": String,
    "SOURCE_ORI": String,
    "NAME": String,
    "LENGTH": Number,
    "SHAPE_LENG": String,
    "FTYPE": String,
    "FCODE": String
  }
})

module.exports = mongoose.model('trail', Trail)