import React from 'react';
import './title.css';

const Title = ({ name, children }) => {
    return (
        <div className="title">
            {children}
            <span>{name}</span>
        </div>
    )
}

export default Title
