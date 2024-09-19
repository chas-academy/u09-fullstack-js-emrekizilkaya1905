import Comment from "../Models/comment.model.js";
import { errorHandler } from "../utils/error.js";
export const createComment = async (request, response, next) => {
  try {
    const { content, postId, userId } = request.body;
    if (userId !== request.user.id) {
      return next(errorHandler(403, "You are not allowed to create an post"));
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    response.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
export const getPostComments = async (request, response, next) => {
  try {
    const comments = await Comment.find({ postId: request.params.postId }).sort(
      { createdAt: -1 }
    );
    response.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
export const likeComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment can not found"));
    }
    const userIndex = comment.likes.indexOf(request.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(request.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    response.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
