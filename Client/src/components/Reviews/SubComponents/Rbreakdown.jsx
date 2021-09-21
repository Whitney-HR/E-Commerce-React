import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');
import StarRating from '../../Shared/StarRating.jsx'



var metaUrl= 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id='


var RbreakdownStyle = {
  width: '250px',
  padding: '10px',
  // border: '2px',
  // borderStyle: 'solid',
  // borderColor: 'cornflowerblue',
}



var progress__text = {
  position: 'absolute',
  top: '50%',
  right: '5px',
  transform: 'translateY(-50%)',
  font: 'bold 14px Quicksand, sans-serif',
  color: 'white'
}

var progress = {
  borderStyle: "solid",
  borderWidth: '5px',
  borderColor: 'black',
}

var progressNoShow = {
}

function Rbreakdown(props) {
  var [rating, ratingChange] = useState();
  var [recommend, recommendChange] = useState();
  var [ratingOutline, setRetingOutline] = useState(props.renderStarRating);



  useEffect(()=>{
    axios.get(metaUrl+props.id, {
      headers: {
        Authorization: APIkey
      }
    })
    .then((data)=> {
      ratingChange(data.data.ratings)
      recommendChange(data.data.recommended)
    })
    .catch((error)=> {
      console.log('error in Rbreakdown: ', error)
    })
  }, [props.id])

  var anyFalse = (currentVal) => currentVal === false;
  var resetFilters = ratingOutline.every(anyFalse) ? (<div onClick={props.resetFiltersClick}>Reset filters</div>) : <></>

  useEffect(()=>{
    setRetingOutline(props.renderStarRating)

  }, [props.renderStarRating])






  var ratings = rating
  var ratingTotal = 0;
  var ratingAverage = 0;
  for (var keys in ratings) {
    ratingTotal += parseInt(ratings[keys])
  }
  for (var keys in ratings) {
    ratingAverage += (ratings[keys])/ratingTotal*parseInt(keys)
  }
  ratingAverage = (Math.round(ratingAverage * 100) / 100).toFixed(1);

  if (recommend) {
    var yes, no;
    if (recommend.true === undefined) {
      yes = 0
    } else {
      yes = parseInt(recommend.true)
    }
    if (recommend.false === undefined) {
      no = 0
    } else {
      no = parseInt(recommend.false)
    }
    var recommendTotal = yes+no;
    var recommendPercentage = (Math.floor(yes/recommendTotal*100))+'%';
  }

  var ratingArray = []
  var ratingCount = [0,0,0,0,0,0]

  if(rating) {
    var uno = 0
    var dos = 0
    var tres = 0
    var cuatro = 0
    var cinco = 0
    if(rating[1]) {
      uno= (Math.floor(rating[1]/ratingTotal*100));
      ratingArray.push(uno);
      ratingCount[1] = rating[1];
    }
    if(rating[2]) {
      dos= (Math.floor(rating[2]/ratingTotal*100));
      ratingArray.push(dos);
      ratingCount[2] = rating[2];
    }
    if(rating[3]) {
      tres= (Math.floor(rating[3]/ratingTotal*100));
      ratingArray.push(tres);
      ratingCount[3] = rating[3];
    }
    if(rating[4]) {
      cuatro= (Math.floor(rating[4]/ratingTotal*100));
      ratingArray.push(cuatro);
      ratingCount[4] = rating[4];
    }
    if(rating[5]) {
      cinco= (Math.floor(rating[5]/ratingTotal*100));
      ratingArray.push(cinco);
      ratingCount[5] = rating[5];
    }
  }

  var maxNum = uno;

  for (var i =1; i<ratingArray.length; i++) {
    if (maxNum < ratingArray[i]) {
      maxNum = ratingArray[i]
    }
  }

  var anyFalse = (currentVal) => currentVal === true;
  var resetFilters = ratingOutline.every(anyFalse) ? <></> : (<div className='report-Answer' onClick={props.resetFiltersClick}>Remove all filters</div>)



  if (!rating || !recommend) {
    return(
      <></>
    )
  } else {
  return (
    <div className='Rbreakdown' style={RbreakdownStyle}>
      <span style={{fontSize: 'xxx-large', float: 'left'}}>{ratingAverage}</span><StarRating rating={rating}/>

      <br></br>
      <br></br>
      <div>Based on {ratingTotal} ratings</div>
      <br></br>
      <span style={{font: 'bold 22px Quicksand, sans-serif'}}>{recommendPercentage}</span><span> of ratings recommend this product</span>
      <br></br>
      <br></br>
      <div>Rating Breakdown:</div>
      {resetFilters}

      <div className='ratingBars' style={ratingOutline[4] ? progress : progressNoShow} onClick={()=>props.filterReviewClickHandler(4)}> <span id='starText'>5 star</span>
        <div style={{width: (cinco)+'%', height: '100%', background: 'green'}}></div>
        <span style={progress__text}>{ratingCount[5]} ratings</span>
      </div>
    <br></br>

      <div className='ratingBars' style={ratingOutline[3] ? progress : progressNoShow} onClick={()=>props.filterReviewClickHandler(3)}> <span id='starText'>4 star</span>
        <div style={{width: (cuatro)+'%', height: '100%', background: 'green'}}></div>
        <span style={progress__text}>{ratingCount[4]} ratings</span>
      </div>
    <br></br>

      <div className='ratingBars' style={ratingOutline[2] ? progress : progressNoShow} onClick={()=>props.filterReviewClickHandler(2)}> <span id='starText'>3 star</span>
        <div style={{width: (tres)+'%', height: '100%', background: 'green'}}></div>
        <span style={progress__text}>{ratingCount[3]} ratings</span>
      </div>
    <br></br>
      <div className='ratingBars' style={ratingOutline[1] ? progress : progressNoShow} onClick={()=>props.filterReviewClickHandler(1)}> <span id='starText'>2 star</span>
        <div style={{width: (dos)+'%', height: '100%', background: 'green'}}></div>
        <span style={progress__text}>{ratingCount[2]} ratings</span>
      </div>
    <br></br>
      <div className='ratingBars' style={ratingOutline[0] ? progress : progressNoShow} onClick={()=>props.filterReviewClickHandler(0)}> <span id='starText'>1 star</span>
        <div style={{width: (uno)+'%', height: '100%', background: 'green'}}></div>
        <span style={progress__text}>{ratingCount[1]} ratings</span>
      </div>

    </div>
  )
  }
}


export default Rbreakdown;