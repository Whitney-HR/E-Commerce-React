import React from 'react';
import './imageModalStyle.css'

const thumbnailStyle = {
  border: '2px solid black',
  height: '350px',
  width: 'auto'
}

const buttonStyle={
  alignItems: 'center'

}


const ImageModal = (props) => {
  const showHideClassName = props.showImageModal ? "modal display-block" : "modal display-none";
  return (
    <div onClick={props.clickHideImageModal} className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <img  style={thumbnailStyle} src={`${props.image}`}></img>
      </section>
    </div>
  );
};

export default ImageModal;