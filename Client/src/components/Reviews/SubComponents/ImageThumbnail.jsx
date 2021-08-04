import React from 'react';
import ImageModal from './reviewImageModal.jsx';

const thumbnailStyle = {
  border: '2px solid black',
  height: '50px',
  width: '50px'
}

class ImageThumbnail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showImageModal: false,
      showNewReviewModal: false,
      image: this.props.photo
    }
    this.clickShowImageModal = this.clickShowImageModal.bind(this);
    this.clickHideImageModal = this.clickHideImageModal.bind(this);
  }

  clickShowImageModal() {
    this.setState({
      showImageModal: true
    })
  }

  clickHideImageModal() {
    this.setState({
      showImageModal: false
    })
  }

  render () {
    return(
      <span>
        <img onClick={this.clickShowImageModal} style={thumbnailStyle} src={`${this.state.image}`}/>
        <ImageModal
          image={this.state.image}
          showImageModal={this.state.showImageModal}
          clickHideImageModal={this.clickHideImageModal}>
        </ImageModal>
      </span>
    )

  }
}


export default ImageThumbnail;