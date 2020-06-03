import React from 'react';

import './BlogItemCard.css';

const BlogItemCard = props => {
    return (    
        <div className={`blogitem ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default BlogItemCard;