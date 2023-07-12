// Manage request/response. Request starts here.

const UserService = require(`../service/user.service`);

class UserController {

  // Begin sending the FIND request
  async findByID(req, res) {
    try {
      console.log(" ");
      console.log(`Finding UserID: ${JSON.stringify(req.params.UserID)}...`);
      const data = await UserService.findByID(req.params.UserID);

      if (data) {
        console.log(`User successfully found: ${data.Username} (${data.UserID})...`);
        console.log(" ");

        res.json(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /*
    // Begin sending the FIND by Username request
    async findByUsername(req, res) {
        try {
          console.log(" ");
          console.log(`Finding Username: ${JSON.stringify(req.params.Username)}...`);
          const data = await UserService.findByID(req.params.Username);
    
          if (data) {
            console.log(`User successfully found: ${data.Username} (${data.UserID})...`);
            console.log(" ");
    
            res.json(data);
          }
        } catch (e) {
          console.log(e);
        }
      }
  */

  // Begin sending the CREATE request
  async create(req, res) {
    try {
      console.log(" ");
      console.log(`Creating User: ${JSON.stringify(req.body.Username)}...`);
      const data = await UserService.create(req.body);

      if (data) {
        console.log(`User ${JSON.stringify(data.Username)} successfully created (${data.UserID})`);
        console.log(" ");

        res.json(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    const data = await UserService.update(req.params.UserID, req.body);

    res.json(data);
  }

  async deleteByID(req, res) {
    await UserService.deleteByID(req.params.UserID);

    res.json(`Success`);
  }
}

module.exports = new UserController();
