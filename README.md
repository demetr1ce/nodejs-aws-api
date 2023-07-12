# nodejs-aws-api

I wanted to build a quick and easy API in NodeJS using AWS dynamodb for a few personal projects, and it was so quick to setup, I figured I would share it :)

## Installation

Clone the repo onto your local machine. Run <code>npm i</code>. After creating your dynamobd on AWS, create a .env file with your AWS settings.

Run <code>nodemon app.js</code> and test using Postman.

## Environmental files

<p><strong>Put these values in your .env file:</strong></p>
<code>accessKeyId=[Your Access Key ID value from AWS]</code><br/>
<code>secretAccessKey=[Your Secret Key value from AWS]</code><br/>
<code>region=[Your AWS Region]</code><br/>
<code>endpoint=[Your AWS Dynamodb endpoint]</code>
