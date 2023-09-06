source /home/ec2-user/.bash_profile
cd /home/ec2-user/nodejs-aws-api
sudo chown -R $(whoami) ~/nodejs-aws-api

npm i
sudo node app.js