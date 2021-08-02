import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');

var PbreakdownStyle = {
  width: '20%',
  border: '1px',
  padding: '10px',
  borderStyle: 'solid',
  borderColor: 'grey'
}

var metaUrl= 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta/?product_id='


function Pbreakdown(props) {
  var [characteristics, characteristicsChange] = useState();




  useEffect(()=>{

    axios.get(metaUrl+props.id, {
      headers: {
        Authorization: APIkey
      }
    })
    .then((data)=> {
      characteristicsChange(data.data.ratings)
    })
    .catch((error)=> {
      console.log('error in Rbreakdown: ', error)
    })


  }, [props.id])


  console.log(props.id)

  if(characteristics) {

    return (
      <div style={PbreakdownStyle} className='Pbreakdown'>

        <ul>
          <li>Size</li>
          <li>Width</li>
          <li>Comfort</li>
          <li>Quality</li>
        </ul>


        </div>
    )



  } else {
    return (
      <></>
    )
  }
}


export default Pbreakdown;