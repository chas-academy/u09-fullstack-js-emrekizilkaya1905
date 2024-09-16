import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <>
      <div className="flex-1 flex flex-col items-center mt-4">
        <form
          className="flex flex-col gap-6 w-full max-w-xs"
          onSubmit={handleSubmit}
        >
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
            Update User
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
