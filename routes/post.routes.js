const router = require("express").Router();
const postControllers = require("../controllers/post.controllers");

router
  .route("/")
  .get(postControllers.getAllPosts)
  .post(postControllers.createPost);

router
  .route("/:id")
  .get(postControllers.getAPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

module.exports = router;
