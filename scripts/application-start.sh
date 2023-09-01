source /home/ec2-user/.bash_profile
sudo chown -R $(whoami) ~/nodejs-aws-api
cd /home/ec2-user/nodejs-aws-api
npm i
node app.js

echo "The ApplicationStart deployment lifecycle event successfully completed." > application-start.txt