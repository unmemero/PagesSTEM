const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message:'No token, auth denied'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message:'Invalid Token'});
    }
}

module.exports = auth;