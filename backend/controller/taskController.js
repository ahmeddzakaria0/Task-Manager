const taskSchema = require("../model/taskModel")
const { validationResult } = require("express-validator");      //Input Validator
const jwt =  require('jsonwebtoken')  
require('dotenv').config()               

/* POST METHOD */
exports.addTask = (req,res,next) => {
    console.log("Trying To Add new Task//**//")
    const validationRes = validationResult(req)
    console.log(validationRes)
//Checking Express Validation
    if( !validationRes.isEmpty() ) {
         console.log("Validating inputs by Express//**// ")
        let errMsgs = validationRes.array().reduce((conc, err) => conc + err.msg + ".\n", "Validation Result Errors: \n")
        let errObj = new Error(errMsgs);
        errObj.status = 422;
        res.status(401).send("All Values Are Required");
        console.error('Express Validation Results Error//**//' + next(errObj))
 } 
    let task = new taskSchema({
        taskName : req.body.taskName,
        taskDescription : req.body.taskDescription,
        deadline : req.body.deadline,
        assignedTo : req.body.assignedTo,
        createdBy: req.body.createdBy
    })
    task.save()
    //Save THEN CATCH
    .then((data) => {res.json({message:"Task added :",data})})
    .catch((err) => {console.error(`Couldnt Add(save) Task//**//${next(err)}`);
                    res.status(401).send("Couldnt Save");})             
} 



/* GET ALL METHOD */
exports.getAllTasks = (req,res,next) => {
    
    jwt.verify(req.token , process.env.TOKEN_KEY , (err,authData) => {
        console.log(authData);
        if (err) {
            res.status(403).send('NOT AUTHORIZED')
        }
        else{
            taskSchema.find({})
            .populate('createdBy')
            .populate('assignedTo')
        .then( (data) => {res.json({message:"Tasks : ",data}) })
        .catch( (error) => {next(error)} )
        }


    
    });
}

/* GET ONE METHOD */
exports.getTask = (req,res,next) => {
    jwt.verify(req.token , process.env.TOKEN_KEY , (err,authData) => {
        console.log(authData);
        if (err) {
            res.status(403).send('NOT AUTHORIZED')
        }
        else{
            if (req.params.id) {
                let taskId = req.params.id ;
                taskSchema.find({ _id: taskId })
                    .then(data => {
                        res.status(200).json({ message: "Selected Task", data });
                    })
                    .catch(err => next(err));
        
            }
        }
    });
}
