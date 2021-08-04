import React, { useState, useEffect } from 'react';
import Images from './images';
import Dropdowns from './Dropdowns';
import { FaStar, FaFacebookSquare, FaTwitterSquare, FaPinterestSquare, FaCheckCircle } from 'react-icons/fa';
import Stars from '../Shared/StarRating.jsx';
import Tracker from '../Shared/Tracker.jsx';

var Hub = (props) => {
  const [currentStyle, currentStyleUpdate] = useState(props.styles.results[0]);

  const styleSelect = {
    borderRadius: '100px',
    border: '2px solid black',
    height: '75px',
    width: '75px',
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
  const linkStyle = {
    margin: '10px',
    float: 'left',
    display: "table-cell"
  }

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

  var seeAllReviews = (e) => {
    document.getElementById("reviews").scrollIntoView();s
    Tracker('seeAllReviews', 'OverView');
  }

  return (
    <div style={{height: '770px'}}>
      <div style={moveToRight}>
        <div>
          <Stars rating={props.reviewMeta}/>
          <div onClick={seeAllReviews}>
            Read All {props.reviewCount} Reviews
          </div>
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
            if (currentStyle.name === current.name) {
              return (
                <div style={{width: '90px', height: '90px', margin: '5px'}} key={index}>
                  <div style={{float: 'left', maxHeight: '16px', maxHeight: '16px'}}>
                    <FaCheckCircle />
                  </div>
                  <img style={styleSelect} src={current.photos[0].thumbnail_url}  onClick={() => { newCurrent(current) }}></img>
                </div>
              )
            } else {
              return (
                <div style={{width: '90px', height: '90px', margin: '5px'}} key={index}>
                  <img style={styleSelect} src={current.photos[0].thumbnail_url}  onClick={() => { newCurrent(current) }}></img>
                </div>
              )
            }
          })}
        </div>
        <div>
          <Dropdowns currentStyle={currentStyle}/>
        </div>
        <div style={{maxWidth: '400px', maxHeight: '50px'}} key="fb">
          <a style={linkStyle} href="https://www.facebook.com/" target="_blank">
            <FaFacebookSquare size={30} color="black"/>
          </a>
          <a style={linkStyle} href="https://www.twitter.com/" target="_blank" key="twtr">
            <FaTwitterSquare size={30} color="black"/>
          </a>
          <a style={linkStyle} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" key="pin">
            <FaPinterestSquare size={30} color="black"/>
          </a>
        </div>
      </div>
      <div>
        <Images chosenStyle={currentStyle}/>
      </div>
    </div>
  )
};

export default Hub;
