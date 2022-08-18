const roleSchema = require("./../model/roleModel")
const { validationResult } = require("express-validator");      //Input Validator
const jwt =  require('jsonwebtoken')  
require('dotenv').config()               

/* POST METHOD */
exports.addRole = (req,res,next) => {
    console.log("Trying To Add new Role//**//")
    const validationRes = validationResult(req)
//Checking Express Validation
    if( !validationRes.isEmpty() ) {
         console.log("Validating inputs by Express//**// ")
        let errMsgs = validationRes.array().reduce((conc, err) => conc + err.msg + ".\n", "Validation Result Errors: \n")
        let errObj = new Error(errMsgs);
        errObj.status = 422;
        res.status(401).send("All Values Are Required");
        console.error('Express Validation Results Error//**//' + next(errObj))
 }          
 
 jwt.verify(req.token ,process.env.TOKEN_KEY , (err,authData) => {
    if(err){
        res.status(403).send('NOT AUTHORIZED')
    }
    else{
        let role = new roleSchema({
            name:req.body.name ,
            permission : req.body.permission
        })
        //Generating Token
        
        role.save()
        //Save THEN CATCH
        .then((data) => {res.json({message:"Role added :",data})})
        .catch((err) => {console.error(`Couldnt Add(save) Role//**//${next(err)}`);
                        res.status(401).send("Role is already taken");})
    }
 })
 
} 
/* GET ALL METHOD */
exports.getAllRoles = (req,res,next) => {
    
    jwt.verify(req.token , process.env.TOKEN_KEY , (err,authData) => {
        console.log(authData);
        if (err) {
            res.status(403).send('NOT AUTHORIZED')
        }
        else{
            roleSchema.find({})
        .then( (data) => {res.json({message:"Roles : ",data}) })
        .catch( (error) => {next(error)} )
        }
    });
}