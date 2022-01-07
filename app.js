const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const Photo = require('./models/Post');
const Post = require('./models/Post');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/clean-blog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//Template Engine
app.set('view engine', 'ejs');
//Template Engine

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
  const post = await Post.find({});
  res.render('index', {
    post,
  });
});

app.get('/post/:id', async(req, res) => {
  const posta = await Post.findById(req.params.id);
  res.render('post', {
    posta,
  });
});


  app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.render('index');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
  });