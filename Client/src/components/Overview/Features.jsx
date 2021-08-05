import React, { useState, useEffect } from 'react';

var Features = (props) => {

  return (
    <div className='moveToRightLeft'>
      <h3> Features </h3>
      <ul >
        {props.feat.map((ft, index) => {
          if (ft.value) {
            return (
              <li key={index}>
                {ft.feature+ ' - ' + ft.value}
              </li>
            )
          } else {
            return (
              <li key={index}>
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