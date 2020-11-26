import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from './Card'
import './CoursesNavBar.css'


const  CoursesNavBar=(props)=>{

    const history = useHistory();
    const courseId = props.cid;
    const title=props.title;
    const description=props.description;

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
          </div>
          </div>
         </Card>
        </li>    
    
    )
}

export default CoursesNavBar;
