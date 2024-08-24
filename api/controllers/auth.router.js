import User from "../Models/user.model.js";

export const signup = async (request, response) => {
  const { username, email, password } = request.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return response.status(400).json({ message: "All fields are required" });
  }
  const newUser = new User({ username, email, password });
  await newUser.save();
  response.json("Sign up succesfull");
};
