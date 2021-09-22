import React from 'react';
import ReviewList from './ReviewList.jsx'
import ReviewModal from './NewReviewModal.jsx'
var APIkey = require('../../../env/config.js')
const axios = require('axios');
import Tracker from '../../Shared/Tracker.jsx';
import {SortAndList, SortedBy, ReviewListPlusButtons} from './SortR.styled.js';


var reviewsUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=';
var metaUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id='

class SortR extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        currentFilter: '',
        reviewCount: '0',
        filterByReviewStars: this.props.renderStarRating,
        comments: [],
        commentsToRender: [],
        meta: null,
        displayComments: 2,
        showReviewModal: false,
        productName: ''
      }
      this.clickShowNewReviewModal = this.clickShowNewReviewModal.bind(this);
      this.clickHideNewReviewModal = this.clickHideNewReviewModal.bind(this);
      this.handleSortedChange = this.handleSortedChange.bind(this);
      this.handleMoreReviewClick = this.handleMoreReviewClick.bind(this);
  }





  componentDidMount() {

    //Reviews
    axios.get(reviewsUrl+this.props.id+'&sort=relevant&count=100', {
      headers: {
        Authorization: APIkey
      }
    })
    .then((data)=> {
      this.setState({
        currentFilter: 'relevant',
        reviewCount: data.data.results.length,
        comments: data.data.results,
        commentsToRender: data.data.results,
        productName: ''
      })
    })
    .catch((error)=> {
      throw(error);
    })

    //metadata
    axios.get(metaUrl+this.props.id, {
      headers: {
        Authorization: APIkey
      }
    })
    .then((data)=> {
      this.setState({
        meta: data.data
      })
    })
    .catch((error)=> {
      console.log('error at SortR,', error)
    })
  }

  componentDidUpdate() {
    if(this.props.renderStarRating !== this.state.filterByReviewStars) {
      var currentComments = this.state.comments.slice()
      var newComments = [];

      for (var i = 0; i<currentComments.length; i++) {

        if(this.props.renderStarRating[currentComments[i].rating-1]) {
          newComments.push(currentComments[i])
        }
      }





      this.setState({
        filterByReviewStars: this.props.renderStarRating,
        commentsToRender: newComments

      })
    }


  }

  clickShowNewReviewModal() {
    Tracker('clickShowNewReviewModal', 'Review')
    this.setState({
      showReviewModal: true
    })
  }

  clickHideNewReviewModal() {
    Tracker('clickHideNewReviewModal', 'Review')

    this.setState({
      showReviewModal: false
    })
  }

  handleSortedChange(event) {
    this.setState({currentFilter: event.target.value})

    axios.get(reviewsUrl+this.props.id+'&sort='+event.target.value+'&count=100', {
      headers: {
        Authorization: APIkey
      }
    })
    .then((data)=> {
      this.setState({
        currentFilter: event.target.value,
        commentsToRender: data.data.results
      })
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  handleMoreReviewClick() {
    var newCount = this.state.displayComments+2;
    this.setState({displayComments: newCount})
  }

    render() {
      if(!this.state.meta) {
        return (
          <div>Loading...</div>
        )
      } else {
        let MoreReviewButton = <div></div>;
        if(this.state.displayComments < this.state.commentsToRender.length) {
          MoreReviewButton =  <input className="more-reviews-button"type="submit" value="More Reviews" onClick={this.handleMoreReviewClick}/>
        }
        return (
          <SortAndList>
            <SortedBy>
              {/* <div className='SortR'> */}
                <form>
                <label>
                  {this.state.reviewCount} reviews, sorted by
                  <select value={this.state.currentFilter} onChange={this.handleSortedChange}>
                    <option value="relevant">Relevant</option>
                    <option value="helpful">Helpful</option>
                    <option value="newest">Newest</option>
                  </select>
                </label>
              </form>
            </SortedBy>
            <ReviewListPlusButtons>
              <ReviewList meta={this.state.meta} displayComments={this.state.displayComments} comments={this.state.commentsToRender}/>
              {MoreReviewButton}
              {<span>
                <input
                  className="add-review-button"
                  onClick={this.clickShowNewReviewModal}
                  type="submit"
                  value="Add a Review"/>
                  <ReviewModal
                    id = {this.props.id}
                    meta = {this.state.meta.characteristics}
                    showReviewModal={this.state.showReviewModal}
                    HideNewReviewModal={this.clickHideNewReviewModal}
                  />
              </span>}
        {/* </div> */}
          </ReviewListPlusButtons>

        </SortAndList>
        )


      }


    }

}



export default SortR;