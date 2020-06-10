import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import List from "../../../components/List";

//Use this method to call api and fetch the list of technologies
const HotTechnologies = () => {
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        setLoadedTechnologies(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTechnologies();
  }, []);

  return (
    <div>
      <h3 className="section-title">Hot Technologies</h3>
      {loadedTechnologies && <List items={loadedTechnologies} />}
    </div>
  );
};

export default HotTechnologies;
