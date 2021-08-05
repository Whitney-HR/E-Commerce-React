import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// import fiveStars from '../../../../5stars.png'



// BsStar empty star
// BsStarHalf half star
// BsStarFill full star


//this needs to receive as prop: props.rating (from metadata rating)
// var StarRating = (props) => {
//   const [] =
// }

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

    var rating = this.state.rating/5*150;




    return (
      <div style={{width: `${rating}px`, background: 'gold', overflow: 'hidden'}}>
        <img src="https://i.ibb.co/HCPH9M1/5stars.png"/>
      </div>
      )
  }
}


export default StarRating;


/*

    render() {
    var toRender;
    var rating = this.state.rating;
    var toRender;
    var rating = this.state.rating;

    if (rating < 0.5) {
      toRender = <><BsStar/><BsStar/><BsStar/><BsStar/><BsStar/></>
    } else if (rating >= 0.5 && rating < 1 ) {
      toRender = <><BsStarHalf/><BsStar/><BsStar/><BsStar/><BsStar/></>
    } else if (rating >= 1 && rating < 1.5) {
      toRender = <><BsStarFill/><BsStar/><BsStar/><BsStar/><BsStar/></>
    } else if (rating >= 1.5 && rating < 2) {
      toRender = <><BsStarFill/><BsStarHalf/><BsStar/><BsStar/><BsStar/></>
    } else if (rating >= 2 && rating < 2.5) {
      toRender = <><BsStarFill/><BsStarFill/><BsStar/><BsStar/><BsStar/></>
    } else if (rating >= 2.5 && rating < 3) {
      toRender = <><BsStarFill/><BsStarFill/><BsStarHalf/><BsStar/><BsStar/></>
    }else if (rating >= 3 && rating < 3.5) {
      toRender = <><BsStarFill/><BsStarFill/><BsStarFill/><BsStar/><BsStar/></>
    }else if (rating >= 3.5 && rating < 4) {
      toRender = <><BsStarFill/><BsStarFill/><BsStarFill/><BsStarHalf/><BsStar/></>
    }else if (rating >= 4 && rating < 4.5) {
      toRender = <><BsStarFill/><BsStarFill/><BsStarFill/><BsStarFill/><BsStar/></>
    } else if (rating >= 4.5 && rating < 5) {
      toRender = <><BsStarFill/><BsStarFill/><BsStarFill/><BsStarFill/><BsStarHalf/></>
    } else if (rating === 5) {
      toRender = <><BsStarFill/><BsStarFill/><BsStarFill/><BsStarFill/><BsStarFill/></>
    }

    return (
      <span>{toRender}</span>
      )
    */
