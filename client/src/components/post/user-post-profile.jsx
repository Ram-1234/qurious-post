import React,{useState, useEffect, useContext} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import StoryCard from './story-card';
import Avatar from '../../profile/avatar';
import { AuthContext } from '../../context/auth-context';
import Loader from '../loader/loader';



const UserPostProfile = () => {
  //const [loading, setLoading]=useState();
  const [postData, setData]=useState();

  const navigate = useNavigate();
  const params = useParams();
  const {state} = useLocation();

  const {loading, setLoading}=useContext(AuthContext)


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let res = await apiRequest.get(`/post/posts/${params.id}`);
         //console.log('res', res);
        if (res.status === 200) {
          setData(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

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
            {!loading ? (
              postData?.map((item) => {
                return (
                  <StoryCard
                    autherId={item.authorId}
                    key={item.id}
                    id={item.id}
                    user={state?.user&&state?.user}
                    title={item.title}
                    theme={item.theme}
                    story={item.story}
                    createdAt={item.createdAt}
                    removePost={()=>{}}
                  />
                );
              })
            ) : (
            <Loader/>
            )}
          </div>
        </div>
        <div
          className="user-post-right col-lg-4 col-md-0"
          style={{ borderLeft: "0.5px solid lightgrey" }}
        >
        <Avatar 
          title={state?.user?.username.slice(0,1)}
        />
        <h4>{state?.user?.username}</h4>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default UserPostProfile;