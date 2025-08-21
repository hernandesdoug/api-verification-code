const express = require("express");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/user", userController.getUser);

userRoutes.get("/user/:id", userController.getUserById);

userRoutes.post("/user", userController.postUser);

userRoutes.post("/user/login", userController.postUserByLogin);

userRoutes.put("/user/:id", userController.updateUser);

userRoutes.delete("/user/:id", userController.deleteUser);

userRoutes.post("/user/:id/:code", userController.verifyCode);

module.exports = userRoutes;