const express = require("express");
const userController = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/user", userController.getUser);

// userRoutes.get("/user/:id", userController.getUserById);

userRoutes.post("/user", userController.postUser);

userRoutes.post("/user/login", userController.postUserByLogin);

// userRoutes.put("/user/:id", userController.putUser);

// userRoutes.delete("/user/:id", userController.deleteUser);

module.exports = userRoutes;