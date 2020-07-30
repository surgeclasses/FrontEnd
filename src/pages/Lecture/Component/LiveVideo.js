import React from "react";

import "./LiveVideo.css";
import Chat from "./Chat";

const LiveVideo = (props) => {
  const videoList = props.course.videoUrl;

  return (
    <div className="video-section">
      <div>
        <iframe
          className="video-player"
          src="https://www.youtube.com/embed/live_stream?channel=UCevoqP6XZLKHgI6szAfaeRw"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <h3 className="video-title">Title and Description of Video</h3>
    </div>
  );
};

export default LiveVideo;
