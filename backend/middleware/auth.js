const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const tokeen = req.headr('x-auth-token');
    if(!token){
        return res.status(401).json({message:'No token, auth denied'});
    }

    try{
        const decoded = jwt.verify(toke,process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }catch(err){
        res.statius(401).json({message:'Invalid Token'});
    }
}

module.exports = auth;