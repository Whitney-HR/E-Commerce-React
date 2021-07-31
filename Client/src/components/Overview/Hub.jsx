import React, { useState, useEffect } from 'react';
import Images from './images';
import Dropdowns from './Dropdowns';
import { FaStar } from 'react-icons/fa'

var Hub = (props) => {
  const [currentStyle, currentStyleUpdate] = useState(props.styles.results[0]);

  const newCurrent = (styleCurrent) => {
    currentStyleUpdate(styleCurrent);
  }

  if (currentStyle.name === 'Patience') {
    props.styles.results.forEach((aStyle) => {
      if (aStyle['default?'] === true) {
        currentStyleUpdate(aStyle);
      }
    });
  }

  // props.updateStyle(currentStyle);

  const styleSelect = {
    borderRadius: '100px',
    border: '2px solid black',
    height: '75px',
    width: '75px',
    margin: '5px'
  }
  const lineThrough = {
    textDecoration: 'line-through'
  }
  const redText = {
    color: 'red'
  }
  const moveToRight = {
    maxWidth: '500px',
    float: 'right'
  }


  const styleFlex = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '400px',
    margin: '10px'
  }

  const pricePicker = () => {
    if (currentStyle.sale_price) {
      return (
        <div>
          <div style={redText}>{currentStyle.sale_price}</div>
          <div style={lineThrough}>{currentStyle.original_price}</div>
        </div>
      )
    } else {
      return (
        <div>{currentStyle.original_price}</div>
      )
    }
  }

  return (
    <div>
      <div style={moveToRight}>
        <div>
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
          <FaStar color="yellow" />
        </div>
        <div>
          <h3>{props.category}</h3>
          <h2>{props.name}</h2>
        </div>
        <div>
          {pricePicker()}
        </div>
        <h3>Styles > {currentStyle.name}</h3>
        <div style={styleFlex}>
          {props.styles.results.map((current, index) => {
            return (
              <img style={styleSelect} src={current.photos[0].thumbnail_url} key={index} onClick={() => { newCurrent(current) }}></img>
            )
          })}
        </div>
        <div>
          <Dropdowns currentStyle={currentStyle}/>
        </div>
      </div>
      <div>
        <Images chosenStyle={currentStyle}/>
      </div>
    </div>
  )
};

export default Hub;
