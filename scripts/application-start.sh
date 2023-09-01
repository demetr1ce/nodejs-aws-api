#!/bin/bash
cd /home/ec2-user/nodejs-aws-api
npm i
node app.js

echo "The ApplicationStart deployment lifecycle event successfully completed." > application-start.txt