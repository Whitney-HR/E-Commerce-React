import React from 'react';

import SortR from './SubComponents/SortR.jsx';
import Rbreakdown from './SubComponents/Rbreakdown.jsx';
import Pbreakdown from './SubComponents/Pbreakdown.jsx';






class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '19093'// this.props.id 5 reviews
    };
  };

  componentDidMount() {
    this.setState({productID: this.props.id})
  }

  // componentDidUpdate() {
  //   this.setState({productID: this.props.id})
  // }


  render () {
    // console.log(this.props.id)

      return (
        <div className='reviews'>
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


export default Review;