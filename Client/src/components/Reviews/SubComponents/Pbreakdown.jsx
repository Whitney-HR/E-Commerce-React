import React, { useState, useEffect } from 'react';
var APIkey = require('../../../env/config.js')
const axios = require('axios');

var PbreakdownStyle = {
  width: '250px',
  padding: '10px',
  overflow: 'hidden'
  // border: '2px',
  // borderStyle: 'solid',
  // borderColor: 'cornflowerblue'

}

var progress = {
  position: "relative",
  width: "250px",
  height: "8px",
  background: "rgb(140, 140, 140)",
  borderRadius: '5px',
  overflow: 'visible'
}

var letters = {
  fontSize: "small"
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

      <div className='Pbreakdown'> Fit
      <div style={progress}>
        <div style={{position: 'relative', left: (characteristics.Fit.value/5)*240+'px'}}><div className="arrow-down"></div></div>
      </div>
      <div className='descriptionChars' style={{display: "flex", justifyContent: 'space-between'}}>
          <div style={letters}>runs tight</div>
          <div style={letters}>perfect</div>
          <div style={letters}>runs long</div>
        </div>
        <br></br>
      </div>

    )
      : <></>)

    var length = (characteristics.Length ? (


      <div className='Pbreakdown'> Length

      <div style={progress}>
        <div style={{position: 'relative', left: (characteristics.Length.value/5)*240+'px'}}><div className="arrow-down"></div></div>

      </div>
      <div className='descriptionChars' style={{display: "flex", justifyContent: 'space-between'}}>
          <div style={letters}>Runs Short</div>
          <div style={letters}>Perfect</div>
          <div style={letters}>runs long</div>
        </div>
        <br></br>
      </div>
    )
      : <></>)

    var comfort = (characteristics.Comfort ? (


      <div className='Pbreakdown'> Comfort

      <div style={progress}>
      <div style={{position: 'relative', left: (characteristics.Comfort.value/5)*240+'px', overflow: 'visible'}}><div className="arrow-down"></div></div>
      </div>
      <div className='descriptionChars' style={{display: "flex", justifyContent: 'space-between'}}>
          <div style={letters}>Uncomfortable</div>
          <div style={letters}>Ok</div>
          <div style={letters}>Perfect</div>
        </div>
        <br></br>
      </div>
    )
      : <></>)

    var quality = (characteristics.Quality ? (


      <div className='Pbreakdown'> Quality
      <div style={progress}>
        <div style={{position: 'relative', left: (characteristics.Quality.value/5)*240+'px'}}><div className="arrow-down"></div></div>

      </div>
      <div className='descriptionChars' style={{display: "flex", justifyContent: 'space-between'}}>
          <div style={letters}>Poor</div>
          <div style={letters}>What I expected</div>
          <div style={letters}>Perfect</div>
        </div>
        <br></br>
      </div>
    )
      : <></>)


      var size = (characteristics.Size ? (


        <div className='Pbreakdown'> Size
        <div style={progress}>

          <div style={{position: 'relative', left: (characteristics.Size.value/5)*240+'px'}}><div className="arrow-down"></div></div>
        </div>
        <div className='descriptionChars' style={{display: "flex", justifyContent: 'space-between'}}>
            <div style={letters}>A size too small</div>
            <div style={letters}>Perfect</div>
            <div style={letters}>A size too wide</div>
          </div>
          <br></br>
        </div>
      )
        : <></>)


      var width = (characteristics.Width ? (


        <div className='Pbreakdown'> Width
        <div style={progress}>

          <div style={{position: 'relative', left: (characteristics.Width.value/5)*240+'px'}}><div className="arrow-down"></div></div>
        </div>
        <div className='descriptionChars' style={{display: "flex", justifyContent: 'space-between'}}>
            <div style={letters}>Too narrow</div>
            <div style={letters}>Perfect</div>
            <div style={letters}>Too wide</div>
          </div>
          <br></br>
        </div>
      )
        : <></>)








  }



  if(characteristics) {

    return (
      <div style={PbreakdownStyle} className='Pbreakdown'> <h2>Customer experience:</h2>


          {fit}

          {length}

          {comfort}

          {quality}

          {size}

          {width}



        </div>
    )



  } else {
    return (
      <></>
    )
  }
}


export default Pbreakdown;