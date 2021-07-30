import React, { useState, useEffect } from 'react';

var Images = (props) => {
  const [bigPicture, updateBigPicture] = useState({})

  useEffect(() => {
    updateBigPicture(props.chosenStyle.photos[0])
  }, [props.chosenStyle]);

  const pictureSelect = {
    border: '2px solid black',
    height: '80px',
    width: '80px'
  }
  const pictureSelected = {
    border: '2px solid black',
    height: '500px',
    maxWidth: '600px'
  }

  var changeBigPic = (negatives) => {
    updateBigPicture(negatives);
  }

  return (
    <div>
      <div>
        {props.chosenStyle.photos.map((currentPicture, index) => {

          return (
            <img style={pictureSelect} src={currentPicture.thumbnail_url} key={index} onClick={() => {changeBigPic(currentPicture) }}></img>
          )
        })}
      </div>
      <div>
        <img style={pictureSelected} src={bigPicture.url} ></img>
      </div>
    </div>
  )
};

export default Images;