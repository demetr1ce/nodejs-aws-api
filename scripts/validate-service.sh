#!/bin/bash
cd /home/ec2-user/nodejs-aws-api

accessKeyId="accessKeyId=$(aws ssm get-parameters --region us-east-1 --names accessKeyId --with-decryption --query Parameters[0].Value)"
secretAccessKey="secretAccessKey=$(aws ssm get-parameters --region us-east-1 --names secretAccessKey --with-decryption --query Parameters[0].Value)"
region="region=$(aws ssm get-parameters --region us-east-1 --names region --query Parameters[0].Value)"
endpoint="endpoint=$(aws ssm get-parameters --region us-east-1 --names endpoint --query Parameters[0].Value)"

echo "${accessKeyId}\n${secretAccessKey}\n${region}\n${endpoint}\n" > .env