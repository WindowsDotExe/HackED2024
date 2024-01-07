import React from 'react';

const CommentComponent = ({ authorName, content, date }) => {
    return (
        <div className="comment">
            <strong>{authorName} - {date}</strong>
            <p>{content}</p>
        </div>
    );
};

export default CommentComponent;