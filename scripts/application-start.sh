source /home/ec2-user/.bash_profile
cd /home/ec2-user/nodejs-aws-api

accessKeyId=$(sudo aws ssm get-parameters --region us-east-1 --names accessKeyId --with-decryption --query Parameters[0].Value)
secretAccessKey=$(sudo aws ssm get-parameters --region us-east-1 --names secretAccessKey --with-decryption --query Parameters[0].Value)
region=$(sudo aws ssm get-parameters --region us-east-1 --names region --query Parameters[0].Value)
endpoint=$(sudo aws ssm get-parameters --region us-east-1 --names endpoint --query Parameters[0].Value)

sudo chown -R $(whoami) ~/nodejs-aws-api
cd /home/ec2-user/nodejs-aws-api
npm i
node app.js

echo -e "accessKeyId=$accessKeyId\nsecretAccessKey=$secretAccessKey\nregion=$region\nendpoint=$endpoint" > .env
