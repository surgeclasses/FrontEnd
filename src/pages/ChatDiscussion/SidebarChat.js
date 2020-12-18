import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Chat from './Chat';

const SidebarChat = ({userinfo}) => {

   
    return (
             <Link to={`/chat/redirecting/${userinfo.roomid}`}>
            <div className = "sidebarChat" >
                <Avatar 
                    src = "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
                    alt = "Raman Avatar"
                />
                <div className = "sidebarChat__info">
                    <h2>{userinfo.userName}</h2>
                    <p>{userinfo.lastMessageValue}</p>
                    
                </div>
            </div>
            </Link>
        
    )
}

export default SidebarChat
