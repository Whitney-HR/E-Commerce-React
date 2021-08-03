import React from 'react';
import ReviewList from './ReviewList.jsx'
import ReviewModal from './NewReviewModal.jsx'
var APIkey = require('../../../env/config.js')
const axios = require('axios');


var reviewsUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=';
var metaUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id='

class SortR extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        currentFilter: '',
        reviewCount: '0',
        comments: [],
        meta: null,
        displayComments: 2,
        showReviewModal: false
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
        comments: data.data.results
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

  clickShowNewReviewModal() {
    this.setState({
      showReviewModal: true
    })
  }

  clickHideNewReviewModal() {
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
        comments: data.data.results
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
      // console.log('props id # down in render', this.props.id1)



      if(!this.state.meta) {
        return (
          <div>Loading...</div>
        )
      } else {
        let MoreReviewButton = <div></div>;
        if(this.state.displayComments < this.state.comments.length) {
          MoreReviewButton =  <input type="submit" value="More Reviews" onClick={this.handleMoreReviewClick}/>
        }
        return (
          <div className='SortR'>
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
              <ReviewList meta={this.state.meta} displayComments={this.state.displayComments} comments={this.state.comments}/>
              {MoreReviewButton}
              {<span>
                <input
                  onClick={this.clickShowNewReviewModal}
                  type="submit"
                  value="Add a Review"/>
                  <ReviewModal
                    meta = {this.state.meta}
                    showReviewModal={this.state.showReviewModal}
                    HideNewReviewModal={this.clickHideNewReviewModal}
                  />
              </span>}
        </div>
        )


      }


    }

}



export default SortR;