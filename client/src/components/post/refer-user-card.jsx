import React from "react";
import {timeFormat} from "../../common/common.js";
import Avatar from "../../profile/avatar";
import { useNavigate } from 'react-router-dom';

const RecommendUserCard = ({ id, username, createdAt,user }) => {
  const navigate = useNavigate();

  const handleClickEvent=()=>{
    navigate(`/user_post_profile/${id}`,{state:{user}})
  }

  return (
    <div key={id} onClick={handleClickEvent} className="d-flex align-items-start">
      <Avatar title={username.slice(0,1)} propsStyle={{width:"35px", height:"35px"}} />
     <div className="ms-2"> 
      <h4 className="recommend_username">{username}</h4>
      <p className="recommend_user_date">{timeFormat(createdAt, "WW MM DD YY")}</p>
     </div>
    </div>
  );
};

export default RecommendUserCard;
