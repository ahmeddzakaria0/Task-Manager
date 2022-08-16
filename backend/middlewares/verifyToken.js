

// Authorization: Bearer <Token>
exports.verifyToken = (req,res,next) => { 
    //get auth header value
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        res.status(200)
        next()
        
    }
    else{
        res.status(403).send("NOT AUTHORIZEDDD ")
    }

}