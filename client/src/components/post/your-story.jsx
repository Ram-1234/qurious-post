import React, { useContext, useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import StoryCard from "./story-card";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import RecommendeUsers from "./refer-usre-list";

const OurStory = () => {
  const [postData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersData, setUserData] = useState([]);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deleteStatus, setDeleteStatus]=useState(false);

  const params = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let res = await apiRequest.get(`/post/posts/${params.id}`);
        let userRes = await apiRequest.get(`/users/`);
        setUserData(userRes);
        if (userRes.status === 200) {
          setUserData(userRes.data.Users);
        }
        //console.log('res', res);
        if (res.status === 200) {
          setData(res.data.data);
          setLoading(true);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [deleteStatus]);

  const removePostHandler=async (response)=>{
    setDeleteStatus(response);
}

  let buttonStyle = { borderRadius: "20px", fontSize: "14px" };

  return (
    <div className="listitng-post container">
      <div className="row col-12">
        <div className="left col-lg-8 col-md-12">
          <div className="your-story border-bottom p-2 mt-5 mb-2">
            <div className="d-flex justify-content-between mb-3">
              <h1>Your Story</h1>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success m-3"
                  onClick={() => navigate("/create_post")}
                  style={buttonStyle}
                >
                  Write a Story
                </button>
                <button
                  className="btn btn-danger m-3"
                  onClick={() => alert("comming soon!")}
                  style={buttonStyle}
                >
                  Import a Story
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-between w-50">
              <div>Drafts</div>
              <div>Published</div>
              <div>Responses</div>
            </div>
          </div>
          <div className="list-of-stroy">
            {!!postData.length ? (
              postData?.map((item) => {
                return (
                  <StoryCard
                    autherId={item.authorId}
                    key={item.id}
                    id={item.id}
                    user={currentUser}
                    title={item.title}
                    theme={item.theme}
                    story={item.story}
                    createdAt={item.createdAt}
                    removePost={removePostHandler}
                  />
                );
              })
            ) : (
              <h4>You don't have any story!</h4>
            )}
          </div>
        </div>
        <div
          className="right col-lg-4 col-md-0"
          style={{ borderLeft: "0.5px solid lightgrey" }}
        >
          {usersData ? (
            <RecommendeUsers users={usersData} />
          ) : (
            <h4>Recommended usres</h4>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default OurStory;
