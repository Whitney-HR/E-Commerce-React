import React from 'react';
import moment from 'moment'

var divBoxStyle = {
  width: '60%',
  border: '1px',
  padding: '10px',
  borderStyle: 'solid',
  borderColor: 'grey'


}

class SingleReview extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    render () {

    return (
      <div style={divBoxStyle}>
      {'insert Star rating here'}
      <br></br>
      {moment(this.props.comment.date).format("MMMM DD YYYY")}
      <p style={{fontWeight: 'bold', fontSize: '150%'}}>{this.props.comment.summary}</p>
      {this.props.comment.body}
      <br></br>
      {'conditional rendered (props.comment.recommend): I recommend this product (+ a checkmark icon next to it) '}
      <br></br>
      {this.props.comment.reviewer_name}
      <br></br>
      <br></br>
      {'conditional rendered (props.comment.response): Response from seller: text text text'}
      <br></br>
      <br></br>
      {`implement a counter for Helpfuness: was it helpful? Yes-(${this.props.comment.helpfulness})-No`}
    </div>
    )
    }
}


export default SingleReview;