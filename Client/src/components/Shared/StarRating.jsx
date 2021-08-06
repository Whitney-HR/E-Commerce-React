import React from 'react';
import star from './5-stars.png'

class StarRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: null
    }
  }

  componentDidMount() {
    if (!this.props.rating) {
      this.setState({rating: 0})
    } else {
    var ratings = this.props.rating
    var ratingTotal = 0;
    var ratingAverage = 0;
    for (var keys in ratings) {
      ratingTotal += parseInt(ratings[keys])
    }
    for (var keys in ratings) {
      ratingAverage += parseInt(ratings[keys])/ratingTotal*parseInt(keys)
    }
    this.setState({rating: ratingAverage})
  }
  }

  render() {
    var rating = this.state.rating/5*100;
    return (
      <div>
        <img alt='starRatingImage' style={{height: '27px', width: '150px', overflow: 'hidden', background: `linear-gradient(90deg, gold ${rating}%, grey ${rating}%)`}} src={`${star}`}/>
      </div>
      )
  }
}

export default StarRating;