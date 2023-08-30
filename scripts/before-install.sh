#!/bin/bash
export FOLDER=/tmp/CodeDeployNodeJS-API

if [ -d $FOLDER ]
then
 rm -rf $FOLDER
fi

mkdir -p $FOLDER