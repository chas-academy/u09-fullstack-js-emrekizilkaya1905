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
export const editComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment can not found"));
    }
    if (comment.userId !== request.user.id && !request.user.isAdmin) {
      return next(errorHandler(404, "You are not allowed to edit."));
    }
    const editedComment = await Comment.findByIdAndUpdate(
      request.params.commentId,
      {
        content: request.body.content,
      },
      { new: true }
    );
    response.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (request, response, next) => {
  try {
    const comment = await Comment.findById(request.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (comment.userId !== request.user.id && !request.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment.")
      );
    }

    await Comment.findByIdAndDelete(request.params.commentId); // Yorumu sil
    response.status(200).json({ message: "Comment has been deleted." });
  } catch (error) {
    next(error);
  }
};
