const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const loginController = require('./../controller/loginController')

router.post('/login', 

body("email")
.notEmpty().withMessage()
,
body("password")
.notEmpty()
 ,loginController.login)

 module.exports = router;