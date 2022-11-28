const express = require("express")
const router = express.Router();

const Post = require('../schemas/post.js')

router.get('/', async (req, res) => {

  const posts = await Post.find({})

  return res.json(posts)

})

router.get('/:postsId', async (req, res) => {

  const postsId = req.params;
  const posts = await Post.find({})

  res.json({ "posts": posts.filter(post => post.postsId == postsId.postsId) })
})

router.post('/', async (req, res) => {

  const { postsId, title, context, userId, password, createdAt } = req.body;

  const post = await Post.find({ postsId })
  if (post.length) {
    return res.send('이미 존재하는 포스트 입니다.');
  }

  const createPost = await Post.create({ postsId, title, context, userId, password, createdAt })

  res.json({ post: createPost })
})

router.put('/:postsId', async (req, res) => {

  const params = req.params
  const { postsId, title, context, userId, password } = req.body;

  const post = await Post.findOne(
    { postsId: params.postsId }
  )

  if (post && (password == post.password)) {
    await Post.updateOne({ postsId: postsId }, { $set: { postsId: postsId, title: title, context: context, userId: userId } })
    res.send('업뎃 완료')
  } else {
    res.send('없는 아이디랑게?')
  }

})

router.delete('/:postsId', async (req, res) => {
  const params = req.params
  const existPost = await Post.findOne({ postsId: params.postsId })

  if (existPost) {
    await Post.deleteOne({ postsId: params.postsId });
    res.send('삭제 성공')
  } else {
    res.send('존재하지 않는 게시물이군여')
  }
})

module.exports = router;