var db = {}

db.trails.find({geometry: {$near: {$geometry: {type:
"Point", coordinates: [-106.280855, 39.246794]}, $maxDistance: 2000}}})


db.trails.find({
  geometry: {
    $geoWithin: {
      $box:[
          [40.712, -74.227], [40.774, -74.125]
        ]
    }
  }
})
