import React, { useRef, useState } from "react";

import "./VideoUpload.css";

import Button from "../../../components/Button";

const VideoUpload = (props) => {
  const filePickerRef = useRef();
  
  const pickVideoHandler = () => {
    filePickerRef.current.click();
  };

  const pickedFileHandler = (event) => {
    console.log(event.target);
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      props.fileUploadHandler(pickedFile);
      console.log(pickedFile);
    }
  };

  return (
    <div>
      <input
        id={props.id}
        name="classvideo"
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept="video/*"
        onChange={pickedFileHandler}
      />
      <Button type="button" className="button" onClick={pickVideoHandler}>
        Upload Video
      </Button>
    </div>
  );
};

export default VideoUpload;
