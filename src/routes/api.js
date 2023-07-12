// Endpoints for this API 

// GET /api/v1/users/:UserID -- FETCH data user by UserID
// GET /api/v1/users/:Username -- FETCH data user by Username
// POST /api/v1/users -- CREATE data user
// PATCH /api/v1/users/:UserID -- UPDATE data user by UserID
// DELETE /api/v1/users/:UserID -- DELETE data user by UserID

// As you add more CONTROLLERS, you can break this one api file out into multiple
// files, then import them back into this file.

// USER
const UserController = require('../modules/user/controller/user.controller');
module.exports = async (app) => {
    app.get(`/api/v1/users/id/:UserID`, UserController.findByID);
    //app.get(`/api/v1/users/username/:Username`, UserController.findByUsername);
    app.post(`/api/v1/users`, UserController.create);
    app.patch(`/api/v1/users/:UserID`, UserController.update);
    app.delete(`/api/v1/users/:UserID`, UserController.deleteByID);
};