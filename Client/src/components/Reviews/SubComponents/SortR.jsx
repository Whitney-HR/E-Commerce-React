import React from 'react';
import ReviewList from './ReviewList.jsx'
var APIkey = require('../../../env/config.js')
const axios = require('axios');

var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/?product_id=';

class SortR extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        currentFilter: '',
        reviewCount: '0',
        comments: [],
        displayComments: 2
      }

      this.handleSortedChange = this.handleSortedChange.bind(this);
      this.handleMoreReviewClick = this.handleMoreReviewClick.bind(this);
  }

  componentDidMount() {
    axios.get(url+this.props.id+'&sort=relevant', {
      headers: {
        Authorization: APIkey
      }
    })
    .then((data)=> {
      this.setState({
        currentFilter: 'relevant',
        reviewCount: data.data.count,
        comments: data.data.results
      })
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  handleSortedChange(event) {
    this.setState({currentFilter: event.target.value})

    axios.get(url+this.props.id+'&sort='+event.target.value, {
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
      let MoreReviewButton = <div></div>;
      if(this.state.displayComments < this.state.comments.length) {
        MoreReviewButton =  <input type="submit" value="More Reviews" onClick={this.handleMoreReviewClick}/>
      }

        return (
          <div>
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
              <ReviewList displayComments={this.state.displayComments} comments={this.state.comments}/>
              {MoreReviewButton} {<input type="submit" value="Add a Review"/>}
        </div>
        )


    }

}



export default SortR;