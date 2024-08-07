import { Request, Response } from "express";
import {
  serviceCreatePost,
  serviceDeletePost,
  serviceGetPosts,
  serviceSearchPosts,
  serviceUpdatePost,
} from "../services/postsServices";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const data = await serviceGetPosts();
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addPost = async (req: Request, res: Response) => {
  // @ts-ignore
  const userInfo = req.user as { id: number };
  const { content, tags } = req.body;
  try {
    await serviceCreatePost(content, tags, userInfo.id);
    res.status(200).json("Posted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  // @ts-ignore
  const userInfo = req.user as { id: number };
  const { id } = req.params;
  try {
    await serviceDeletePost(parseInt(id), userInfo.id);
    res.status(200).json("Deleted successfully");
  } catch (err) {
    res.status(403).json(err);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  // @ts-ignore
  const userInfo = req.user as { id: number };
  const { id } = req.params;
  const { content, tags } = req.body;
  try {
    await serviceUpdatePost(parseInt(id), content, tags, userInfo.id);
    res.status(200).json("Updated successfully");
  } catch (err) {
    res.status(403).json(err);
  }
};

export const searchPosts = async (req: Request, res: Response) => {
  const { searchTerm, searchTags } = req.body;

  if (!searchTerm && (!searchTags || searchTags.length === 0)) {
    return res
      .status(400)
      .json({ error: "Both searchTerm and searchTags cannot be empty" });
  }

  try {
    const data = await serviceSearchPosts(searchTerm, searchTags);
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};
