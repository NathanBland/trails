#!/bin/bash
while read p; do
  ./getData.sh $p $p
done <bad_num.txt