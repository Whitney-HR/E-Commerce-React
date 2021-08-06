import React from 'react';
import ImageModal from './reviewImageModal.jsx';
import Tracker from '../../Shared/Tracker.jsx';

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
    Tracker('clickShowImageModal', 'Reviews')
    this.setState({
      showImageModal: true
    })
  }

  clickHideImageModal() {
    Tracker('clickHideImageModal', 'Reviews')
    this.setState({
      showImageModal: false
    })
  }

  render () {
    return(
      <span>
        <img onClick={this.clickShowImageModal} className="thumbnailStyle" src={`${this.state.image}`}/>
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