source /home/ec2-user/.bash_profile
sudo chown -R $(whoami) ~/nodejs-aws-api
cd /home/ec2-user/nodejs-aws-api
sudo npm i
sudo node app.js

echo "API successfully started." > application-start.txt