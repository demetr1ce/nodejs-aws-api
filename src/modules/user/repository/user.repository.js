// This file will manage database operations,
// typical CRUD. Take note of how uniqueness of email
// addresses are guarenteed with the uniques table
// tracking every unique email entered into the db.
// This can also be expanded to track usernames by
// adding them to the unique table with the 'username'
// type.

// We use library UUID for the Primary key UserID.
const db = require(`../../../helpers/database`);
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.usersTableName = "users";
    this.uniquesTableName = "uniques";
    this.emailIndexName = "EmailIndex";
  }

  async all() {
    const params = {
      TableName: this.usersTableName,
      ProjectionExpression: "#email, #username",
      ExpressionAttributeNames: { "#email": "Email", "#username": "Username" },
    };

    try {
      return await db.scan(params).promise();
    } catch (e) {
      console.log(e);
    }
  }

  async find(Email) {
    try {
      const params = {
        TableName: this.usersTableName,
        IndexName: this.emailIndexName,
        KeyConditionExpression: "#email = :v_email",
        ProjectionExpression: "#email, #username, #id",
        ExpressionAttributeNames: {
          "#email": "Email",
          "#username": "Username",
          "#id": "ID",
        },
        ExpressionAttributeValues: { ":v_email": Email },
      };

      return await db.query(params).promise();
    } catch (e) {
      console.log(e);
    }
  }

  async create(data) {
    try {
      const params = {
        TransactItems: [
          {
            Put: {
              TableName: this.usersTableName,
              ConditionExpression: "attribute_not_exists(#pk)",
              ExpressionAttributeNames: {
                "#pk": "ID",
              },
              Item: {
                ID: uuidv4(),
                Email: data.Email,
                Username: data.Username,
              },
            },
          },
          {
            Put: {
              TableName: this.uniquesTableName,
              ConditionExpression: "attribute_not_exists(#pk)",
              ExpressionAttributeNames: {
                "#pk": "value",
              },
              Item: {
                value: data.Email,
                type: "email",
              },
            },
          },
        ],
      };

      await db.transactWrite(params).promise();

      return data;
    } catch (e) {
      throw e;
    }
  }

  async update(currentEmail, data) {
    try {
      let updateExpression = "SET ";
      let expressionAttributeNames = {};
      let expressionAttributeValues = {};
      let conditionExpression;

      // Always send the email to check against the db, be it old or new
      updateExpression = updateExpression + "#email = :v_email";
      conditionExpression = "#email = :v_currentemail";
      expressionAttributeNames = { "#email": "Email" };
      expressionAttributeValues = data.Email
        ? {
            ":v_email": data.Email,
            ":v_currentemail": currentEmail,
          }
        : { ":v_email": currentEmail, ":v_currentemail": currentEmail };

      // Updating username
      if (data.Username) {
        updateExpression = updateExpression + ", #username = :v_username";
        expressionAttributeNames = {
          ...expressionAttributeNames,
          ...{ "#username": "Username" },
        };
        expressionAttributeValues = {
          ...expressionAttributeValues,
          ...{ ":v_username": data.Username },
        };
      }

      // Remove the old email from the unique table
      const uniqueDelete = {
        Delete: {
          TableName: this.uniquesTableName,
          Key: {
            value: currentEmail,
            type: "email",
          },
          ConditionExpression: "attribute_exists(#pk)", // Optional
          ExpressionAttributeNames: {
            "#pk": "value",
          },
        },
      };

      // Add the new email to the unique table
      const uniquePut = {
        Put: {
          TableName: this.uniquesTableName,
          ConditionExpression: "attribute_not_exists(#pk)",
          ExpressionAttributeNames: {
            "#pk": "value",
          },
          Item: {
            value: data.Email,
            type: "email",
          },
        },
      };

      const params = {
        TransactItems: [
          {
            // Update the email and/or username
            Update: {
              TableName: this.usersTableName,
              Key: {
                ID: data.ID,
              },
              UpdateExpression: updateExpression,
              ExpressionAttributeNames: expressionAttributeNames,
              ExpressionAttributeValues: expressionAttributeValues,
              ConditionExpression: conditionExpression, // Check the value in the db matches the previously read one
            },
          },
        ],
      };

      // If email is being updated, we must also update the 'unique' table
      if (data.Email) {
        params.TransactItems.push(uniqueDelete);
        params.TransactItems.push(uniquePut);
      }

      await db.transactWrite(params).promise();

      return data;
    } catch (e) {
      throw e;
    }
  }

  async delete(userObject) {
    try {
      const params = {
        TransactItems: [
          {
            Delete: {
              TableName: this.usersTableName,
              Key: { ID: userObject.ID },
              ExpressionAttributeNames: { "#email": "Email" },
              ExpressionAttributeValues: {
                ":v_email": userObject.Email,
              },
              ConditionExpression: "#email = :v_email",
            },
          },
          {
            Delete: {
              TableName: this.uniquesTableName,
              Key: {
                value: userObject.Email,
                type: "email",
              },
              ConditionExpression: "attribute_exists(#pk)", // optional
              ExpressionAttributeNames: {
                "#pk": "value",
              },
            },
          },
        ],
      };

      const del = await db.transactWrite(params).promise();
      return del;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new UserRepository();
