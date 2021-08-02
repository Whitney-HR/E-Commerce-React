import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');

var PbreakdownStyle = {
  width: '250px',
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
      characteristicsChange(data.data.characteristics)
    })
    .catch((error)=> {
      console.log('error in Rbreakdown: ', error)
    })
  }, [props.id])


  if(characteristics) {
    var fit = characteristics.Fit ? <li>Fit: {(Math.round(characteristics.Fit.value/5 * 100)).toFixed(0)+'%'}</li> : <></>
    var length = characteristics.Length ? <li>Length {(Math.round(characteristics.Length.value/5 * 100)).toFixed(0)+'%'}</li> : <></>
    var comfort = characteristics.Comfort ? <li>Comfort {(Math.round(characteristics.Comfort.value/5 * 100)).toFixed(0)+'%'}</li> : <></>
    var quality = characteristics.Quality ? <li>Quality {(Math.round(characteristics.Quality.value/5 * 100)).toFixed(0)+'%'}</li> : <></>
  }

// (Math.round(characteristics.Quality.value/5 * 100)).toFixed(2)+'%'


  if(characteristics) {

    return (
      <div style={PbreakdownStyle} className='Pbreakdown'>

        <ul>
          {fit}
          {length}
          {comfort}
          {quality}
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