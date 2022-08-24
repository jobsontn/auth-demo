import React from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
  const { user } = React.useContext(UserContext);
  console.log("Chegou! " + user);
  if (user !== null) {console.log(user); return children;}
  else if (user === null) return <Navigate to="/login" />;
  else return <>{console.log(user)}</>;
};

export default Protected;