import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const CreateUser = () => {
  const [formData, setFormData] = useState({});
  const [createUser, setCreateUser] = useState(null);

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill the all fields!"));
    }
    try {
      const response = await fetch("/api/user/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard?tab=users");
      }
    } catch (error) {}
  };
  console.log(formData);
  return (
    <>
      <div className="flex-1 flex flex-col items-center mt-4">
        <form
          className="flex flex-col gap-6 w-full max-w-xs"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <Label value="Username" className="text-center text-sm" />
            <TextInput
              type="username"
              placeholder="name@company.com"
              id="username"
              onChange={handleChange}
              className="w-full mt-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <Label value="Email" className="text-center text-sm" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
              className="w-full mt-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <Label value="Password" className="text-center text-sm" />
            <TextInput
              type="password"
              placeholder="*************"
              id="password"
              onChange={handleChange}
              className="w-full mt-2"
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            className="w-full mt-4"
          >
            Create User
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
