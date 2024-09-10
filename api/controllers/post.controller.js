import Post from "../Models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (request, response, next) => {
  if (!request.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post."));
  }
  if (!request.body.title || !request.body.content) {
    return next(errorHandler(400, "Please provide all require the fields"));
  }
  const slug = request.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Post({ ...request.body, slug, userId: request.user.id });
  try {
    const savedPost = await newPost.save();
    response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
