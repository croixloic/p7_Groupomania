const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db'); 
const Post = db.posts;
const User = db.users;
const Like = db.likes;


exports.createPost = (req, res, next) => {
    const post = {
        content: req.body.content,
        images: req.body.files,
        userId: req.auth.userId,
    }
    console.log(req.body);
    if (req.file != undefined) {
        post.images = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename}`;
    }
    Post.create(post)
    .then(() => res.status(201).json({ message: "Publication crée"}))
    .catch((error) =>res.status(400).json({ error }))
};

exports.getOnePost = (req, res, next) =>{
    Post.findOne({
        attributes: ["content", "images", "date"],})
        .then((post) =>{
            res.status(200).json(post)
        })
        .catch((error)=>{
            res.status(500).json(error)
        })
 };

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['date', 'DESC']], 
        include: 'user'})
        .then((post) => {
            res.status(200).json({post})
        })
        .catch((error) => {
            res.status(500).json( error )
        })
    
};

exports.postModify = (req, res, next) => {
    console.log(req.body);
    Post.findOne({ where: { id: req.params.id }})
    const postId = req.params.id
    const userId = req.auth.userId
    
    const postObject = req.file ? {
        ...req.body,
        images: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body }
    console.log(req.file);
    Post.update(postObject, {
        where: {
            id: postId,
            userId: userId
        }
    })
    .then(() => res.status(200).json({ message: 'Post modifié avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de modifier ce post', error }));
}



exports.deletePost = (req, res, next) =>{
    Post.findOne({ where: { id: req.params.id }})
    .then((post) => {

        Post.destroy({ where: { id: req.params.id}})
        .then(() => res.status(200).json({ message: 'post supprimé !'}))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error })
    });
    };

    exports.likePost = (req, res, next) => {
        if (req.body.likes === 1) {
            Like.updateOne ({where: { id: req.params.id }},
                {
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.auth.userId },
            })
            .then(() => res.status(200).json ({message: "Post liked"}))
            .catch((error) => res.status(400).json({error}))
        }

        //dislike
        else if (req.body.like === -1) {
            Like.create({where: { id: req.params.id }},
                {
                $inc: { likes: req.body.like++ * -1},
                $push: { usersLiked: req.auth.userId },
        })
        .then(() => res.status(200).json({message: "Post disliked"}))
        .catch((error) => res.status(400).json({ error }))
        }
        else {
            Like.findOne({ where: { id: req.params.id }})
            .then((Like) => {
                if(Like.usersLiked.includes(req.auth.userId)) {
                    Like.create ({where: { id: req.params.id }},
                        {
                        $inc: { likes: req.body.like-- },
                        $pull: { usersLiked: req.auth.userId },
                })
                .then(() => res.status(200).json({ message: "Like drop"}))
                .catch((error) => res.status(400).json({ error }))
                }
                else if (Like.userDisliked.includes(req.body.userId)) {
                    Like.create ({where: { id: req.params.id }},
                        {
                        $inc: { likes: req.body.like-- },
                        $pull: { usersLiked: req.auth.userId },
                })
                .then(() => res.status(200).json({ message: "Dislike drop"}))
                .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(400).json({ error }));
        }
      };

