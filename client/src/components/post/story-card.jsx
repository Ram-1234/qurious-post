import React, { useContext } from "react";
import Avatar from "../../profile/avatar";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../../utils/common";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/auth-context";
import Background from "../particles/Background";


const StoryCard = ({ title, story, user, createdAt, id, theme,removePost,autherId }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const avatartStyle = {
    width: "45px",
    height: "45px"
  };

  const storyClicked = (id, user) => {
    navigate(`/single_post/${id}`, { user });
  };

  const removePostHandler = async (id) => {
    try {
      let removePostRes = await apiRequest.delete(`/post/${id}`,{userId:currentUser});
      
      if(removePostRes.status){
        removePost(true)
      }
    } catch (error) {
      removePost(false)
      console.log(error);
    }
  };

  const removeIconStyle={fontSize:"1rem"}
  return (
    <div className="story_card_wrap">
    <Background/>
      <div className="story_card">
        <div className="user_profile d-flex align-items-center mb-2">
          <Avatar url={user?.avatar||""} title={!user?.username} propsStyle={avatartStyle} />
          <h5 className="user_name_story m-1 mt-0 mb-0">
            {user?.username || "User"}
          </h5>
          <p className="created_at_story m-1 mt-0 mb-0">
            {timeFormat(createdAt, "MM DD, YY HH:MM:SS EN")}
          </p>
        </div>
        <div className="user_story">
          <h1 className="story_title mb-2" onClick={() => storyClicked(id, user)}>{title}</h1>
          {theme?.length ? (
            <img onClick={() => storyClicked(id, user)} src={theme} className="story-banner" alt="theme" />
          ) : null}
          <p className="story_description">
            {story.length > 450
              ? story.slice(0, 450) + "..."
              : story || "evrything about react"}
          </p>
         {autherId === currentUser.id && <div className="remove_post d-flex float end mt-2 mb-2">
            <i className="bi bi-dash-circle text-danger" style={removeIconStyle} onClick={() => removePostHandler(id)}></i>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
