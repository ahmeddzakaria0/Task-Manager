const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const taskController = require('./../controller/taskController')
const verifyToken = require('./../middlewares/verifyToken')

router.get('/task/list' , verifyToken.verifyToken , taskController.getAllTasks)
router.get('/task/list/:id?' , verifyToken.verifyToken ,taskController.getTask) 

router.post('/task/addtask',
        body("taskName")
            .isString().withMessage("task should be string")
            .notEmpty().withMessage("Task should have a name")
        ,
        body("taskDescription")
            .notEmpty().withMessage("Task should have a description")
        ,
        body("deadline")
            .notEmpty().withMessage("task should have a deadline")
        , 
        verifyToken.verifyToken , taskController.addTask
)

/*  router.put('/user/updateuser/:id?',userController.updateUser)
router.delete('/user/delete/:id?',userController.deleteUser)  */


module.exports = router;