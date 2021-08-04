import React, { useState, useEffect } from 'react';
import {FaExpand} from 'react-icons/fa';
import Modal from '../Shared/SharedModal.jsx';
import Tracker from '../Shared/Tracker.jsx';

var Images = (props) => {
  const [bigPicture, updateBigPicture] = useState({})
  const [addBigPicModal, updateBigPicModal] = useState(false)

  const pictureSelect = {
    border: '2px solid black',
    height: '80px',
    width: '80px',
    marginTop: '5px',
    marginBottom: '5px',
  }
  const pictureSelected = {
    height: '600px',
    maxWidth: '45%',
    paddingLeft: '5%',
    paddingRight: '5%',
  }
  const carousel = {
    float: 'left',
    maxWidth: '110px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '600px',
    overflow: 'scroll',
  }
  const expandButton = {
    marginLeft: '30px',
    maxWidth: '40px'
  }

  useEffect(() => {
    updateBigPicture(props.chosenStyle.photos[0])
  }, [props.chosenStyle]);

  var changeBigPic = (negatives) => {
    updateBigPicture(negatives);
    Tracker('Selected Picture from Carousel', 'OverView');
  }
  const showBigPicModal = function() {
    updateBigPicModal(true);
    Tracker('Expand Picture', 'OverView');
  }
  const hideBigPicModal = function() {
    updateBigPicModal(false);
    Tracker('Close Expanded Picture', 'OverView');
  }

  return (
    <div>
      <div >
        <div style={carousel}>
          {props.chosenStyle.photos.map((currentPicture, index) => {
            return (
              <img style={pictureSelect} src={currentPicture.thumbnail_url} key={index} onClick={() => {changeBigPic(currentPicture) }}></img>
            )
          })}
        </div>
      </div>
      <div >
        <img style={pictureSelected} src={bigPicture.url} ></img>
      </div>
      <div>
        <div style={expandButton} onClick={showBigPicModal}>
          <FaExpand size={30} />
        </div>
      </div>
      <div>
        <Modal show={addBigPicModal}>
          <img src={bigPicture.url}  onClick={hideBigPicModal} ></img>
        </Modal>
      </div>
    </div>
  )
};

export default Images;