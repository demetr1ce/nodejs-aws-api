#!/bin/bash
cd /home/ec2-user/nodejs-aws-api
sudo chmod +x ~/nodejs-aws-api/scripts
sudo chown -R $(whoami) ~/nodejs-aws-api

sudo echo "The AfterInstall deployment lifecycle event successfully completed." > after-install.txt