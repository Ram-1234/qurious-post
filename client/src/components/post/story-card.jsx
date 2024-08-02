import React, { useContext } from "react";
import Avatar from "../../profile/avatar";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../../common/common";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/auth-context";


const StoryCard = ({ title, story, user, createdAt, id, theme,removePost,autherId }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const avatartStyle = {
    width: "45px",
    height: "45px",
  };

  const storyClicked = (id) => {
    navigate(`/single_post/${id}`);
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
      <div className="story_card">
        <div className="user_profile d-flex align-items-center mb-2">
          <Avatar
            url=""
            title={(user?.username && user.username.slice(0, 1)) || "U"}
            propsStyle={avatartStyle}
          />
          <h5 className="user_name_story m-1 mt-0 mb-0">
            {user?.username || "User"}
          </h5>
          <p className="created_at_story m-1 mt-0 mb-0">
            {timeFormat(createdAt, "MM DD, YY HH:MM:SS EN")}
          </p>
        </div>
        <div className="user_story">
          <h1 className="story_title mb-2" onClick={() => storyClicked(id)}>{title || "What is react"}</h1>
          {theme?.length ? (
            <img
              src={theme}
              alt="theme"
              style={{ width: "100%", height: "350px", objectFit: "cover" }}
            />
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
