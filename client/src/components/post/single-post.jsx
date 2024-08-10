import React, { useContext, useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import Avatar from "../../profile/avatar";
import { timeFormat } from "../../common/common";
import "./style.css";
import { themeStyle } from "../../common/common";
import { AuthContext } from "../../context/auth-context";
import Footer from "../footer";
import Loader from "../loader/loader";


const SingleFullPost = () => {
  let [storyData, setStory] = useState(null);
  let [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { currentUser,loading, setLoading } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true)
      let data = await apiRequest.get(`/post/${params?.id}`);
      if (data.status === 200) {
        let userRes = await apiRequest.get(`/users/${data.data.post.authorId}`);
        if (userRes.status === 200) {
          setUserData(userRes.data);
        }
        setStory(data.data.post);
        setLoading(false)
      }
    })();
  }, [params.id]);

  const editHandler=()=>{
    navigate('/create_post',{state:{...storyData}});
  }

  let LikeElement = ()=>{
        return (
              <div className="d-flex align-content-center justify-content-between">
                <div className="left">
                  <i className="bi single_post_icon bi-chat-dots"></i>
                  <i className="bi single_post_icon bi-hand-thumbs-up"></i>
                  <i className="bi single_post_icon bi-bookmark-plus"></i>
                </div>
                <div className="right">
                  <i className="bi single_post_icon bi-play-circle"></i>
                  {userData?.id !== currentUser?.id && <i className="bi single_post_icon bi-file-arrow-up"></i>}
                  {userData?.id === currentUser?.id && <i className="bi single_post_icon bi-pencil-square" onClick={editHandler}></i>}
                  <i className="bi single_post_icon bi-three-dots"></i>
                </div>
              </div>
        )
  }

  return (
    <>
     {!loading ? <div className="conatiner w-75 ps-5 pe-5 mx-auto">
        <div className="single_post_user_info d-flex align-items-center">
          <Avatar
            title={userData?.username.slice(0, 1)}
            propsStyle={{ border: "2px solid #717171" }}
            propsTitleStyle={{
              fontSize: "1.85rem",
              color: "#656565",
              fontFamily: "sans-serif",
            }}
          />
          <div className="m-3 m-1">
            <h6 className="m-1 single_post_username mt-0 mb-0">
              {userData?.username || "User"}
            </h6>
            <p className="m-1 mt-0 mb-0">
              {timeFormat(userData?.createAt, "MM DD, YY HH:MM:SS EN")}
            </p>
          </div>
        </div>
        <div>
          <hr className="" />
          <LikeElement/> 
          <hr className="" />
        </div>
        <h3 className="single_post_title">{storyData?.title || "Title"}</h3>
        {storyData?.theme?.length ? (
          <img src={storyData?.theme} alt="theme" style={themeStyle} />
        ) : null}
        <p className="single_post_story">{storyData?.story || "Story..."}</p>

        <div className="bottom_style">
          <LikeElement/>
        </div>
      </div>:<Loader/>}
      {!loading && <Footer/>}
    </>
  );
};

export default SingleFullPost;
