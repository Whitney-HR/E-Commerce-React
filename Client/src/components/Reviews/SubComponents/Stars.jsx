import React from 'react';
import {ColorStar} from './Stars.styled.js';


function Stars (props) {
  let yellowStar = ([...Array(props.starCount)]);
  let whiteStar =([...Array(5-props.starCount)]);



  return (
    <p>
      {yellowStar.map((star, index)=>{return <i className="star" key={index}></i>})}
      {whiteStar.map((star, index)=>{return <i className="starWhite" key={index}></i>})}
    </p>
  )
}

export default Stars