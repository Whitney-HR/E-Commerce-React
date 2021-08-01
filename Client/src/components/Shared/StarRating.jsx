import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

// BsStar empty star
// BsStarHalf half star
// BsStarFill full star


class StarRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.rating

    }
  }
  render() {

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
      <>
      {toRender}
      </>

      )
  }
}


export default StarRating;