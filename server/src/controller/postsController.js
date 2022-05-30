const express = require('express');
const jwt = require('jsonwebtoken')
const db = require('../db'); 
const Post = db.posts;
const User = db.users


exports.createPost = (req, res, next) => {
    // const token = req.headers.authorization.split(" ")[1];
    // const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET" );
    // const userId = decodedToken.userId;
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
            res.status(200).json(post)
        })
        .catch((error) => {
            res.status(500).json( error )
        })
    
};