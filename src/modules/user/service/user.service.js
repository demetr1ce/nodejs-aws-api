// This file will manage return data from user.repository.js
// Manages business logic like manipulation data, validation, etc.

const UserRepository = require(`../repository/user.repository`);

class UserService {
  async findByID(UserID) {
    try {
      const data = await UserRepository.findByID(UserID);

      if (data) {
        return data.Item;
      }
    } catch (e) {
      console.log(e);
    }
  }

  /*
  async findByUsername(Username) {
    try {
      const data = await UserRepository.findByUsername(Username);

      if (data) {
        return data.Item;
      }
    } catch (e) {
      console.log(e);
    }
  }
  */

  async create(data) {
    try {
      return await UserRepository.create({
        Username: data.Username,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async update(UserID, data) {
    console.log(`Updating item by ID: ${UserID}...`);

    return await UserRepository.update(UserID, {
      Username: data.Username,
    });
  }

  async deleteByID(UserID) {
    console.log(`Deleting item by ID: ${UserID}...`);

    return await UserRepository.deleteByID(UserID);
  }
}

module.exports = new UserService();
