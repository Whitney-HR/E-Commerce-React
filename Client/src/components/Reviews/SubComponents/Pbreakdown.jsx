import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');

var PbreakdownStyle = {
  width: '250px',
  border: '2px',
  padding: '10px',
  borderStyle: 'solid',
  borderColor: 'cornflowerblue'

}

var metaUrl= 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id='


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
    var fit = (characteristics.Fit ? (
      <div>
        Fit: {(Math.round(characteristics.Fit.value/5 * 100)).toFixed(0)+'%'}
      </div>) : <></>)
    var length = characteristics.Length ? <div>Length {(Math.round(characteristics.Length.value/5 * 100)).toFixed(0)+'%'}</div> : <></>
    var comfort = characteristics.Comfort ? <div>Comfort {(Math.round(characteristics.Comfort.value/5 * 100)).toFixed(0)+'%'}</div> : <></>
    var quality = characteristics.Quality ? <div>Quality {(Math.round(characteristics.Quality.value/5 * 100)).toFixed(0)+'%'}</div> : <></>
  }

// (Math.round(characteristics.Quality.value/5 * 100)).toFixed(2)+'%'


  if(characteristics) {

    return (
      <div style={PbreakdownStyle} className='Pbreakdown'>


          {fit}
          {length}
          {comfort}
          {quality}



        </div>
    )



  } else {
    return (
      <></>
    )
  }
}


export default Pbreakdown;