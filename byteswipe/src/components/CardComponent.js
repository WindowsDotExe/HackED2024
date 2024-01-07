import React, { useState } from 'react';

function CardComponent({ heading, content, url, onAudioPlay }) {
  return (
    <div className="card">
      <strong>{heading}</strong>
      <hr/>
      <p>{content}</p>
      <button className="audio" onClick={onAudioPlay}>Play Audio</button>
      <a href={url}>Read Full Article</a>
    </div>
  );
}
export default CardComponent;