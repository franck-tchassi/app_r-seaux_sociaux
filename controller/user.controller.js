const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId



module.exports.getAllUsers = async (req, res)=>{
    const users = await UserModel.find().select("-password");
    res.status(200).json(users)
}


module.exports.userInfo = async(req, res)=>{
    try{
        if (!ObjectID.isValid(req.params.id))
            return  res.status(400).send("ID itrouvable:" + req.params.id)
        const user = await UserModel.findById(req.params.id).select('-password');
        if(!user) return res.status(404).send("utilisateur itrouvable")

        res.status(200).json(user)
    }
    catch(err){
          res.status(500).send("erreur server")
    }  
}

module.exports.updateUser = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
       return res.status(400).send("ID invalide:" + req.params.id )
    
    try{
        const user = await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {$set:{
                bio:  req.body.bio
            }},
            {new: true , upsert: true, setDefaultsOnInsert: true}
        )
        if(!user) return res.status(400).send("utilisateur introuvable")

        else return res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message: err})
    }
}

module.exports.deleteUser = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
       return res.status(400).send("ID invalide:" + req.params.id);
    
    try{
        const user = await UserModel.deleteOne({_id: req.params.id}).exec();

        if(!user){
            res.status(400).send("utilisateur introuvable")
        }
        else{
            res.status(200).json({message: "suppression avec success" })
        }

        
        
    }
    catch(err){
        res.status(500).json({message: err})
    }

}


module.exports.follow = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
       return res.status(400).send("ID Invalide:" + req.params.id)
    
       try {
        // Ajouter l'utilisateur à la liste des "following" de l'utilisateur actuel
        const user1 = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true }
        );

        if (!user1) {
            return res.status(400).send("Utilisateur actuel introuvable");
        }

        // Ajouter l'utilisateur actuel à la liste des "followers" de l'utilisateur cible
        const user2 = await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true }
        );

        if (!user2) {
            return res.status(400).send("Utilisateur cible introuvable");
        }

        return res.status(201).json({ user1, user2 });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};



module.exports.unfollow = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
       return res.status(400).send("ID Invalide:" + req.params.id)
    
    try{
        // retirer l'utilisateur à la liste des "following" de l'utilisateur actuel
        const user1 = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { followers: req.body.idToUnFollow } },
            { new: true, upsert: true }
        )
        if(!user1){
            return res.status(400).send("utilisateur introuvable")
        }

        // retirer l'utilisateur actuel à la liste des "followers" de l'utilisateur cible
        const user2 = await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true }
        )
        if(!user2){
            return res.status(400).send("utilisateur introuvable")
        }

        res.status(200).json({user1, user2})



    }
    catch(err){
        res.status(500).json({message: err})
    }
}