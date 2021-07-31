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


class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      url1: '',
      url2: '',
      url3: '',
      url4: '',
      url5: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })

  }

  handleSubmit(event) {
    event.preventDefault()
  }


  render() {
  const showHideClassName = this.props.showReviewModal ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main-NewReview">
      {this.props.children}
        <form onSubmit={this.handleSubmit}> Add new review Details:
            <br></br>
            <label>
            Review: <input type="textarea" id='body' value={this.state.name} onChange={this.handleChange} />
            <br></br>
            {`Image 1 (Url):`} <input type="text" id='url1' value={this.state.name} onChange={this.handleChange} />
            <br></br>
            {`Image 2 (Url):`} <input type="text" id='url2' value={this.state.name} onChange={this.handleChange} />
            <br></br>
            {`Image 3 (Url):`} <input type="text" id='url3' value={this.state.name} onChange={this.handleChange} />
            <br></br>
            {`Image 4 (Url):`} <input type="text" id='url4' value={this.state.name} onChange={this.handleChange} />
            <br></br>
            {`Image 5 (Url):`} <input type="text" id='url5' value={this.state.name} onChange={this.handleChange} />
            <br></br>
          </label>
          <input onClick={this.props.HideNewReviewModal} type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
  }
};

export default ReviewModal;