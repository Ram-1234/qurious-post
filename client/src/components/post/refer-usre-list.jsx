import React, { useContext } from "react";
import RecommendUserCard from "./refer-user-card";
import { AuthContext } from "../../context/auth-context";

const RecommendeUsers = ({ users }) => {
  const {currentUser,updateUser} = useContext(AuthContext);
  //console.log('users', users);
  return (
    <div className="recommend-users mt-3">
      {users &&
        users?.map((item) => {
          if(item.username===currentUser.username){
            return;
          }
          return (
            <RecommendUserCard
              username={item?.username}
              createdAt={item?.createAt}
              id={item.id}
            />
          );
        })}
    </div>
  );
};

export default RecommendeUsers;
