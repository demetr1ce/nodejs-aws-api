#!/bin/bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.profile
npm install -g jshint
node app.js

echo "The ApplicationStart deployment lifecycle event successfully completed" > application-start.txt