#!/bin/bash
cd /home/ec2-user/nodejs-aws-api

accessKeyId=$(sudo aws ssm get-parameters --region us-east-1 --names accessKeyId --with-decryption --query Parameters[0].Value)
secretAccessKey=$(sudo aws ssm get-parameters --region us-east-1 --names secretAccessKey --with-decryption --query Parameters[0].Value)
region=$(sudo aws ssm get-parameters --region us-east-1 --names region --query Parameters[0].Value)
endpoint=$(sudo aws ssm get-parameters --region us-east-1 --names endpoint --query Parameters[0].Value)

echo -e "accessKeyId=$accessKeyId\nsecretAccessKey=$secretAccessKey\nregion=$region\nendpoint=$endpoint" > .env