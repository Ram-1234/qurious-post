import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/auth-context";

const UpdateProfile = ({ email, username, password }) => {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: currentUser?.username,
      jobrole:currentUser?.jobrole,
      about:currentUser?.about,
      email: currentUser?.email,
      password: "",
    },
  });

  async function onSubmit(data) {
    ////console.log('profile upate', data);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, data);
      if (res.status) {
        console.log(currentUser.avatar)
        updateUser({...res.data, avatar:currentUser.avatar});
        localStorage.setItem("user", JSON.stringify({...res.data, avatar:currentUser.avatar}));
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-3 mb-3 w-50">
      <div className="col-auto">
        <label className="sr-only mb-2" htmlFor="inlineFormInputGroup">
          Username
        </label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <input
            type="text"
            {...register("username")}
            name="username"
            className="form-control"
            id="inlineFormInputGroup"
            placeholder="Username"
          />
        </div>
      </div>
      <div className="col-auto">
        <label className="sr-only mb-2" htmlFor="inlineFormInputGroup">
          Job Profile
        </label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <input
            type="text"
            {...register("jobrole")}
            name="jobrole"
            className="form-control"
            id="inlineFormInputGroup"
            placeholder="job profile"
          />
        </div>
      </div>
      <div className="col-auto">
        <label className="sr-only mb-2" htmlFor="inlineFormInputGroup">
          About
        </label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <textarea
            rows={4}
            {...register("about")}
            name="about"
            className="form-control"
            id="inlineFormInputGroup"
            placeholder="about"
          />
        </div>
      </div>
      <div className="col-auto">
        <label className="sr-only mb-2" htmlFor="inlineFormInput">
          Email
        </label>
        <input
          type="email"
          name="email"
          {...register("email")}
          className="form-control mb-2"
          id="inlineFormInput"
          placeholder="jane324@gmail.com"
          disabled
        />
      </div>
      <div className="col-auto">
        <label className="sr-only mb-2" htmlFor="inlineFormInput">
          Password
        </label>
        <input
          type="password"
          name="password"
          {...register("password")}
          className="form-control mb-2"
          id="inlineFormInput"
          placeholder="*****"
        />
      </div>
      <p>{error}</p>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-2">
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
