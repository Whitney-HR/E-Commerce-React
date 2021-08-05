import React, { useState, useEffect } from 'react';
import {FaExpand, FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import Modal from '../Shared/SharedModal.jsx';
import Tracker from '../Shared/Tracker.jsx';

var Images = (props) => {
  const [bigPicture, updateBigPicture] = useState({});
  const [addBigPicModal, updateBigPicModal] = useState(false);
  const [addZoomPicModal, updateZoomPicModal] = useState(false);
  const [BigPicIndex, updateBigPicIndex] = useState(0);

  useEffect(() => {
    updateBigPicture(props.chosenStyle.photos[0]);
    updateBigPicIndex(0);
  }, [props.chosenStyle]);

  var changeBigPic = (negatives, index) => {
    updateBigPicture(negatives);
    updateBigPicIndex(index);
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
  const showZoomPicModal = function() {
    updateZoomPicModal(true);
    Tracker('Zoom Picture', 'OverView');
  }
  const hideZoomPicModal = function() {
    updateZoomPicModal(false);
    Tracker('Close Zoom Picture', 'OverView');
  }

  const onLeftArrowClick = (e) => {
    updateBigPicture(props.chosenStyle.photos[BigPicIndex - 1]);
    updateBigPicIndex(BigPicIndex - 1);
    Tracker('onLeftArrowClick', 'Overview');
  }
  const onRightArrowClick = (e) => {
    updateBigPicture(props.chosenStyle.photos[BigPicIndex + 1]);
    updateBigPicIndex(BigPicIndex + 1);
    Tracker('onRightArrowClick', 'Overview');
  }
  const buttonLRender = () => {
    if(BigPicIndex === 0) {
      return
    } else {
      return(<FaArrowLeft size={27} onClick={onLeftArrowClick} />)
    }
  }
  const buttonRRender = () => {
    if (props.chosenStyle.photos.length -1 === BigPicIndex) {
      return
    } else {
      return (<FaArrowRight size={27} onClick={onRightArrowClick}/>)
    }
  }

  const zoomIn = (e) => {

  }

  return (
    <div>
      <div >
        <div className='carousel'>
          {props.chosenStyle.photos.map((currentPicture, index) => {
            return (
              <img className='pictureSelect' src={currentPicture.thumbnail_url} key={index} onClick={() => {changeBigPic(currentPicture, index) }}></img>
            )
          })}
        </div>
      </div>
      <div >
        <img className="bigPic" src={bigPicture.url} onClick={showBigPicModal}></img>
      </div>
      <div>
        <div className='expandButton' >
            <FaExpand size={30} onClick={showBigPicModal}/>
          <div className='makeRight'>
            {buttonLRender()}
            {buttonRRender()}
          </div>
        </div>
      </div>
      <div>
        <Modal show={addBigPicModal}>
          <button onClick={hideBigPicModal}>collapse</button>
          <div className='expandedPicContainer' >
            <img className='expandedPic' src={bigPicture.url} ></img>
          </div>
        </Modal>
      </div>
      {/* <div>
        <Modal show={addZoomPicModal}>
          <button onClick={hideZoomPicModal}>collapse</button>
          <div className='expandedPicContainer' onClick={zoomIn()} >
            <img className='expandedPic' src={bigPicture.url} ></img>
          </div>
        </Modal>
      </div> */}
    </div>
  )
};

export default Images;