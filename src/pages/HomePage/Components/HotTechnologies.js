import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import List from "../../../components/List";

const technologyList = [
  {
    id: "t1",
    title: "Data Science",
  },
  {
    id: "t1",
    title: "Machine Learning",
  },
  {
    id: "t1",
    title: "Artificial Intelligence",
  },
  {
    id: "t1",
    title: "Full Stack Development",
  },
  {
    id: "t1",
    title: "VLSI",
  },
  {
    id: "t1",
    title: "Deep Learning",
  },
  {
    id: "t1",
    title: "Block Chain",
  },
  {
    id: "t1",
    title: "Neural Networks",
  }
];

//Use this method to call api and fetch the list of technologies
const HotTechnologies = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses"
        );
        setLoadedCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <div className="hot-technologies">
      <h3 className="section-title">Hot Technologies</h3>
      {technologyList && <List items={technologyList} />}
    </div>
  );
};

export default HotTechnologies;
