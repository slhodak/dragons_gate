#!/bin/bash

ID=$1
IP=$2
USER=$3

if [ ! -f ./dist/package.tar.gz ]; then
  echo "No package found; packaging..."
  ./scripts/package.sh "$IP"
else
  echo "Package found; deploying program"
fi

scp -i $ID -r dist/package.tar.gz $USER@$IP:/home/$USER/dragons_gate.tar.gz
