import React, { useState, useEffect } from 'react';

var Hub = (props) => {
  const [currentStyle, currentStyleUpdate] = useState(props.styles.results[0]);

  const newCurrent = (styleCurrent) => {
    currentStyleUpdate(styleCurrent);
  }

  return (
    <div>
      <h3>Styles > {currentStyle.name}</h3>
      <div>
        {props.styles.results.map((current, index) => {
          return (
            <img src={current.photos[0].thumbnail_url} key={index} onClick={() => { newCurrent(current) }}></img>
          )
        })}
      </div>
    </div>
  )
};

export default Hub;
