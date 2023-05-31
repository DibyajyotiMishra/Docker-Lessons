const router = require("express").Router();
const postControllers = require("../controllers/post.controller");
const checkAuth = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(postControllers.getAllPosts)
  .post(checkAuth, postControllers.createPost);

router
  .route("/:id")
  .get(postControllers.getAPost)
  .patch(checkAuth, postControllers.updatePost)
  .delete(checkAuth, postControllers.deletePost);

module.exports = router;
