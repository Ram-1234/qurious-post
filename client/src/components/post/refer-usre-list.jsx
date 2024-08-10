import React, { useContext } from "react";
import RecommendUserCard from "./refer-user-card";
import { AuthContext } from "../../context/auth-context";
import Footer from "../footer";


const RecommendeUsers = ({ users }) => {
  const {currentUser} = useContext(AuthContext);

  return (
      <div className="recommend-users mt-3">
        {users &&
          users?.map((item) => {
            if(item.username===currentUser.username){
              return;
            }
            return (
              <RecommendUserCard
                key ={item.id}
                username={item?.username}
                createdAt={item?.createAt}
                id={item.id}
                user={item}
              />
            );
          })}
      </div>
  );
};

export default RecommendeUsers;
