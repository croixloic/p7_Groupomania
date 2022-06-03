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
        attributes: ["content", "images", "date"],})
        .then((post) => {
            res.status(200).json({post})
        })
        .catch((error) => {
            res.status(500).json( error )
        })
    
};

exports.postModify = (req, res, next) => {
    Post.findOne({ where: { id: req.auth.userId }})
    const postId = req.params.id
    const userId = req.auth.userId
    
    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body }
    
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
    Post.findOne({ where: { id: req.auth.userId }})
    .then((post) => {

        Post.destroy({ where: { id: req.auth.userId}})
        .then(() => res.status(200).json({ message: 'post supprimé !'}))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error })
    });
    };