const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        speudo:{
            type: String ,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 55,
            trim: true
        },

        email:{
            type: String ,
            required: true,
            unique: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },

        password:{
            type: String ,
            required: true,
            minlength: 6,
            maxlength: 1024
        },
        picture:{
            type: String,
            default: "./uploads/profil/ramdom-user.png"
        },
        bio:{
            type: String,
            max: 1024
        },
        likes: {type: [String]},
        followers: {type: [String]},
        following: {type: [String]},
    },
    {
        timestamps: true
    }
    
   
);

//fonction pour crypter le mot de passe pour le cacher
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}


const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;