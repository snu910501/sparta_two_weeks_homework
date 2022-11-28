const express = require('express')
const connect = require('./schemas/index');

const indexRouter = require('./routes/index')
const commentRouter = require('./routes/comments')

const app = express();
const port = 3000;

connect();

app.use(express.json())

app.get('/', (req, res) => {
  return res.send('hi')
})

app.use('/post', indexRouter);
app.use('/comment', commentRouter);



app.listen(port, () => {
  console.log(port, '번 포트로 서버가 열렸습니다. ')
})