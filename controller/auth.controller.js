const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const {signUpErrors, signInErrors} = require('../utils/errors.utils')

module.exports.signUp = async(req, res) =>{
    const {speudo, email, password} = req.body

    try{
        const user = await UserModel.create({speudo, email, password});
        res.status(201).json({user: user._id})
    }
    catch(err){
        const errors = signUpErrors(err)
        res.status(400).json({errors})
    }
}


//se connecter
const maxAge = 60 * 60 * 24 * 3 
const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET)
    expiresIn: maxAge;
}
module.exports.signIn = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    }
    catch(err){
        const errors = signInErrors(err)
        res.status(400).json({errors})
    }
}


//se déconnecter
module.exports.logout = (req, res)=>{
    res.cookie('jwt', "", {maxAge:1})
    res.redirect('/')
}