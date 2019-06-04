const express = require("express");
const router = express.Router({mergeParams: true});

const {createComment, getComments} = require("../handlers/comment");


router.route("/").post(createComment);
router.route("/allcomments").get(getComments);

module.exports = router;