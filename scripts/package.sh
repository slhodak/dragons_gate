#!/bin/bash

# Provide an optional HOST value to rebuild the client with
HOST=$1

if [ "$HOST" ]; then
  echo "Packaging for host at $HOST"
  HOST=$HOST PORT=3456 npm run build
fi

cp -r server/ dist/game
cp -r public/ dist/game
cp package.json dist/game

echo "Creating tar"
tar -czvf dist/package.tar.gz dist/game/
