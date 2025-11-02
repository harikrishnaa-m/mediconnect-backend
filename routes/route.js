const express = require("express");
const route = new express.Router();
const doctorController = require("../controller/doctorController");
const userController = require("../controller/userController");
//routes
route.get("/api/getAllDoctors", doctorController.getAllDoctors);
route.get("/api/getADoctor/:id", doctorController.getADoctor);
route.post("/api/makepayment", doctorController.makepayment);
route.post("/api/register", userController.registerUser);
route.post("/api/login", userController.loginUser);
route.post("/api/googlesignin", userController.googleLogin);
module.exports = route;
