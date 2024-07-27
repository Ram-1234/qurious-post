import React from "react";
import "./style.css";

const CustomLoader = () => {
  return (
    <>
      <span>Loading </span>
      <img
        src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
        style={{ width: "20px", height: "20px" }}
        alt="loader"
      />
    </>
  );
};

const Loader = ({ msg = <CustomLoader /> }) => {
  return (
    <div className="loader_box">
      <p>{msg}</p>
    </div>
  );
};

export default Loader;