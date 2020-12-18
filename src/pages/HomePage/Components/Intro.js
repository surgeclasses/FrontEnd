import React,{useState,useEffect,useHistory} from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./intro.css"
import {useHttpClient} from '../../../hooks/http-hook'
import CoursesNavBar from "../../../components/CoursesNavBar";

const content = [
  {
    title: "Surge Classes is here",
    description:
      "The place to learn and gain experience in various technologies",
    // image: "https://i.imgur.com/ZXBtVw7.jpg"
    image: "https://i.imgur.com/DCdBXcq.jpg"
  },
  {
    title: "Data Science specialization",
    description:
      "some description here",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Krishna Swamy Jalla",
    userProfile: "https://i.imgur.com/0Clfnu7.png"
  },
  {
    title: "Full Stack development",
    description:
      "some description here",
    button: "Discover",
    image: "https://i.imgur.com/DvmN8Hx.jpg",
    user: "Priyank Shrivastava",
    userProfile: "https://i.imgur.com/0Clfnu7.png"
  }
];




const Intro = () => {

  
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        setLoadedTechnologies(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTechnologies();
  }, []);


  return (
    <div className="top" > {/* style={{backgroundImage: `url('https://i.imgur.com/DvmN8Hx.jpg')`}}> */}
        <div class="bg-text">
          <div class="course-hover-nav">
          <nav>
          <ul class="nav">
            
            <li><a>Courses</a>
              <ul>
              {loadedTechnologies && loadedTechnologies.map((item, index) => (
                <li 
                  key={index} 
                >
                <a>{item.title}</a>
                <ul>
                    {item.courses.map(p=>
                      <CoursesNavBar 
                        title={p.title}
                        description={p.description}
                        instructor={p.instructor}
                        cid={p.cid}/>
                     
                      )}
                </ul>
              </li>
              ))}
             </ul>
            </li>
          </ul>
        </nav>
          </div>
          <div className="homeBanner-Text">
          <h1>Surge Classes is here</h1>
          <h3>
            Surge Classes is here. The place to learn and gain experience in various technologies
          </h3>
          </div>
          
        </div>
        <div>
          {/* <h1>Surge Classes is here</h1> */}
          {/* <h3>
          Surge Classes is here. The place to learn and gain experience in various technologies
          </h3> */}
          {/* <Slider className="slider-wrapper">
            {content.map((item, index) => (
              <div
                key={index}
                className="slider-content"
                // style={{ backgroundImage: `url(${require(${item.image})})`}}>
                style={{ backgroundImage: `url('${item.image}')`,width:'100%', height:'31rem' }} 
                // style={{ background: `url('${item.image}') no-repeat center center` }} 
              >
                <div className="inner">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  {item.button && <button>{item.button}</button>}
                </div>
                <section>
                  {item.user && <img src={item.userProfile} alt={item.user} />}
                  {item.user && <span>
                    Instructor<strong>{item.user}</strong>
                  </span>}
                </section>                
              </div>
            ))}
          </Slider> */}
        </div>
    </div>
  );
};

export default Intro;
