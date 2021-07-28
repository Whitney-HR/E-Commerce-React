import React from 'react';

import SortR from './SubComponents/SortR.jsx';
import Rbreakdown from './SubComponents/Rbreakdown.jsx';
import Pbreakdown from './SubComponents/Pbreakdown.jsx';

const axios = require('axios');


var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products';




class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '19089'// this.props
    };

  };

  // componentDidMount() {

  //   axios.get(url, {
  //     headers: {
  //       Authorization: APIkey
  //     }
  //   })
  //   .then((response)=> {
  //     console.log(response);
  //   })
  //   .catch((error)=> {
  //     console.log(error);
  //     console.log('test')
  //   })

  // }




  render () {
      return (
        <div>
          Ratings Reviews
          <SortR />
          <br></br>
          <br></br>
          <Rbreakdown />
          <br></br>
          <br></br>
          <Pbreakdown />
        </div>
      )
  }

}


export default Review;