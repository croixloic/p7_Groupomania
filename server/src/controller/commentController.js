const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const db = require('../db');
const Comment =  db.comment;
const Post = db.posts;

exports.createComment = async (req, res, next) => {

    const post = await Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
        if (!post) {
            return res.status(401).json({ message: "post introuvable"});
        }
    })

    const comment = {
        content : req.body.content,
        userId: req.auth.userId,
        postId: req.params.id,
    }
        Comment.create(comment)
        .then(() => res.status(201).json({ message: "Publication crée"}))
        .catch((error) =>res.status(400).json({ error }))
    }

    exports.getAllComment = (req, res, next) => {
        const postId = req.params.id

        Comment.findAll({ 
            order: [['date', 'DESC']], 
            where: { postId: postId }, 
            include: { model: db.users, as: "user" } 
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Impossible d\'afficher tous les commentaires', error })})
        }

    exports.modifyComment = (req, res, next) => {
        const id        = req.params.id
        // const postId    = req.params.id
         const userId    = req.auth.userId
    
        const updateComment = {
            content: req.body.content
        }
    
        Comment.update(updateComment, {
            where: {
                id:         id,
                // postId:     postId,
                 userId:     userId
            }
        })
        .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ message: 'Impossible de modifier ce commentaire', error })
        })
    }

    exports.deleteComment = (req, res, next) =>{
        Comment.findOne({ where: { id: req.params.id , userId: req.auth.userId}})
        .then((comment) => {
    
            Comment.destroy({ where: { id: req.params.id}})
            .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
            .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error })
        });
        };