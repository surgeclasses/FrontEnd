import React from "react";
import { ImPhone, ImLocation, ImMail2 } from "react-icons/im";
import { AiFillFacebook,AiFillTwitterCircle,AiFillLinkedin,AiFillInstagram } from "react-icons/ai";


import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-contactus">
        <h3>Contact Info:</h3>
        <p><ImLocation style={{ marginRight: "0.5rem" }} />No. 15, 25Th A Main, Mariswamy Layout Agara, HSR Layout, Sector - 1 Bengaluru</p>
        <p><ImPhone style={{ marginRight: "0.5rem" }} />+91 9014089189</p>
        <p><ImMail2 style={{ marginRight: "0.5rem" }} />surgeclasses2020@gmail.com</p>
      </div>
        <div className="footer-content">
        <ul className="socials">
          <li><a href="https://www.facebook.com/"><AiFillFacebook/></a></li>
          <li><a href="https://www.twitter.com/"><AiFillTwitterCircle/></a></li>
          <li><a href="https://www.linkedin.com/"><AiFillLinkedin/></a></li>
          <li><a href="https://www.instagram.com/"><AiFillInstagram/></a></li>
        </ul>
        <p className="copyright">Copyright &copy; 2020 SurgeClasses</p>
        </div>
      </div>
  );
};

export default Footer;