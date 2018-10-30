const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var counter = 0;
const article = require('../models/article');

const db = "mongodb://bloguser:Sommar11@ds263137.mlab.com:63137/blogapp";

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if(err) {
        console.log('Funkar inte');
    }
});

router.get('/all', function(req, res){

    var ip = req.connection.remoteAddress;
    counter++;
    console.log("ip address" + ip);
    console.log("counter:" + counter);

    article.find({})
    .exec(function(err, articles) {
        if(err) {
            console.log("Error getting articles");
        } else {
           // console.log(articles);
            res.json(articles);
        }
    });
});

router.get('/articles/:id', function(req,res){
    console.log('Requsting specific article');
    article.findById(req.params.id)
    .exec(function(err, article) {
        if (err) {
            console.log('Error getting article');
        } else {
            res.json(article);
        }
    });
});

router.post('/create', function(req,res) {
    console.log('Posting an article');
    var newArticle = new article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.save(function(err, article) {
        if (err){
            console.log('Error posting article');
        } else {
           res.json(article);
        }
    });
});

router.post('/edit/:id', function(req,res) {
    console.log('Updating an article');
    
    article.findById(req.params.id)
    .exec(function(err,article) {
        if(err){
            console.log("Error updating article");
        } else {
            article.title = req.body.title;
            article.content = req.body.content;
            article.save();
            res.json(article);
        }
    })
});

router.get('/delete/:id', function(req,res){
    console.log('Deleting an article');
    article.findByIdAndRemove(req.params.id)
    .exec(function(err, article) {
        if (err) {
            console.log('Error deleting article');
        } else {
            res.json(article);
        }
    });
});

module.exports = router;