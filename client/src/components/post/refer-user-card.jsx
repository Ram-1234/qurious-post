import React from "react";
import {timeFormat} from "../../common/common.js";
import Avatar from "../../profile/avatar";

const RecommendUserCard = ({ id, username, createdAt }) => {
  return (
    <div key={id} className="d-flex align-items-start">
      <Avatar title={username.slice(0,1)} propsStyle={{width:"35px", height:"35px"}} />
     <div className="ms-2"> 
      <h4 className="recommend_username">{username}</h4>
      <p className="recommend_user_date">{timeFormat(createdAt, "WW MM DD YY")}</p>
     </div>
    </div>
  );
};

export default RecommendUserCard;
