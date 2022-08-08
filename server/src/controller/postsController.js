const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db'); 
const Post = db.posts;
const User = db.users;


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
    Post.findOne({ where: {id: req.params.id},
        attributes: ["likes"]
    })
    .then((post) => {
        const userlikes = JSON.parse(post.userlikes) || []
        if (!userlikes.include (req.auth.userId)) {
            userlikes.push(req.auth.userId)
            Post.update ({ likes: post.likes++, userlikes: userlikes},
                { where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({message: "Post like"}))
            .catch((error) => res.status(400).json({error}))
        } 
        else {
            userlikes.destroy(req.auth.userId)
            Post.update({likes: post.likes--},
                {where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json ({message: "like supprimer"}))
            .catch((error)=>res.status(400).json({ error }) )
        }
    }) 
    .catch((error) => res.status(404).json({ error }) )
};

        exports.allLike = (req, res, next) => {
            Post.findAll({
                attributes: ["likes"],})
            .then((likes) => res.status(200).json(likes))
            .catch((error) => res.status(400).json({ error }))
        }

        //disPost
        // else if (req.body.disPost === 1) {
        //     Post.update({where: { id: req.params.id }},
        //         {
        //         $inc: { Posts: req.body.disPost++ },
        //         $push: { usersPostd: req.auth.userId },
        // })
        // .then(() => res.status(200).json({message: "Post unPost"}))
        // .catch((error) => res.status(400).json({ error }))
        // }
        // else {
        //     Post.findOne({ where: { id: req.params.id }})
        //     .then((Post) => {
        //         if(Post.usersPostd.includes(req.auth.userId)) {
        //             Post.create ({where: { id: req.params.id }},
        //                 {
        //                     $inc: { Posts: req.body.Post-- },
        //                 $pull: { usersPostd: req.auth.userId },
        //         })
        //         .then(() => res.status(200).json({ message: "Post drop"}))
        //         .catch((error) => res.status(400).json({ error }))
        //         }
        //         else if (Post.userDisPostd.includes(req.body.userId)) {
        //             Post.create ({where: { id: req.params.id }},
        //                 {
        //                 $inc: { Posts: req.body.disPost-- },
        //                 $pull: { usersPostd: req.auth.userId },
        //         })
        //         .then(() => res.status(200).json({ message: "unPost drop"}))
        //         .catch((error) => res.status(400).json({ error }))
        //         }
        //     })
        //     .catch((error) => res.status(400).json({ error }));
        // }

