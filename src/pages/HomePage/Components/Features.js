import React from 'react'

import { RiLiveFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { FaProjectDiagram } from "react-icons/fa";
import { ImOffice } from "react-icons/im";

function Features() {
    return (
        <div className="features">
            <ul>
                <li className="feature-box1">
                <RiLiveFill className="feature-icons" />
                <h1 className="feature-h1Fonts">Surge Live Classes</h1>
                <p className="feature-pFonts">• Online classes taught through video have already proven their effectiveness and preference for the vast majority of viewers.
                Through recorded classes the student is able to see and hear the teacher, facilitating the dynamics and connection that occurs in a classroom. •</p>
                </li>

                <li className="feature-box2">
                <HiUserGroup className="feature-icons" />
                <h1 className="feature-h1Fonts">Expert Instructors</h1>
                <p className="feature-pFonts">• Even with all the right information available, human involvement cannot be omitted. With our mentor support team, 
                Surge Classes offers an option to get your doubts cleared by experts and interact with a personal online instructor for any doubts you may have. •</p>
                </li>
                
                <li className="feature-box3">
                <FaProjectDiagram className="feature-icons" />
                <h1 className="feature-h1Fonts">Multiple Projects</h1>
                <p className="feature-pFonts">• Managing multiple projects presents different and additional challenges when compared with the management of a single project. 
                This acquired knowledge and skills in the areas of scope, time, cost, risk, human resources,
                 leadership, and teambuilding. •</p>
                </li>
                
                <li className="feature-box4">
                <ImOffice className="feature-icons" />
                <h1 className="feature-h1Fonts">Industry Oriented</h1>
                <p className="feature-pFonts">• Industry oriented education is an approach to learning from an industry perspective. With traditional technical teaching methodologies in educational environments,
                 the conventional pathway is to build the foundation learning through real projects enviornment. •</p>
                </li>
            </ul>
        </div>
    )
}

export default Features
