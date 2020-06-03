import React from 'react';

import BlogItemCard from '../../../components/BlogItemCard';

import './BlogItem.css';

const BlogItem = (props) => {
    return (
        <li className="blog-item">
            <BlogItemCard>
                <h4>{ props.title }</h4>
                <p>{ props.metadata }</p>
            </BlogItemCard>
        </li>
    );
};

export default BlogItem