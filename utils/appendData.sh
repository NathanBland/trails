#!/bin/bash
echo '[' > trails.json
for n in $(seq 1 $1)
do
  cat trail_$n.json >> trails.json
  echo ',' >> trails.json
done

echo ']' >> trails.json