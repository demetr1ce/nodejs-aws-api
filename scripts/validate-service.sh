#!/bin/bash
cd /home/ec2-user/nodejs-aws-api

accessKeyId=$(aws ssm get-parameters --region us-east-1 --names accessKeyId --with-decryption --query Parameters[0].Value)
secretAccessKey=$(aws ssm get-parameters --region us-east-1 --names secretAccessKey --with-decryption --query Parameters[0].Value)
region=$(aws ssm get-parameters --region us-east-1 --names region --query Parameters[0].Value)
endpoint=$(aws ssm get-parameters --region us-east-1 --names endpoint --query Parameters[0].Value)

echo "accesKeyId=$accessKeyId\n secretAccessKey=$secretAccessKey\n region=$region\n endpoint=$endpoint" > .env