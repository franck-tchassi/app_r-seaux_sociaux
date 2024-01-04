const postModel = require('../models/post.model')
const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId


module.exports.readPost = (req, res)=>{
    PostModel.find((err, docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log("error to get data:" + err)
        }
    })   
}

module.exports.createPost = async(req, res)=>{
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try{
        const post = await newPost.save()
        res.status(201).json(post)
    }catch(err){
        res.status(400).send(err)
    }
    
}

module.exports.updatePost = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID invalide:" + req.params.id )  

    try{
        const updateRecord = {
            message: req.body.message
        }
        const updatePost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$set: updateRecord},
            {new: true},
            
        ) 
        if(updatePost){
            res.send(updatePost);
        }
        else{
            console.log("Le post n'a pas été trouvé");
            res.status(404).send("Le post n'a pas été trouvé");
        } 
       
    }
    catch(err){
        console.log("Erreur de mise à jour du post:", err);
        res.status(400).send("update error")
    }
}



module.exports.deletePost = async(req, res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID invalide:" + req.params.id ) 
    
    try{
        
        const suprimePost = await PostModel.findByIdAndDelete(req.params.id).exec()
        if(suprimePost){
            res.status(200).send("post supprimer");
        }
        else{
            console.log("Le post n'a pas été supprimé");
            res.status(404).send("Le post n'a pas été supprimer");
        }
    }
    catch(err){
        console.log("Erreur de mise à jour du post:", err);
        res.status(400).send(" error")
    }  
}


/*module.exports.likePost = async (req, res)=>{
   if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID invalide:" + req.params.id )
    
    try{
        const likePost1 = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likers: req.body.id}},
            { new: true }
        );
        if(!likePost1)
            console.log('Like Post 1:', likePost1);
            res.status(400).send("le poste n'est pas like")
            
            
        const likePost2 = await PostModel.findByIdAndUpdate(
            {_id: req.body.id},
            {$addToSet: {likes: req.params.id}},
            { new: true}
        );
        if(!likePost2)
            console.log('Like Post 2:', likePost2);
            res.status(400).send("le poste n'est pas liker")
        
        
        res.status(200).json({likePost1, likePost2})
    }
    catch(err){
        res.status(400).send("message:" + err)
    }
}
module.exports.likePost = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id))
         return res.status(400).send("ID invalide:" + req.params.id )
     
    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likers: req.body.id}},
            { new: true },
            (err, docs)=>{
                if(err) res.status(400).send(err)
            }
        );
        await PostModel.findByIdAndUpdate(
            req.body.id,
            {$addToSet: {likes: req.params.id}},
            { new: true},
            (err, docs)=>{
                if(!err) res.send(docs)
                else return res.status(400).send(err)
            }
        );     
         
    }
    catch(err){
        res.status(400).send(err)
     }
 }*/
module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID invalide : " + req.params.id);
    }

    try {
        const postId = req.params.id;
        const userId = req.body.id;

        const post1 = await PostModel.findById(postId);

        if (!post1) {
            return res.status(404).send("Post non trouvé");
        }

        // Ajouter l'utilisateur à la liste des likers
        if (!post1.likers.includes(userId)) {
            post1.likers.push(userId);
            await post1.save();
        } else {
            return res.status(400).send("L'utilisateur a déjà liké ce post");
        }

        const post2 = await PostModel.findById(userId);

        if (!post2) {
            return res.status(404).send("Post non trouvé");
        }

        // Ajouter le post à la liste des likes
        if (!post2.likes.some(like => like.equals(postId))) {
            post2.likes.push(postId);
            await post2.save();
        } else {
            return res.status(400).send("L'utilisateur a déjà liké ce post");
        }

        // Optionnel : Mettre à jour d'autres informations, par exemple, le nombre total de likes

        res.status(200).json(post1, post2);
    } catch (err) {
        res.status(500).send("Erreur lors du like du post : " + err);
    }
};

module.exports.unLikePost = async (req, res)=>{
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.params.idToLikes))
         return res.status(400).send("ID invalide:" + req.params.id )
     
     try{
        const likePost1 = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {likers: req.body.id}},
            { new: true }
        );
        if(!likePost1)
            console.log('Like Post 1:', likePost1);
            res.status(400).send("le poste n'est pas like")
            
            
        const likePost2 = await PostModel.findByIdAndUpdate(
            req.body.id,
            {$pull: {likes: req.params.id}},
            { new: true}
        );
        if(!likePost2)
            console.log('Like Post 2:', likePost2);
            res.status(400).send("le poste n'est pas liker")
        
        
        res.status(200).json({likePost1, likePost2})
         
     }
     catch(err){
         res.status(400).res("message:" + err)
     }
}




module.exports.commentPost = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send("ID invalide:" + req.params.id );

        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.id,
                        commenterSpeudo: req.body.commenterSpeudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true }
        );

        return res.send(updatedPost);
    } catch (err) {
        console.error(err);
        return res.status(400).send("Erreur lors de la mise à jour du post : " + err);
    }
};


module.exports.editCommentPost = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send("ID invalide:" + req.params.id);

        const post = await PostModel.findById(req.params.id);

        if (!post) {
            return res.status(404).send("Post non trouvé");
        }

        const theComment = post.comments.find((comment) =>
            comment._id.equals(req.body.commenterId)
        );

        if (theComment) {
            theComment.text = req.body.text;
            const updatedPost = await post.save();
            return res.status(200).send(updatedPost);
        }
        return res.status(404).send("Commentaire non trouvé");
        

        
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de la mise à jour du post : " + err);
    }
};


module.exports.deleteCommentPost = async (req, res)=>{
    if (!ObjectID.isValid(req.params.id))
            return res.status(400).send("ID invalide:" + req.params.id );
    try{
        const deleteComPost = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commenterId,
                        
                    }
                }
            },
            { new: true }
        );

        return res.send(deleteComPost);
    } catch (err) {
        console.error(err);
        return res.status(400).send("Erreur lors de la mise à jour du post : " + err);
    }
    
}