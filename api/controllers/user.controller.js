import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js";

export const test = (request, response) => {
  response.json({ message: "Api is working" });
};

export const updateUser = async (request, response, next) => {
  if (request.user.id !== request.params.userId) {
    return next(errorHandler(401, "You are not allowed to use this"));
  }
  if (request.body.password) {
    if (request.body.password.length < 6) {
      return next(errorHandler(401, "Password must be at least 6 characters."));
    }
    request.body.password = bcryptjs.hashSync(request.body.password, 10);
  }
  if (request.body.username) {
    if (request.body.username.length < 7 || request.body.username.length > 20) {
      return next(
        errorHandler(401, "Username must be between 7 and 20 characters.")
      );
    }
    if (request.body.username.includes(" ")) {
      return next(errorHandler(400, "Username can not contain spaces."));
    }
    if (request.body.username !== request.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (request.body.username.match(/^[a-zA-Z0-Z9] + $/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers.")
      );
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        request.params.userId,
        {
          $set: {
            username: request.body.username,
            email: request.body.email,
            profilePicture: request.body.profilePicture,
            password: request.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      response.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};
