import React from 'react';
import SingleReview from './SingleReview.jsx'



function ReviewList(props) {
    var comments = props.comments.slice(0, props.displayComments)
    return (
      <div className='ReviewList'>
      {comments.map((comment)=>
        <SingleReview meta={props.meta} key={comment.review_id} comment={comment}/>
      )}
      </div>
    )

}



export default ReviewList;
