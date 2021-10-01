import React from 'react';
import './imageModalStyle.css'
const axios = require('axios');
var APIkey = require('../../../env/config.js')
import Stars from './Stars.jsx'


const thumbnailStyle = {
  border: '2px solid black',
  height: '350px',
  width: 'auto'
}

const buttonStyle={
  alignItems: 'center'
}


var radioOptionsStyle = {
  textAlign: 'justify'

}


var reviewsUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.id,
      stars: '',
      youRecommend: '',
      comfort: '',
      size: '',
      width: '',
      quality: '',
      length: '',
      fit: '',
        ComfortId: '',
        SizeId: '',
        WidthId: '',
        QualityId: '',
        LengthId: '',
        FitId: '',
      summary: '',
      body: '',
      requiredBody: false,
      nickName: '',
      email: '',
      properEmail: true,
      url1: '',
      url2: '',
      url3: '',
      url4: '',
      url5: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
  }

  componentDidMount() {

    for (var keys in this.props.meta) {

      this.setState({
        [`${keys}Id`]: this.props.meta[keys].id
      })
    }
  }

  //!this.state.size || !this.state.width || !this.state.comfort || !this.state.quality || !this.state.length || !this.state.fit ||

  handleStarChange(value) {
    this.setState({
      stars: value
    })
  }


  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    var fullCharacteristics = {};
    var conditionArray = []

    if (this.props.meta.Size) {
      fullCharacteristics[this.state.SizeId] = parseInt(this.state.size)
      conditionArray.push(!this.state.size)
    }
    if (this.props.meta.Width) {
      fullCharacteristics[this.state.WidthId] = parseInt(this.state.width)
      conditionArray.push(!this.state.width)
    }
    if (this.props.meta.Comfort) {
      fullCharacteristics[this.state.ComfortId]= parseInt(this.state.comfort)
      conditionArray.push(!this.state.comfort)
    }
    if (this.props.meta.Quality) {
      fullCharacteristics[this.state.QualityId] = parseInt(this.state.quality)
      conditionArray.push(!this.state.quality)
    }
    if (this.props.meta.Length) {
      fullCharacteristics[this.state.LengthId] = parseInt(this.state.length)
      conditionArray.push(!this.state.length)
    }
    if (this.props.meta.Fit) {
      fullCharacteristics[this.state.FitId] = parseInt(this.state.fit)
      conditionArray.push(!this.state.fit)
    }


    if(this.state.email.includes('@')) {
      this.setState({properEmail: true})
    }
    // body too short
    if(this.state.body.length < 50 || !this.state.stars || !this.state.youRecommend || !this.state.nickName || !this.state.email) {
      this.setState({requiredBody: true})

      if(!this.state.email.includes('@')) {
        this.setState({properEmail: false})
      }

    } else {
      var photoUrls = []
      if(this.state.url1) {
        photoUrls.push(this.state.url1)
      }
      if(this.state.url2) {
        photoUrls.push(this.state.url2)
      }
      if(this.state.url3) {
        photoUrls.push(this.state.url3)
      }
      if(this.state.url4) {
        photoUrls.push(this.state.url4)
      }
      if(this.state.url5) {
        photoUrls.push(this.state.url5)
      }

      var boolean = this.state.youRecommend == 'true';

      var body={
        "product_id": parseInt(this.state.product_id),
        "rating": parseInt(this.state.stars),
        "summary": this.state.summary,
        "body": this.state.body,
        "recommend": true,
        "name": this.state.nickName,
        "email": this.state.email,
        "photos": photoUrls,
        "characteristics": fullCharacteristics
      }

      //post request new review axios.post(url[, data[, config]])
      axios.post(reviewsUrl, body, {
        headers: {
          Authorization: APIkey
        }
      })
      .then((data)=> {
          console.log('success')
      })
      .catch((error)=> {
        throw(error);
      })
    this.props.HideNewReviewModal()
    }
  }
  selectOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
  const showHideClassName = this.props.showReviewModal ? "modal display-block" : "modal display-none";
  const redRequiredBody = this.state.requiredBody ? <span style={{color: 'red', fontSize: 'large'}}>*</span> : <span></span>;
  const minBody = this.state.body.length < 50 ? <span style={{fontSize: '14px', fontWeight: 'bold'}}>{` Characters left to reach minimun length: [${50-this.state.body.length}].:`}</span> : <span style={{fontSize: '10px'}}>Minimum reached</span>
  const emailFormat = this.state.properEmail ?  <span></span> : <span style={{color: 'red', fontSize: 'large'}}>incorrect Email Format</span>
  var starDescription;
  switch (this.state.stars) {
    case '':
      starDescription = <span></span>
      break;
    case 1:
      starDescription = <span className='ratingDescription'> 1 star - “Poor”</span>
      break;
    case 2:
      starDescription = <span className='ratingDescription'> 2 stars - “Fair”</span>
      break;
    case 3:
      starDescription = <span className='ratingDescription'> 3 stars - “Average”</span>
      break;
    case 4:
      starDescription = <span className='ratingDescription'> 4 stars - “Good”</span>
      break;
    case 5:
      starDescription = <span className='ratingDescription'> 5 stars - “Great”</span>
      break;
  }

  var renderSize = <span></span>;
  if(this.props.meta.Size) {
    renderSize =   (
      <span className='radioOptionsStyle'>
        <div style={radioOptionsStyle} onChange={this.selectOnChange}> <span className='charTitleStyle'>Size:</span> {redRequiredBody}
          <input style={{color: 'red'}} type="radio" value={1} name="size" /> A size too small
          <input type="radio" value={2} name="size" /> ½ a size too small
          <input type="radio" value={3} name="size" /> Perfect
          <input type="radio" value={4} name="size" /> ½ a size too big
          <input type="radio" value={5} name="size" /> A size too wide
        </div>

      </span>
      )
  }
  var renderComfort = <span></span>;
  if (this.props.meta.Comfort) {
    renderComfort = (
      <span className='radioOptionsStyle'>
          <div  onChange={this.selectOnChange}>  <span className='charTitleStyle'>Comfort:</span> {redRequiredBody}
            <input type="radio" value={1} name="comfort" /> Uncomfortable
            <input type="radio" value={2} name="comfort" /> Slightly uncomfortable
            <input type="radio" value={3} name="comfort" /> Ok
            <input type="radio" value={4} name="comfort" /> Comfortable
            <input type="radio" value={5} name="comfort" /> Perfect
          </div>

      </span>
    )
  }
  var renderWidth = <span></span>;
  if (this.props.meta.Width) {
    renderWidth = (
      <span className='radioOptionsStyle'>
          <div  onChange={this.selectOnChange}>  <span className='charTitleStyle'>Width:</span> {redRequiredBody}
            <input type="radio" value={1} name="width" /> Too narrow
            <input type="radio" value={2} name="width" /> Slightly narrow
            <input type="radio" value={3} name="width" /> Perfect
            <input type="radio" value={4} name="width" /> Slightly wide
            <input type="radio" value={5} name="width" /> Too wide
          </div>

      </span>
    )
  }
  var renderQuality = <span></span>;
  if (this.props.meta.Quality) {
    renderWidth = (
      <span className='radioOptionsStyle'>
          <div onChange={this.selectOnChange}>  <span className='charTitleStyle'>Quality</span> {redRequiredBody}
            <input type="radio" value={1} name="quality" /> Poor
            <input type="radio" value={2} name="quality" /> Below average
            <input type="radio" value={3} name="quality" /> What I expected
            <input type="radio" value={4} name="quality" /> Pretty great
            <input type="radio" value={5} name="quality" /> Perfect
          </div>

      </span>
    )
  }

  var renderLength = <span></span>;
  if (this.props.meta.Length) {
    renderLength = (
      <span className='radioOptionsStyle'>
        <div onChange={this.selectOnChange}>  <span className='charTitleStyle'>Length</span> {redRequiredBody}
          <input type="radio" value={1} name="length" /> Runs Short
          <input type="radio" value={2} name="length" /> Runs slightly short
          <input type="radio" value={3} name="length" /> Perfect
          <input type="radio" value={4} name="length" /> Runs slightly long
          <input type="radio" value={5} name="length" /> Runs long
      </div>

    </span>
    )
  }
  var renderFit = <span></span>;
  if (this.props.meta.Fit) {
    renderFit = (
      <span className='radioOptionsStyle'>
        <div onChange={this.selectOnChange}>  <span className='charTitleStyle'>Fit</span> {redRequiredBody}
          <input type="radio" value={1} name="fit" /> Runs tight
          <input type="radio" value={2} name="fit" /> Runs slightly tight
          <input type="radio" value={3} name="fit" /> Perfect
          <input type="radio" value={4} name="fit" /> Runs slightly long
          <input type="radio" value={5} name="fit" /> Runs long
        </div>

      </span>
    )
  }



  return (
    <div className={showHideClassName}>
      <section className="modal-main-NewReview">
      {this.props.children}
        <form onSubmit={this.handleSubmit}> <h3 className='newReviewTitle'>Add new review details</h3>
            <label>
            {/* Stars Ratings */}
              <div className='modalRatingTop'> <span className='ratingDescription'>Overall rating:</span>
                {starDescription}{redRequiredBody}
                <Stars
                  handlestarchange={this.handleStarChange}
                  stars={this.state.stars}
                />
            </div>

          {/* Would you recomend? Yes or no */}
          <div
            className='radioOptionsStyle'
            onChange={this.selectOnChange}>
            <span className='charTitleStyle'>Would you recommend this product?</span>
            {redRequiredBody}
            <input className='ratingDescription' type="radio" value={true} name="youRecommend" /> Yes
            <input className='ratingDescription' type="radio" value={false} name="youRecommend" /> No
          </div>

            {/* Product characteristics */}
            <div style={{textAlign: 'center', fontSize: '28px', fontWeight: 'bold'}}>Please choose the option that best describe the product:</div>
            {renderSize}
            {renderWidth}
            {renderComfort}
            {renderQuality}
            {renderLength}
            {renderFit}

            {/* Title */}
            <div className='summaryContainer'>
              <span className='reviewSummaryTitle'>Review Summary</span>
              <span style={{fontSize: '10px'}}>{` (${60-this.state.summary.length} characters left)`}</span>:
              <input type="text" maxLength='60' name='summary' placeholder={'Example: Best purchase ever!'}style={{width: '90%', align: 'middle'}} value={this.state.summary} onChange={this.selectOnChange}/>
            </div>

            {/* Body */}
            <div className='bodyContainer'>
              <span className='reviewSummaryTitle'>Write your review</span>
              <span style={{fontSize: '10px'}}/>  {minBody}     {redRequiredBody}
              <textarea
                rows="5"
                style={{width: '90%', align: 'middle'}}
                cols="98"
                maxLength='1000'
                name='body'
                placeholder={'Why did you like the product or not?'}
                value={this.state.body}
                onChange={this.selectOnChange}/>
            </div>

            {/* NickName */}
            <div className='nickNameContainer'>
              <span className="reviewSummaryTitle">What is your nickname: </span>
              {redRequiredBody}
              <input type="text" maxLength='60' name='nickName' placeholder={'Example: jackson11!'}style={{width: '90%', align: 'middle'}} value={this.state.nickName} onChange={this.selectOnChange}/>
              <br></br>
              <span style={{fontSize: '14px', fontWeight: 'bold'}}>For privacy reasons, do not use your full name or email address</span>
            </div>

            {/* email */}

            <div className='emailContainer'>
              <span className='reviewSummaryTitle'>
                Your email:
              </span>
              {emailFormat}
              {redRequiredBody}
              <input type="text" maxLength='60' name='email' placeholder={'Example: jackson11@email.com'}style={{width: '90%', align: 'middle'}} value={this.state.email} onChange={this.selectOnChange}/>
              <span style={{fontSize: '14px', fontWeight: 'bold'}}>For authentication reasons, you will not be emailed</span>
            </div>

            {/* Images */}
            <div className='imagesTitle'>
                Upload your desired Images
              </div>
            <div className='imagesContainer'>

              <div className='leftImages'>
                <div>
                  {`Image 1 (Url):`} <input type="text" name='url1' value={this.state.name} onChange={this.selectOnChange}/>
                </div>
                <div>
                  {`Image 2 (Url):`} <input type="text" name='url2' value={this.state.name} onChange={this.selectOnChange}/>
                </div>
                <div>
                  {`Image 3 (Url):`} <input type="text" name='url3' value={this.state.name} onChange={this.selectOnChange}/>
                </div>
              </div>
              <div className='rightImages'>
                <div>
                  {`Image 4 (Url):`} <input type="text" name='url4' value={this.state.name} onChange={this.selectOnChange}/>
                </div>
                <div>
                  {`Image 5 (Url):`} <input type="text" name='url5' value={this.state.name} onChange={this.selectOnChange}/>
                </div>
              </div>
            </div>
          </label>

          {/* buttons */}
          <div className='modalButtons'>
            <div>
              <input className="submit-review-modal-button"type="submit" value="submit" />
            </div>
            <div>
              <input  className="hide-review-modal-button"onClick={this.props.HideNewReviewModal} type="submit" value="hide" />
            </div>
          </div>
        </form>

      </section>
    </div>
  );
  }
};

export default ReviewModal;