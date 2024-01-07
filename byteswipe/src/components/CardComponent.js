import React, { useState } from 'react';

function CardComponent({ heading, content, audio, url, }) {
  return (
    <div className="card">
      <strong>{heading}</strong>
      <hr/>
      <p>{content}</p>
      <audio controls>
        <source src={audio} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
    <a href={url}>Read Full Article</a>
    </div>

  );
};
export default CardComponent;