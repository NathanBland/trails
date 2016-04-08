#!/bin/bash
for n in $(seq $1 $2)
do
  echo 'on trail #' $n
  curl http://services.nationalmap.gov/arcgis/rest/services/USGSTopoLarge/MapServer/17/$n?f=pjson | jq . > trail_$n.json &
done