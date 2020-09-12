import React, { useRef } from "react";

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
      if (props.titleIndex)
        props.fileUploadHandler(pickedFile, props.titleIndex, props.topicIndex);
      else props.fileUploadHandler(pickedFile);
      console.log(pickedFile);
    }
  };

  return (
    <div className="upload-container">
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
