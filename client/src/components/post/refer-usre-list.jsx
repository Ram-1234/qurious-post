import React from "react";
import RecommendUserCard from "./refer-user-card";

const RecommendeUsers = ({ users }) => {
  return (
    <div className="recommend-users">
      {users &&
        users.map((item) => {
          return (
            <RecommendUserCard
              username={item.username}
              createdAt={item.createdAt}
              id={item.id}
            />
          );
        })}
    </div>
  );
};

export default RecommendeUsers;
