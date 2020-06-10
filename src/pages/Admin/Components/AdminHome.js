import React, { useContext, useState, useEffect } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import ModifyCourses from "../../AddCourse/Components/ModifyCourses";
import { AdminContext } from "../../../context/admin-context";

const AdminHome = () => {
//   const auth = useContext(AdminContext);
//   const [hasResult, setHasResult] = useState(false);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();

  return (
    <div className="body">
      <ModifyCourses />
    </div>
  );
};

export default AdminHome;
