# nodejs-aws-api

Foranyone looknig for a rest API template using NodeJS and Express.JS, with an AWS dynamodb database, look no further :)

## Installation

Clone the repo onto your local machine. Run <code>npm i</code>. After creating your dynamodb on AWS (with 'user and 'unique' tables), create a .env file with your AWS settings.

Run <code>npm start</code> and test using Postman.

## Environmental files

<p><strong>Put these values in your .env file:</strong></p>
<code>accessKeyId=[Your Access Key ID value from AWS]</code><br/>
<code>secretAccessKey=[Your Secret Key value from AWS]</code><br/>
<code>region=[Your AWS Region]</code><br/>
<code>endpoint=[Your AWS Dynamodb endpoint]</code>
