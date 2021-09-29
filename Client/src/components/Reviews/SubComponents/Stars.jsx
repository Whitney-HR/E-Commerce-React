import React, {useState} from 'react';


import {FaStar} from 'react-icons/fa'


const Stars = (props)=> {
  const [hover, setHover] = useState(null)


  return (
      <div>
    {[...Array(5)].map((star, i)=>{
      const ratingValue = i + 1 ;

      return(
          <label key={i}>
          <input
            type='radio'
            id='starradio'
            name='rating'
            value={ratingValue}
            onClick={()=>{props.handlestarchange(ratingValue)}}

          />
          <FaStar
            className='stars'
            onMouseEnter={()=>{setHover(ratingValue)}}
            onMouseLeave={()=>{setHover(null)}}
            color={ratingValue <= (hover || props.stars) ? "#ffc107": "#e4e5e9"}
            size={30}
          />
        </label>

      )

    })}
  </div>
  )
}

export default Stars

