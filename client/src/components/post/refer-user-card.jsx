import React from "react";
import { When } from "../../helper";
import Avatar from "../../profile/avatar";

const RecommendUserCard = ({ id, username, createdAt }) => {
  return (
    <div key={id}>
      <Avatar title={username} />
      <h4>{username}</h4>
      <p>{When(createdAt)}</p>
    </div>
  );
};

export default RecommendUserCard;
