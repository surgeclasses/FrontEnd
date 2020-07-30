import React, { useRef, useState } from "react";

import "./FileUpload.css";

import Button from "../../../components/Button";

const FileUpload = (props) => {
  const filePickerRef = useRef();

  const pickVideoHandler = () => {
    filePickerRef.current.click();
  };
  
  const pickedFileHandler = (event) => {
    if(event.target.files && event.target.files.length ===1){
        const pickedFile = event.target.files[0];
        props.fileUploadHandler(pickedFile);
        console.log(pickedFile);
    }
  };

  return (
    <div>
      <input
        id={props.id}
        name='classdocs'
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".rar,.zip,.7zip"
        onChange={pickedFileHandler}
      />
      <Button type="button" className="button" onClick={pickVideoHandler}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload;
