#!/bin/bash
export FOLDER=/home/ec2-user/nodejs-aws-api

if [ -d $FOLDER ]
then
 rm -rf $FOLDER
fi

mkdir -p $FOLDER