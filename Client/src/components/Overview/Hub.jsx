import React, { useState, useEffect } from 'react';
import Images from './images';
import Dropdowns from './Dropdowns';
import { FaStar, FaFacebookSquare, FaTwitterSquare, FaPinterestSquare, FaCheckCircle } from 'react-icons/fa';
import Stars from '../Shared/StarRating.jsx';
import Tracker from '../Shared/Tracker.jsx';

var Hub = (props) => {
  const [currentStyle, currentStyleUpdate] = useState(props.styles.results[0]);

  useEffect (() => {
    props.styles.results.forEach((aStyle) => {
      if (aStyle['default?'] === true) {
        currentStyleUpdate(aStyle);
      }
    });
  }, [props.styles]);

  const newCurrent = (styleCurrent) => {
    currentStyleUpdate(styleCurrent);
    Tracker('Select style', 'Overview')
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
          <div className='redText'>{currentStyle.sale_price}</div>
          <div className='lineThrough'>{currentStyle.original_price}</div>
        </div>
      )
    } else {
      return (
        <div>{currentStyle.original_price}</div>
      )
    }
  }

  var seeAllReviews = (e) => {
    document.getElementById("reviews").scrollIntoView();
    Tracker('seeAllReviews', 'OverView');
  }

  return (
    <div className='productInfoContainer'>
      <div className='moveToRight'>
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
        <div className='styleFlex'>
          {props.styles.results.map((current, index) => {
            if (currentStyle.name === current.name) {
              return (
                <div className='styleSelectorIndividual' key={index}>
                  <div className='checkmark'>
                    <FaCheckCircle />
                  </div>
                  <img className='styleSelect' src={current.photos[0].thumbnail_url}  onClick={() => { newCurrent(current) }}></img>
                </div>
              )
            } else {
              return (
                <div className='styleSelectorIndividual' key={index}>
                  <img className='styleSelect' src={current.photos[0].thumbnail_url}  onClick={() => { newCurrent(current) }}></img>
                </div>
              )
            }
          })}
        </div>
        <div>
          <Dropdowns currentStyle={currentStyle}/>
        </div>
        <div className='shareContainer' key="fb">
          <a className='linkStyle' href="https://www.facebook.com/" target="_blank">
            <FaFacebookSquare size={30} color="cornflowerblue"/>
          </a>
          <a className='linkStyle' href="https://www.twitter.com/" target="_blank" key="twtr">
            <FaTwitterSquare size={30} color="cornflowerblue"/>
          </a>
          <a className='linkStyle' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" key="pin">
            <FaPinterestSquare size={30} color="cornflowerblue"/>
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
