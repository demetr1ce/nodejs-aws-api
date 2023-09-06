source /home/ec2-user/.bash_profile
cd /home/ec2-user/nodejs-aws-api
sudo chown -R $(whoami) ~/nodejs-aws-api

sudo npm i

accessKeyId=$(sudo aws ssm get-parameters --region us-east-1 --names accessKeyId --with-decryption --query Parameters[0].Value | tr -d '"') 
secretAccessKey=$(sudo aws ssm get-parameters --region us-east-1 --names secretAccessKey --with-decryption --query Parameters[0].Value | tr -d '"')
region=$(sudo aws ssm get-parameters --region us-east-1 --names region --query Parameters[0].Value | tr -d '"')
endpoint=$(sudo aws ssm get-parameters --region us-east-1 --names endpoint --query Parameters[0].Value | tr -d '"')

echo -e "accessKeyId=$accessKeyId\nsecretAccessKey=$secretAccessKey\nregion=$region\nendpoint=$endpoint" > .env

sudo node app.js