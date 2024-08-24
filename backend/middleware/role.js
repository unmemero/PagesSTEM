function adminOnly(req,res,next){
    if(req.user && (req.user.role === 'admin' || req.user.role === 'hybrid')){
        next();
    }else{
        return res.status(403).json({message:'Access denied, admin only'});
    }
}

module.exports = adminOnly;