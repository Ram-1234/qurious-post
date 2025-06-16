import React from "react";
import {timeFormat} from "../../utils/common.js";
import Avatar from "../../profile/avatar";
import { useNavigate } from 'react-router-dom';

const RecommendUserCard = ({ user }) => {
  const navigate = useNavigate();
  
  const handleClickEvent=()=>{
    navigate(`/user_post_profile/${user?.id}`,{state:{user}});
  }

  return (
    <div key={user?.id} onClick={handleClickEvent} className="d-flex align-items-start">
      <Avatar url={user.avatar} title={!user.avatar && user?.username.slice(0,1)} propsStyle={{width:"45px", height:"45px"}} />
     <div className="ms-2"> 
      <h4 className="recommend_username">{user?.username}</h4>
      <p className="recommend_user_date">{timeFormat(user?.createdAt, "WW MM DD YY")}</p>
     </div>
    </div>
  );
};

export default RecommendUserCard;
