import React, { useState, useEffect } from 'react';
import Axios from 'axios';

var Features = (props) => {
  console.log(props.feat);
  return (
    <div className="Features-body">
      <h3> Features </h3>
      <ul>
        {props.feat.map((ft) => {
          if (ft.value) {
            return (
              <li>
                {ft.feature+ ' - ' + ft.value}
              </li>
            )
          } else {
            return (
              <li>
                {ft.feature}
              </li>
            )
          }
        })}
      </ul>
    </div>

  )
};

export default Features;