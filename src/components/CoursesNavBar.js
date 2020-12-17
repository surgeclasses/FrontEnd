import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from './Card'
import './CoursesNavBar.css'
import { FaChalkboardTeacher } from "react-icons/fa";


const  CoursesNavBar=(props)=>{

    const history = useHistory();
    const courseId = props.cid;
    const title=props.title;
    const description=props.description;
    const instructor=props.instructor;

    const coursePath=()=>{
        history.push("/CourseDetails/" + courseId);
    }

    return (
    
        <li onClick={coursePath}>
         <Card className="cardcoursehover">
         <div className="cardcontent-hover">
         <div className="contents">
          <h4>{title}</h4>
          <p>{description}</p>
          <h6><FaChalkboardTeacher className="instructor-icon" /> {instructor}</h6>
          </div>
          </div>
         </Card>
        </li>    
    
    )
}

export default CoursesNavBar;
