import React, { useState, useEffect } from 'react';
import SortR from './SubComponents/SortR.jsx';
import Rbreakdown from './SubComponents/Rbreakdown.jsx';
import Pbreakdown from './SubComponents/Pbreakdown.jsx';



function Review(props) {
  const [productID, setProductID] = useState(null);


  useEffect(() => {
    setProductID(props.id)
  }, [props.id])

  if(productID) {

    return (
      <div className='reviews' id="reviews">
        <h2>{`Ratings & Reviews`}</h2>
        <>
        <br></br>
        <span style={{float: 'left'}}>
        <Rbreakdown id={productID}/>
        <Pbreakdown id={productID}/>
        </span>
        <span style={{float: 'left'}}><SortR id={productID}/> </span>

        </>
      </div>
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