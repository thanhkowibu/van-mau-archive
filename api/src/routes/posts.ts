import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  searchPosts,
  updatePost,
} from "../controllers/posts";
import { authorizeToken } from "../middleware/authorizeToken";

const router = express.Router();

router.get("/", getPosts);

router.post("/", authorizeToken, addPost);

router.delete("/:id", authorizeToken, deletePost);

router.put("/:id", authorizeToken, updatePost);

router.get("/protected", authorizeToken, (req, res) => {
  res.status(200).json("This is a protected route");
});

router.post("/search", searchPosts);

export default router;
