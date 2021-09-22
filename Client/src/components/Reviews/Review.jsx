import React, { useState, useEffect } from 'react';
import SortR from './SubComponents/SortR.jsx';
import Rbreakdown from './SubComponents/Rbreakdown.jsx';
import Pbreakdown from './SubComponents/Pbreakdown.jsx';
import {ReviewContainer, RatingProductReviewContainer, RatingProduct} from './Review.styled.js'



function Review(props) {
  const [productID, setProductID] = useState(null);
  const [renderStarRating, setrenderStarRating] = useState([true,true,true,true,true]);





  var filterReviewClickHandler = (value) => {
    let newArray = [false,false,false,false,false]
    newArray[value] = !newArray[value]
    setrenderStarRating(newArray)
  }


  var resetFiltersClick = () => {
    let newArray = [true,true,true,true,true]
    setrenderStarRating(newArray)
  }






  useEffect(() => {
    setProductID(props.id)
  }, [props.id])

  if(productID) {

    return (
      <ReviewContainer>
        <section className='review-container' id="reviews">
          <h2>{`Ratings & Reviews`}</h2>
          </section>
          <RatingProductReviewContainer>
          <>
            <RatingProduct>
              <section className="rating-breakdown">
              <Rbreakdown id={productID} filterReviewClickHandler={filterReviewClickHandler} resetFiltersClick={resetFiltersClick} renderStarRating={renderStarRating}/>
              <Pbreakdown id={productID}/>
              </section>
            </RatingProduct>
            <section className="review-feed"><SortR id={productID} renderStarRating={renderStarRating}/> </section>
            </>
        </RatingProductReviewContainer>
      </ReviewContainer>
    )

  } else {

    return (
      <div>Loading...</div>

    )
  }

}


export default Review;



/*


class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '19093'// this.props.id 5 reviews
    };
  };

  render () {
    console.log(this.props.id)
    // this.setState({productID: this.props.id})

      return (
        <div className='reviews' id="reviews">
          <h2>{`Ratings & Reviews`}</h2>
          <>
          <Rbreakdown id={this.state.productID}/>
          <Pbreakdown id={this.state.productID}/>
          <SortR id={this.state.productID}/>
          </>
        </div>
      )
  }

}

*/