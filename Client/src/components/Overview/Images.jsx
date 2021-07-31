import React, { useState, useEffect } from 'react';

var Images = (props) => {
  const [bigPicture, updateBigPicture] = useState({})

  useEffect(() => {
    updateBigPicture(props.chosenStyle.photos[0])
  }, [props.chosenStyle]);

  const pictureSelect = {
    border: '2px solid black',
    height: '80px',
    width: '80px',
    marginTop: '5px',
    marginBottom: '5px',
  }
  const pictureSelected = {
    position: 'relative',
    border: '2px solid black',
    height: '600px',
    maxWidth: '700px'

  }

  const carousel = {
    float: 'left',
    maxWidth: '110px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '600px',
    overflow: 'scroll',
  }

  var changeBigPic = (negatives) => {
    updateBigPicture(negatives);
  }

  return (
    <div>
      <div style={carousel}>
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