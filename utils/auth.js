const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next)=>{
    if(!req.headers['authorization']){
        return res.status(403).
        json({message: 'Token is Required'});
    }
    try{
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);
        return next();

    }catch(err){
        return res.status(403).
        json({message: 'Token is not Valid: Or it is Expired'});
    
    }

}

module.exports = {
    ensureAuthenticated
}