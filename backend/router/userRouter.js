const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const userController = require('./../controller/userController')
const verifyToken = require('./../middlewares/verifyToken')

router.get('/user/list' , verifyToken.verifyToken , userController.getAllUsers)
router.get('/user/list/:id?' , verifyToken.verifyToken ,userController.getUser) 

router.post('/user/adduser',
        body("fullName")
            .isString().withMessage("Name should be string")
            .notEmpty().withMessage("User should have a name")
        ,
        body("userName")
            .notEmpty().withMessage("User should have a username")
        ,
        body("email")
            .notEmpty().withMessage("User should have a email")
        ,
        body("password")
            .notEmpty().withMessage("User should have a password")
        , 
        userController.addUser
)

/*  router.put('/user/updateuser/:id?',userController.updateUser)
router.delete('/user/delete/:id?',userController.deleteUser)  */


module.exports = router;