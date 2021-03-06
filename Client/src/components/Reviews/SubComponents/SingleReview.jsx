import React from "react";
import moment from 'moment'
import ImageModal from './reviewImageModal.jsx'
import ImageThumbnail from './ImageThumbnail.jsx'
import StarRating from '../../Shared/StarRating.jsx'
import Tracker from '../../Shared/Tracker.jsx';
var APIkey = require('../../../env/config.js')
const axios = require('axios');

var divBoxStyle = {
  width: '500px',
  border: '1px',
  padding: '10px',
  borderStyle: 'solid',
  borderColor: 'grey'
}

var dummytext = `Any images that were submitted as part of the review should appear as thumbnails below the review text. Upon clicking a thumbnail, the image should open in a modal window, displaying at full resolution.  The only functionality available within this modal should be the ability to close the window.
		Recommend - If the reviewer recommends buying the product, the text “I recommend this product” and a checkmark icon will display below the review.  If the reviewer does not recommend the product, nothing will display here.
		Reviewer name - The username for the reviewer will appear.  Only the username will appear. No email addresses or other personal information will display.  However, if the user’s email is associated with a sale in the system then next to the username the text “Verified Purchaser” will appear.
		Response to Review - Our internal sales team has the ability to respond to any reviews written.  If the review has a corresponding response, this should appear below the reviewer name.  The response should be preceded by the text “Response from seller”, and should be visually distinguished from the rest of the review.
		Rating Helpfulness - Any user on the site will have the ability to provide feedback on whether reviews are helpful.  At the bottom of the review tile the text “Was this review helpful?” will precede two links “Yes (#)” and “No (#)”.   Following “Yes” and “No” will be the count of users that have selected that button.  Clicking either link should cast a vote for that selection.   `

class SingleReview extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hideBody: null,
      body: null,
      yesCount: this.props.comment.helpfulness, // random initial value
      noCount: Math.floor(Math.random()*10), // random initial value
      yesNoSelected: false,
      photos: this.props.comment.photos
    };
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.clickHandlerYesHelpful = this.clickHandlerYesHelpful.bind(this);
    this.clickHandlerNoHelpful = this.clickHandlerNoHelpful.bind(this);
    this.reportOnClickHandler = this.reportOnClickHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.comment.body.length > 250 ) {
      this.setState({
        hideBody: true,
        body: this.props.comment.body.slice(0, 250)
      })
    } else {
      this.setState({
        body: this.props.comment.body,
      })
    }
  }

  handleBodyClick() {
    Tracker('handleBodyClick', 'Reviews')
    this.setState({
      hideBody: false,
      body: this.props.comment.body
    })
  }

  clickHandlerYesHelpful(){
    Tracker('clickHandlerYesHelpful', 'Reviews')
    if (!this.state.yesNoSelected) {
      var newYes = this.state.yesCount + 1;
      this.setState({
        yesCount: newYes,
        yesNoSelected: true
      })
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${this.props.comment.review_id}/helpful`, {}, {
        headers: {
          Authorization: APIkey
        }
      })
      .then((data)=> {
      })
      .catch((error)=> {
        console.log('error in singleReviewPutRequest: ', error)
      })
    }
  }

  clickHandlerNoHelpful(){
    Tracker('clickHandlerNoHelpful', 'Reviews')
      if (!this.state.yesNoSelected) {
        var newNo = this.state.noCount + 1;
        this.setState({
          noCount: newNo,
          yesNoSelected: true
        })
      }
    }


    reportOnClickHandler() {
      Tracker('ReportOnClickHandler', 'Reviews')
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${this.props.comment.review_id}/report`, {}, {
        headers: {
          Authorization: APIkey
        }
      })
      .catch((error)=> {
        console.log('error in singleReviewPutRequest: ', error)
      })


    }


    render () {
      let sellerResponse = <div></div>
      if (this.props.comment.response) {
        sellerResponse = <p style={{background: 'grey'}}>Response from seller: {this.props.comment.response}</p>
      }
      let recommendedProduct = <div></div>
      if (this.props.comment.recommend) {
        recommendedProduct = <div style={{color: 'green'}}>✔✔✔ I recommend this product </div>
      }
      var body;
      if (this.state.hideBody) {
        body = <div style={{textAlign: 'justify', textJustify: 'inter-word'}}>{`${this.state.body}...`}<div onClick={this.handleBodyClick} className='report-Answer'>...Show More</div></div>
      } else {
        body = <div style={{textAlign: 'justify', textJustify: 'inter-word'}}>{this.state.body}</div>
      }


    return (
      <section className="review-list" >
        <span><StarRating rating={{[this.props.comment.rating]: 1}}/></span>
        <br></br>
        {moment(this.props.comment.date).format("MMMM DD YYYY")}
        <h3>{this.props.comment.summary}</h3>
        {body}
        {this.state.photos.map((photo, index)=>
          <ImageThumbnail photo={photo.url} key={index}/>
        )}
        <br></br>
        {recommendedProduct}
        <br></br>
        {"-"+this.props.comment.reviewer_name}
        <br></br>
        {sellerResponse}
        <br></br>
        <div>
          <span className='answerer-info'>Was it helpful?</span>
          <span className='report-Answer' onClick={this.clickHandlerYesHelpful}>Yes({this.state.yesCount})</span><span> / </span><span className='report-Answer' onClick={this.clickHandlerNoHelpful}>No ({this.state.noCount})</span>
          <span className='answerer-info' onClick={this.reportOnClickHandler} style={{position: 'relative', left: '50%'}}> Report</span>
        </div>
      </section>
    )
    }
}


export default SingleReview;