const express = require("express")
const router = express.Router();

const postRouter = require("./posts");

router.use('/', postRouter);

module.exports = router;