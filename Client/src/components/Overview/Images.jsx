import React, { useState, useEffect } from 'react';

var Images = (props) => {
  //const [] = useState({})
  console.log(props.chosenStyle);
  return (
    <div>
      {props.chosenStyle.photos.map((currentPicture, index) => {
        <img src={currentPicture.thumbnail_url} key={index}></img>
      })}
    </div>
  )
};

export default Images;