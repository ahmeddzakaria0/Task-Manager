const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const roleController = require('./../controller/roleController')
const verifyToken = require('./../middlewares/verifyToken')

router.get('/role/list' , verifyToken.verifyToken , roleController.getAllRoles)
//////////////////////////////////////////////////////////////////////////////////////////////
router.post('/role/addrole', 
body("name")
.isString().withMessage("Name should be string")
.notEmpty().withMessage("Role should have a name")
,
body("permission")
.notEmpty().withMessage("Role should have a permission")
,verifyToken.verifyToken,roleController.addRole)
//////////////////////////////////////////////////////////////////////////////////////////////
/*  router.put('/user/updateuser/:id?',userController.updateUser)
router.delete('/user/delete/:id?',userController.deleteUser)  */
//router.get('/user/list/:id?' , verifyToken.verifyToken ,userController.getUser) 

module.exports = router;



