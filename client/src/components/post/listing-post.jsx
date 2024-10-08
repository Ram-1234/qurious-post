import React, { createContext, useContext, useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import StoryCard from "./story-card";
import RecommendeUsers from "./refer-usre-list";
import "./style.css";
import Loader from "../loader/loader";
import { AuthContext } from "../../context/auth-context";
import Footer from "../footer";


const ListofPosts = () => {
  const [postData, setData] = useState([]);
  const [usersData, setUserData] = useState([]);
  const [deleteStatus, setDeleteStatus]=useState(false);
  const {loading, setLoading}= useContext(AuthContext);
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let res = await apiRequest.get("/post/random_posts", {
          start: 0,
          end: 10,
        });
        let userRes = await apiRequest.get(`/users/`);
        //console.log('users resp', userRes)
        if (userRes.status === 200) {
          setUserData(userRes.data.Users);
          setLoading(false)
        }
 
        if (res.status) {
          setData(res.data.posts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [deleteStatus]);

  const removePostHandler=async (response)=>{
        setDeleteStatus(response);
  }

  return (
    <>
      <div className="listitng-post container">
        <div className="row col-12">
          <div className="left col-lg-9 col-md-12">
            <div className="select-topics d-flex justify-content-between border-bottom p-2 mt-5 mb-2">
              <div>For you</div>
              <div>iOS</div>
              <div>UX Design</div>
              <div>React</div>
              <div>Spiritual</div>
              <div>Leadership</div>
              <div>Art</div>
              <div>Web Development</div>
              <div>Lifestyle</div>
              <div>Education</div>
              <div>Coding</div>
            </div>
            <div className="list-of-stroy">
              {!loading ?
                postData?.map((item, index) => {
                  return (
                    <StoryCard
                      autherId={item.authorId}
                      key={item.id}
                      id={item.id}
                      user={item.user}
                      title={item.title}
                      story={item.story}
                      theme={item.theme}
                      createdAt={item.createdAt}
                      removePost={removePostHandler}
                    />
                  );
                }):<Loader/>}
            </div>
          </div>
          <div
            className="right col-lg-3 col-md-0"
            style={{ borderLeft: "0.5px solid lightgrey" }}
          >
            {!loading ? (
              <RecommendeUsers users={usersData} />
            ) : (
              <Loader/>
            )}
          </div>
        </div>
        <div></div>
      </div>
      {!loading && <Footer/>}
    </>
  );
};

export default ListofPosts;
