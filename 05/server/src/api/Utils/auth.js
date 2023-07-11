const jwt = require('jsonwebtoken')

exports.auth = (req,res,next) =>{
    try{
        const {authorization}  = req.headers

        const [_,token] = authorization.split(' ')

        if (!token) return res.status(400).send('No token provided')

        const {id} = jwt.verify(token,process.env.SECRET_KEY)

        req.userId = id

        next()

    } catch(err){
        res.status(400).json({message:'something went wrong with token',data:err})
    }
}