import React, { useContext, useState, useEffect } from "react";

import "./Enquiries.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Card from "../../../components/Card";
import checkIcon from "../../../assets/check-icon.png";

const Enquiries = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEnquiries, setLoadedEnquiries] = useState();

  useEffect(() => {
    const fetchAllEnquiries = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/enquiry"
        );
        if (!isLoading) setLoadedEnquiries(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEnquiries();
  }, []);

  const markContacted = async (id) => {
      console.log("Click Method Called:" +id);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/enquiry/${id}`,
        "PATCH",
        JSON.stringify({
            temp: 'temp'
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      {loadedEnquiries && (
        <ul className="course-list">
          {loadedEnquiries.map((enquiry) => {
            return (
              <li className="edit-course-card" onClick={() => markContacted(enquiry._id)}>
                <Card>
                  <div className="items-left">
                    <p>{enquiry.name}</p>
                    <p>{enquiry.email}</p>
                    <p>{enquiry.mobile}</p>
                    <p>{enquiry.course}</p>
                  </div>
                  {enquiry.isContacted && (
                    <img className="check-icon" src={checkIcon} />
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Enquiries;
