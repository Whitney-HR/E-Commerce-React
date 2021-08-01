import React from 'react';

import SortR from './SubComponents/SortR.jsx';
import Rbreakdown from './SubComponents/Rbreakdown.jsx';
import Pbreakdown from './SubComponents/Pbreakdown.jsx';






class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '19093'// this.props.id 5 reviews
      // productID: this.props.id1// this.props.id 5 reviews
    };
    // console.log('state: ', this.state.productID)
    // console.log('props: ' ,this.props.id)

  };

  // console.log(this.state.productID)

  // componentDidUpdate() {
  //   this.setState({productID: this.props.id})
  // }
  // doStuff() {this.setState({productID: this.props.id.toString()})};


  // ()=> {}


  //all products id: 19089 19090 19091 19092 19093

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