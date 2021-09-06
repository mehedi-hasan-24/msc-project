import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import { fetchUserInfo } from "../redux/AuthSlice";
import { COMPLETED, FAILED, IDLE, PENDING } from "../redux/requestStatusType";

const AuthRoutes = (props) => {
  const { component: Component, ...rest } = props;
  const { isAuthenticated, status } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isRequestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (status === IDLE) {
      setRequestSent(true);
      // dispatch(fetchUserInfo());
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/dashboard");
    } else if ([COMPLETED, FAILED].includes(status)) {
      setRequestSent(false);
    }
  }, [status]);

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? <div>Loading</div> : <Component />)}
    />
  );
};

export default AuthRoutes;
