const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment')
const Post = require('../schemas/post')

router.get('/', async (req, res) => {
  const comments = await Comment.find({})

  return res.json(comments);
})

router.get('/:postId', async (req, res) => {
  const params = req.params;
  const comment_list = await Comment.find({})

  console.log(comment_list)

  res.json({ "comment_list": comment_list.filter(comment => comment.postsId == params.postId) })
})

router.post('/', async (req, res) => {
  const { postsId, commentsId, context, createdAt } = req.body;

  const post = await Post.findOne({ postsId: postsId })
  if (post) {
    await Comment.create({ postsId, commentsId, context, createdAt })
    res.send('댓글 성공')
  } else {
    res.send('게시글 없음')
  }

})

router.put('/:commentsId', async (req, res) => {

  const params = req.params;
  const { commentsId, context } = req.body;

  await Post.updateOne({ commentsId: commentsId }, { $set: { context: context } })
  return res.send('변경 성공')
})

router.delete('/:commentsId', async (req, res) => {
  const params = req.params;
  const existComment = await Comment.findOne({ commentsId: params.commentsId })

  if (existComment) {
    await Comment.deleteOne({ commentsId: params.commentsId })
    res.send('삭제 성공')
  } else {
    res.send('존재하지 않는 댓글입니다.')
  }
})

module.exports = router