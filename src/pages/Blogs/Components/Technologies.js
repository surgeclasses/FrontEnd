import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import List from "../../../components/List";
import LoadingSpinner from "../../../components/LoadingSpinner";

const technologyList = [
  {
    id: "t1",
    title: "Data Science",
  },
  {
    id: "t2",
    title: "Machine Learning",
  },
  {
    id: "t3",
    title: "Artificial Intelligence",
  },
  {
    id: "t4",
    title: "Full Stack Development",
  },
  {
    id: "t5",
    title: "VLSI",
  },
  {
    id: "t6",
    title: "Deep Learning",
  },
  {
    id: "t7",
    title: "Block Chain",
  },
  {
    id: "t8",
    title: "Neural Networks",
  },
];

//Use this method to call api and fetch the list of technologies
const Technologies = () => {
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
      <h3 className="section-title">Technologies</h3>
      {isLoading && <LoadingSpinner />}
      {loadedTechnologies && <List items={loadedTechnologies} />}
    </div>
  );
};

export default Technologies;
