const express = require("express");
const router = express.Router();



router.get('/logout',(req,res,next) => {
    res.cookie("jwt" , "" , {maxAge:1})
    console.log("LOGGED OUT")
    res.status(200).send("LOGGED OUT")
})

 module.exports = router;