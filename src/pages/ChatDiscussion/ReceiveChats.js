import React, { useState,useEffect ,useContext} from 'react'
import { useHttpClient } from "../../hooks/http-hook";
import {useParams} from 'react-router-dom'

const  ReceiveChats=()=> {
   const [messages,setMessages]=useState([]);
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const email=useParams().email;
   useEffect(() => {
      const fetchMessage = async()=>{
        try {
    
          const responseData=  await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/discussionPage/${email}`,
             "GET",
              null,
             );
              setMessages(responseData.chats);
          } catch (err) {
            console.log(err);
          }
      }
      fetchMessage();
    
   }, [messages])

    return(
      
        messages.map(m=>
         (<div className={`container ${(m.creatorId._id===receiverId) && 'darker'}`}>
          <img src={`${process.env.REACT_APP_ASSET_URL}/${m.creatorId.image}`} 
            className={` ${(m.creatorId._id!==receiverId) && 'right'}`} />
          <p>{m.message}</p>
          </div>)
          )
        
       
     )
};

export default ReceiveChats

