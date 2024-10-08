import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../Models/user.model.js";
import { parse } from "dotenv";

export const test = (request, response) => {
  response.json({ message: "Api is working" });
};

export const updateUser = async (request, response, next) => {
  if (!request.user.isAdmin && request.user.id !== request.params.userId) {
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
    if (request.body.isAdmin !== undefined && !request.user.isAdmin) {
      return next(errorHandler(403, "Only admins can change admin status."));
    }
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
          isAdmin: request.body.isAdmin,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    response.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response, next) => {
  if (!request.user.isAdmin && request.user.id !== request.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete the user"));
  }
  try {
    await User.findByIdAndDelete(request.params.userId);
    response.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const signout = (request, response, next) => {
  try {
    response
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out.");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (request, response, next) => {
  if (!request.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create user."));
  }
  const { username, email, password } = request.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    response.json("User created.");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (request, response, next) => {
  try {
    const user = await User.findById(request.params.userId);
    if (!user) {
      return next(errorHandler(404, "User can not found!"));
    }
    const { password, ...rest } = user._doc;
    response.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
