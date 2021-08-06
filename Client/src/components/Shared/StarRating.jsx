import React from 'react';

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
        <img style={{overflow: 'hidden', background: `linear-gradient(90deg, gold ${rating}%, grey ${rating}%)`}}src='https://svgshare.com/i/Zu6.svg'/>
      </div>
      )
  }
}

export default StarRating;
