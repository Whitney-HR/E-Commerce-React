import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');
import StarRating from '../../Shared/StarRating.jsx'



var metaUrl= 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta/?product_id='


var RbreakdownStyle = {
  width: '20%',
  border: '1px',
  padding: '10px',
  borderStyle: 'solid',
  borderColor: 'grey'
}



function Rbreakdown(props) {
  var [rating, ratingChange] = useState();
  var [recommend, recommendChange] = useState();


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

  var ratings = rating
  var ratingTotal = 0;
  var ratingAverage = 0;
  for (var keys in ratings) {
    ratingTotal += parseInt(ratings[keys])
  }
  for (var keys in ratings) {
    ratingAverage += (ratings[keys])/ratingTotal*parseInt(keys)
  }
  ratingAverage = (Math.round(ratingAverage * 100) / 100).toFixed(2);

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





  if(rating) {
    var uno = 0
    var dos = 0
    var tres = 0
    var cuatro = 0
    var cinco = 0
    if(rating[1]) {
      uno= rating[1];
    }
    if(rating[2]) {
      dos= rating[2];
    }
    if(rating[3]) {
      tres= rating[3];
    }
    if(rating[4]) {
      cuatro= rating[4];
    }
    if(rating[5]) {
      cinco= rating[5];
    }
  }



  if (!rating || !recommend) {
    return(
      <></>
    )
  } else {
  return (
    <div className='Rbreakdown' style={RbreakdownStyle}>
      <span style={{fontSize: 'xxx-large'}}>{ratingAverage}</span><StarRating rating={rating}/>
      <div>Based on {ratingTotal} ratings</div>
      <span>{`${recommendPercentage} of ratings recommend this product`}</span>
      <br></br>
      <br></br>
      <div>Rating Breakdown:</div>
      <div>5 stars: {cinco}</div>
      <div>4 stars: {cuatro}</div>
      <div>3 stars: {tres}</div>
      <div>2 stars: {dos}</div>
      <div>1 stars: {uno}</div>
    </div>
  )
  }
}


export default Rbreakdown;