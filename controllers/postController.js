const Post = require('../models/Post');

exports.getAllPost = async (req, res) => {
  const post = await Post.find({});
  res.render('index', {
    post,
  });
};

exports.getPost = async (req, res) => {
  const posta = await Post.findById(req.params.id);
  res.render('post', {
    posta,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const posta = await Post.findOne({ _id: req.params.id });
  posta.title = req.body.title;
  posta.description = req.body.description;
  posta.save();
  res.redirect(`/post/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect(`/`);
};
