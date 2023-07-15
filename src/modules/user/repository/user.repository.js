// This file will manage database operations like
// Find data a User by UserID, Create a User, Update
// a User by UserID, and Delete a User by UserID.

// We use library UUID for the Primary key UserID.

const db = require(`../../../helpers/database`);
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.tableName = "Users";
  }

  async findByEmailID(EmailID) {
    const params = {
      TableName: this.tableName,
      Key: {
        EmailID,
       }, 
    };

    try {
      return await db.get(params).promise();
    } catch (e) {
      console.log(e);
    }
  }

  async create(data) {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          UserID: uuidv4(),
          Username: data.Username,
          EmailID: data.EmailID,
        },
      };

      await db.put(params).promise();

      return params.Item;
    } catch (e) {
      console.log(e);
    }
  }

  async update(UserID, data) {
    const params = {
      TableName: this.tableName,
      Key: {
        UserID: UserID,
      },
      UpdateExpression: `set #Username = :Username`,
      ExpressionAttributeNames: {
        "#Username": `Username`,
      },
      ExpressionAttributeValues: {
        ":Username": data.Username,
      },
      ReturnValues: `UPDATED_NEW`,
    };

    const update = await db.update(params).promise();

    return update.Attributes;
  }

  async deleteByID(UserID) {
    const params = {
      TableName: this.tableName,
      Key: {
        UserID,
      },
    };

    return await db.delete(params).promise();
  }
}

module.exports = new UserRepository();
