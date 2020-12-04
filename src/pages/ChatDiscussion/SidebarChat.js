import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core';
import { Link } from 'react-router-dom';


const SidebarChat = ({users}) => {

    return (
            <div className = "sidebarChat">
            <Link to={`/discussionPage/${users.email}`}>
                <Avatar 
                    src = "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
                    alt = "Raman Avatar"
                />
                <div className = "sidebarChat__info">
                    <h2>{users.name}</h2>
                    <p>This is the Last Message</p>
                </div>
                </Link>
            </div>
    )
}

export default SidebarChat
