const userSchema = require("./../model/userModel")
const { validationResult } = require("express-validator");      //Input Validator
const bcrypt = require('bcrypt');                             //En/Decrypt Tool
var validator = require("email-validator");     
const jwt =  require('jsonwebtoken')  

exports.login = (req,res,next) => {
    let validationRes = validationResult(req)
    if( !validationRes.isEmpty()){
        let errMsgs = validationRes.array().reduce((conc, err) => conc + err.msg + ".\n", "Validation Result Errors: \n")
        let errObj = new Error(errMsgs);
        errObj.status = 422;
        console.error('Validation Results Error//**//')
        next(errObj)
        return res.status(401).send("All Values Are Required");
    }

    if ( !validator.validate(req.body.email)){
        let errMsgs = `${req.body.email} is not an Email valid format.`
        let errObj = new Error(errMsgs);
        errObj.status = 423;
        console.error(next('Email Validation Results Error//**//' ) )
        next( errObj)
       return res.status(401).send(`${req.body.email} is not a valid format`);
    }

    userSchema.findOne({email:req.body.email})
    .then((data) => {
        console.log(`Trying To Login`)
        if ( data && bcrypt.compareSync(req.body.password,data.password)){
            //create token 
            console.log("Creating Token")
            const token = jwt.sign( {data} , process.env.TOKEN_KEY , {expiresIn:"5m"} )
            res.cookie("jwt" , token , {httpOnly:true , maxAge:100000})
            console.log(`TOKEN ${token}`)
            console.log("COOKIE CREATED")
            return res.status(200).json({ message: "Logged in" });
        }
        else{
            res.status(403).send("You are not Registered")
        }
    })
    .catch((err)=>{return res.status(405).send("E-mail or password is incorrect") ;                       
    })
}

