import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');
import StarRating from '../../Shared/StarRating.jsx'
import Characteristics from './Characteristics.jsx'


var metaUrl= 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta/?product_id='


var RbreakdownStyle = {
  width: '60%',
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

  // console.log(recommend)
  // var recommendTotal = parseInt(recommend.true)+parseInt(recommend.false)
  // console.log(recommendTotal)
  // var recommendPercentage = `${recommend.}`


  if (!rating || !recommend) {
    return(
      <></>
    )
  } else {
  return (


    <div className='Rbreakdown' style={RbreakdownStyle}>
      <span style={{fontSize: 'xxx-large'}}>{ratingAverage}</span><StarRating rating={rating}/>
      <div>Based on {ratingTotal} ratings</div>
      <br></br>
      <span>{`${''} of ratings recommend this product`}</span>
      <div>Rating Breakdown:</div>


    </div>




  )
  }
}


export default Rbreakdown;