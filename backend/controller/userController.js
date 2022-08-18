const userSchema = require("./../model/userModel")
const { validationResult } = require("express-validator");      //Input Validator
const bcrypt = require('bcrypt');                             //En/Decrypt Tool
const validator = require("email-validator");  //Email Validator
const jwt =  require('jsonwebtoken')  

require('dotenv').config()               

/* POST METHOD */
exports.addUser = (req,res,next) => {
    console.log("Trying To Add new user//**//")
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

//Checking Email Validation    
    if(!validator.validate(req.body.email)){
        console.log("Validiating by Email//**//")
        let errMsgs = `${req.body.email} is not an Email valid format.`
        let errObj = new Error(errMsgs);
        errObj.status = 423;
        res.status(401).send(errMsgs);
        console.error(next('Email Validation Results Error' + errObj) )
    } 
    bcrypt.hash(req.body.password,10)
            .then((hash)=>{                             //bycrypt THEN
                let user = new userSchema({
                    fullName: req.body.fullName,
                    userName : req.body.userName,
                    email: req.body.email,
                    password: hash,
                    role:req.body.role
                })
                //Generating Token
                
                
                user.save()
                //Save THEN CATCH
                .then((data) => {res.json({message:"User added :",data})})
                .catch((err) => {console.error(`Couldnt Add(save) User//**//${next(err)}`);
                                res.status(401).send("Couldnt Save");})
        
             })
            .catch(err => {console.error(`${next(err)}`)}) //bycrypt CATCH
} 



/* GET ALL METHOD */
exports.getAllUsers = (req,res,next) => {
    
    jwt.verify(req.token , process.env.TOKEN_KEY , (err,authData) => {
        console.log(authData);
        if (err) {
            res.status(403).send('NOT AUTHORIZED')
        }
        else{
            userSchema.find({})
            .populate('role')
        .then( (data) => {res.json({message:"Users : ",data}) })
        .catch( (error) => {next(error)} )
        }


    
    });
}

/* GET ONE METHOD */
exports.getUser = (req,res,next) => {
    jwt.verify(req.token , process.env.TOKEN_KEY , (err,authData) => {
        console.log(authData);
        if (err) {
            res.status(403).send('NOT AUTHORIZED')
        }
        else{
            if (req.params.id) {
                let userId = req.params.id ;
                userSchema.find({ _id: userId })
                    .then(data => {
                        res.status(200).json({ message: "Selected User", data });
                    })
                    .catch(err => next(err));
        
            }
        }
    });
}
