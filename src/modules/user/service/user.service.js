// This file will manage return data from user.repository.js
// Manages business logic like manipulation data, validation, etc.

const UserRepository = require(`../repository/user.repository`);

class UserService {
  async all() {
    try {
      const data = await UserRepository.all();

      if (data) {
        data.Items?.forEach((user) => {
          console.log(`Email: ${user.Email}, Username: ${user.Username}`);
        });
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async find(Email) {
    try {
      const data = await UserRepository.find(Email);

      if (data) {
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async create(data) {
    try {
      return await UserRepository.create({
        Username: data.Username,
        Email: data.Email,
      });
    } catch (e) {
      throw e;
    }
  }

  async update(Email, data) {
    try {
      let newEmail;
      let newUsername;
      let updateObject = {
        ID: data.ID
      };

      if (data?.Email) {
        newEmail = { Email: data.Email };
        updateObject = { ...updateObject, ...newEmail};
      }

      if (data?.Username) {
        newUsername = { Username: data.Username };
        updateObject = { ...updateObject, ...newUsername};
      }
      
      let updatedData = await UserRepository.update(Email, updateObject);

      if (data?.Email) {
        updatedData = ({ ...updatedData, ...{ newUsername: newEmail }});
      }
      if (data?.Username) {
        updatedData = ({ ...updatedData, ...{ newUsername: newUsername }});
      }
      
      return updatedData;

    } catch (e) {
      throw e;
    }
  }

  async delete(userObject) {
    try {
      const data = await UserRepository.delete(userObject);

      if (data) {
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserService();
