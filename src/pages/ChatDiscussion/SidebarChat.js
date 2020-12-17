import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core';
import Chat from './Chat';
import { Link } from 'react-router-dom';


const SidebarChat = ({userinfo}) => {

    

    return (
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
    )
}

export default SidebarChat
