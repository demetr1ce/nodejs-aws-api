source /home/ec2-user/.bash_profile
export FOLDER=/home/ec2-user/nodejs-aws-api

if [ -d $FOLDER ]
then
 rm -rf $FOLDER
fi

mkdir -p $FOLDER