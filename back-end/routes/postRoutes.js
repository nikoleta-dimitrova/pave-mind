const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            res.status(404).json({ message: "Cannot find this post" });
        }
    } catch (err) {
        console.log(err);
    }
    res.post = post;
    next();
}

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts)
    } catch (err) {
        res.status(500).json({ message: "Error" });
    }
})

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        comments: [],
        accountId: req.body.accountId
    })
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({message: err})
    }
})

router.get('/:id', getPost, (req, res) => {
    res.send(res.post);
})

router.put('/:id/comment', getPost, (req, res) => {
    const post = res.post;
    const newComment = {
        accountId: req.body.accId,
        comment: req.body.comment
    }
    post.comments.push(newComment);
    try {
        const newPost = post.save();
        res.status(200).json(newPost);
    } catch(err) {
        res.status(400).json({message: err})
    }
})

module.exports = router;