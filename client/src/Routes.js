import axios from "axios";
import React, { useEffect } from "react";

const Routes = () => {
  useEffect(() => {
    axios.get("http://localhost:3001/").then(function (response) {
      // handle success
      console.log(response.data);
    });
  }, []);
  return <div>Component!</div>;
};

export default Routes;
