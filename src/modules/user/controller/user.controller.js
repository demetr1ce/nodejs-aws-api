// Manage request/response. Request starts/ends here.

//const { Finspace } = require("aws-sdk");
const UserService = require(`../service/user.service`);

class UserController {
  all = async (req, res) => {
    try {
      console.log(`Finding all Users...`);
      const data = await UserService.all();

      if (data) {
        let successMessage;

        if (data.Count > 1) {
          successMessage = `(${data.Count}) users successfully found.`;
        } else if (data.Count === 1) {
          successMessage = `(${data.Count}) user successfully found.`;
        } else {
          successMessage = `Query was successful, but (${data.Count}) users found.`;
        }

        console.log(successMessage);
        console.log(" ");

        res.json(data);
      } else {
        console.log(`Users not found.`);
        res.json(`Users not found.`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Begin sending the FIND by Email request
  find = async (req, res) => {
    try {
      console.log(
        `Finding User by Email: ${JSON.stringify(req.params.Email)}...`
      );

      const data = await UserService.find(req.params.Email);

      if (data) {
        console.log(
          `User successfully found: ${data.Items[0]?.Username} (${data.Items[0]?.ID}, ${data.Items[0]?.Email})`
        );
        console.log(" ");

        res.json(data);
        return data;
      } else {
        console.log(`User ${JSON.stringify(req.params.Email)} not found.`);
        res.json(`User ${JSON.stringify(req.params.Email)} not found.`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Begin sending the CREATE request
  create = async (req, res) => {
    try {
      console.log(`Creating User: ${JSON.stringify(req.body.Username)}...`);

      const data = await UserService.create(req.body);

      if (data) {
        console.log(
          `User ${JSON.stringify(data.Username)} successfully created (${
            data.Email
          })`
        );
        console.log(" ");

        res.json(data);
      }
    } catch (e) {
      switch (e.code) {
        case "TransactionCanceledException":
          console.log(
            `User already exists with this email address. Please use a different address or recover your password.`
          );
          break;

        default:
          console.log(`${e.code}: ${e.message}`);
          break;
      }
      res.json(e);
    }
  };

  // TODO: move all functionality not strictly related to request/resolve into service tier
  update = async (req, res) => {
    try {
      const currentUser = await this.find(req, res);

      console.log(`Updating ${currentUser.Items[0]?.Email}...`);

      let newEmail;
      let newUsername;
      let updateObject = {
        ID: currentUser.Items[0]?.ID,
      };

      if (req.body.Email) {
        newEmail = { Email: req.body.Email };
        updateObject = { ...updateObject, ...newEmail };
      }

      if (req.body.Username) {
        newUsername = { Username: req.body.Username };
        updateObject = { ...updateObject, ...newUsername };
      }

      if (updateObject.ID) {
        const data = await UserService.update(
          currentUser.Items[0]?.Email,
          updateObject
        );

        if (data) {
          let successMessage = "Successfully updated ";

          if (data.Email && !data.Username) {
            successMessage = successMessage + `${JSON.stringify(data.Email)}`;
          } else if (data.Username && !data.Email) {
            successMessage =
              successMessage + `${JSON.stringify(data.Username)}`;
          } else if (data.Username && data.Email) {
            successMessage =
              successMessage +
              `${JSON.stringify(data.Email)} and ${JSON.stringify(
                data.Username
              )}`;
          }

          console.log(successMessage);
          console.log(" ");
          //res.json(data);
        } else {
          console.log(`User ${JSON.stringify(req.params.Email)} not found.`);
          //res.json(`User ${JSON.stringify(req.params.Email)} not found.`);
        }
      }
    } catch (e) {
      switch (e.code) {
        case "ValidationException":
          console.log(
            `Email was not updated because it is equal to current email.`
          );
          break;

        default:
          console.log(`${e.code}: ${e.message}`);
          break;
      }
    }
  };

  // TODO: move all functionality not strictly related to request/resolve into service tier
  delete = async (req, res) => {
    try {
      const currentUser = await this.find(req, res);

      console.log(`Deleting user: ${currentUser.Items[0]?.Email}...`);

      let userObject = {
        ID: currentUser.Items[0]?.ID,
        Email: currentUser.Items[0]?.Email,
      };

      const data = await UserService.delete(userObject);

      if (data) {
        console.log(`Successfully deleted ${JSON.stringify(req.params.Email)}`);
        console.log(" ");
        //res.json(`Successfully deleted ${JSON.stringify(req.params.Email)}`);
      } else {
        console.log(`User ${JSON.stringify(req.params.Email)} not found.`);
        //res.json(`User ${JSON.stringify(req.params.Email)} not found.`);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = new UserController();
