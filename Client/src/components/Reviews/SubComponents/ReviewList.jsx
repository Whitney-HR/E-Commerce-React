import React from 'react';
import SingleReview from './SingleReview.jsx'



class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {



    }
  };

  render () {
    var comments = this.props.comments.slice(0, this.props.displayComments)
    return (
      <div className='ReviewList'>
      {comments.map((comment)=>
        <SingleReview key={comment.review_id} comment={comment}/>
      )}
      </div>
    )
  }
}



export default ReviewList;
