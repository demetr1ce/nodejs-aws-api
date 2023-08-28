// Endpoints for this API 

// GET /api/v1/users/all/ -- READ all users
// GET /api/v1/users/find/:Email -- READ user by Email
// POST /api/v1/users/add/ -- CREATE user
// PATCH /api/v1/users/update/:Email -- UPDATE user by Email
// DELETE /api/v1/users/delete/:Email -- DELETE user by Email

// As you add more CONTROLLERS, you can break this api file out into multiple
// files, then import them back into this file.

// USER
const UserController = require('../modules/user/controller/user.controller');

module.exports = async (app) => {
    app.get(`/api/v1/users/all/`, UserController.all);
    app.get(`/api/v1/users/find/:Email`, UserController.find);
    app.post(`/api/v1/users/add`, UserController.create);
    app.patch(`/api/v1/users/update/:Email`, UserController.update);
    app.delete(`/api/v1/users/delete/:Email`, UserController.delete);
};