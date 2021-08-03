import React from 'react';
import './imageModalStyle.css'

const thumbnailStyle = {
  border: '2px solid black',
  height: '350px',
  width: 'auto'
}

const buttonStyle={
  alignItems: 'center'
}


var charTitleStyle = {
  fontSize: 'large',
  fontWeight: "bold"
}

var radioOptionsStyle = {
  textAlign: 'justify'

}


var reviewsUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      stars: '',
      youRecommend: '',
      size: '',
      sizeId: '',
      width: '',
      widthID: '',
      comfort: '',
      comfortId: '',
      quality: '',
      qualityId: '',
      length: '',
      lengthId: '',
      fit: '',
      fitId: '',
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


  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })

  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.state.email.includes('@')) {
      this.setState({properEmail: true})
    }
    // body too short
    if(this.state.body.length < 50 || !this.state.stars || !this.state.youRecommend || !this.state.size || !this.state.width || !this.state.comfort || !this.state.quality || !this.state.length || !this.state.fit || !this.state.nickName || !this.state.email) {
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

      var fullCharacteristics = {
        [this.state.sizeId]: this.state.size,
        [this.sate.widthID]: this.state.width,
        [this.state.comfortId]: this.state.comfort,
        [this.state.qualityId]: this.state.quality,
        [this.state.lengthId]: this.state.length,
        [this.state.fitId]: this.state.fit
      }


      var body={
        "product_id": this.state.product_id,
        "rating": this.state.stars,
        "summary": this.state.summary,
        "body": this.state.body,
        "recommend": this.state.youRecommend,
        "name": this.state.nickName,
        "email": this.state.email,
        "photos": photoUrls,
        "characteristics": fullCharacteristics


      }

      //post request new review axios.post(url[, data[, config]])
      axios.post(reviewsUrl+this.props.id+'&sort=relevant&count=100', {
        headers: {
          Authorization: APIkey
        }
      })
      .then((data)=> {
        this.setState({
          currentFilter: 'relevant',
          reviewCount: data.data.results.length,
          comments: data.data.results
        })
      })
      .catch((error)=> {
        throw(error);
      })







      // axios post request here
    console.log('submit')
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
  const minBody = this.state.body.length < 50 ? <span style={{fontSize: '10px'}}>{` Minimum required characters left: [${50-this.state.body.length}].:`}</span> : <span style={{fontSize: '10px'}}>Minimum reached</span>
  const emailFormat = this.state.properEmail ?  <span></span> : <span style={{color: 'red', fontSize: 'large'}}>incorrect Email Format</span>
  var starDescription;
  switch (this.state.stars) {
    case '':
      starDescription = <span></span>
      break;
    case '1':
      starDescription = <span>1 star - “Poor”</span>
      break;
    case '2':
      starDescription = <span>2 stars - “Fair”</span>
      break;
    case '3':
      starDescription = <span>3 stars - “Average”</span>
      break;
    case '4':
      starDescription = <span>4 stars - “Good”</span>
      break;
    case '5':
      starDescription = <span>5 stars - “Great”</span>
      break;
  }


  return (
    <div className={showHideClassName}>
      <section className="modal-main-NewReview">
      {this.props.children}
        <form onSubmit={this.handleSubmit}> <h1 style={{textAlign: 'center'}}>Add new review details</h1>
            <br></br>
            <label>

            <br></br>
            <div> Overall rating:
              {starDescription}{redRequiredBody}
              <br></br>
              <input type='range' value={this.state.stars} name="stars" min="1" max="5" step='1' onChange={this.selectOnChange} ></input>
            </div>



            <br></br>

          <div style={radioOptionsStyle}  onChange={this.selectOnChange}> <span style={charTitleStyle}>Whould you recommend this product?</span>{redRequiredBody}
              <input type="radio" value={true} name="youRecommend" /> Yes
              <input type="radio" value={false} name="youRecommend" /> No
            </div>
            <br></br>
            <div style={{textAlign: 'center', fontSize: 'large',}}>Please describe the following:</div>
            <br></br>
            <div style={radioOptionsStyle} onChange={this.selectOnChange}> <span style={charTitleStyle}>Size:</span> {redRequiredBody}
              <input style={{color: 'red'}} type="radio" value={1} name="size" /> A size too small
              <input type="radio" value={2} name="size" /> ½ a size too small
              <input type="radio" value={3} name="size" /> Perfect
              <input type="radio" value={4} name="size" /> ½ a size too big
              <input type="radio" value={5} name="size" /> A size too wide
            </div>
            <br></br>
            <div style={radioOptionsStyle}  onChange={this.selectOnChange}>  <span style={charTitleStyle}>Width:</span> {redRequiredBody}
              <input type="radio" value={1} name="width" /> Too narrow
              <input type="radio" value={2} name="width" /> Slightly narrow
              <input type="radio" value={3} name="width" /> Perfect
              <input type="radio" value={4} name="width" /> Slightly wide
              <input type="radio" value={5} name="width" /> Too wide
            </div>
            <br></br>
            <div style={radioOptionsStyle}  onChange={this.selectOnChange}>  <span style={charTitleStyle}>Comfort</span> {redRequiredBody}
              <input type="radio" value={1} name="comfort" /> Uncomfortable
              <input type="radio" value={2} name="comfort" /> Slightly uncomfortable
              <input type="radio" value={3} name="comfort" /> Ok
              <input type="radio" value={4} name="comfort" /> Comfortable
              <input type="radio" value={5} name="comfort" /> Perfect
            </div>
            <br></br>
            <div style={radioOptionsStyle}  onChange={this.selectOnChange}>  <span style={charTitleStyle}>Quality</span> {redRequiredBody}
              <input type="radio" value={1} name="quality" /> Poor
              <input type="radio" value={2} name="quality" /> Below average
              <input type="radio" value={3} name="quality" /> What I expected
              <input type="radio" value={4} name="quality" /> Pretty great
              <input type="radio" value={5} name="quality" /> Perfect
            </div>
            <br></br>
            <div style={radioOptionsStyle} onChange={this.selectOnChange}>  <span style={charTitleStyle}>Length</span> {redRequiredBody}
              <input type="radio" value={1} name="length" /> Runs Short
              <input type="radio" value={2} name="length" /> Runs slightly short
              <input type="radio" value={3} name="length" /> Perfect
              <input type="radio" value={4} name="length" /> Runs slightly long
              <input type="radio" value={5} name="length" /> Runs long
            </div>
            <br></br>
            <div style={radioOptionsStyle} onChange={this.selectOnChange}>  <span style={charTitleStyle}>Fit</span> {redRequiredBody}
              <input type="radio" value={1} name="fit" /> Runs tight
              <input type="radio" value={2} name="fit" /> Runs slightly tight
              <input type="radio" value={3} name="fit" /> Perfect
              <input type="radio" value={4} name="fit" /> Runs slightly long
              <input type="radio" value={5} name="fit" /> Runs long
            </div>
            <br></br>
            Review Summary<span style={{fontSize: '10px'}}>{` (${60-this.state.summary.length} characters left)`}</span>:
            <br></br>
            <input type="text" maxLength='60' name='summary' placeholder={'Example: Best purchase ever!'}style={{width: '90%', align: 'middle'}} value={this.state.summary} onChange={this.selectOnChange}/>
            <br></br>
            <br></br>
            <span>Write your review</span><span style={{fontSize: '10px'}}/>  {minBody}     {redRequiredBody}
            <textarea rows="5" cols="98" maxLength='1000' name='body' placeholder={'Why did you like the product or not?'} value={this.state.body} onChange={this.selectOnChange}/>
            <br></br>

            <div>What is your nickname:{redRequiredBody}
              <input type="text" maxLength='60' name='nickName' placeholder={'Example: jackson11!'}style={{width: '90%', align: 'middle'}} value={this.state.nickName} onChange={this.selectOnChange}/>
            </div>
            <span style={{fontSize: '10px'}}>For privacy reasons, do not use your full name or email address</span>
            <br></br>
            <br></br>
            <div>Your email:{emailFormat}{redRequiredBody}
              <input type="text" maxLength='60' name='email' placeholder={'Example: jackson11@email.com'}style={{width: '90%', align: 'middle'}} value={this.state.email} onChange={this.selectOnChange}/>
            </div>
            <span style={{fontSize: '10px'}}>For authentication reasons, you will not be emailed</span>


            <br></br>
            <br></br>
            {`Image 1 (Url):`} <input type="text" name='url1' value={this.state.name} onChange={this.selectOnChange}/>
            <br></br>
            {`Image 2 (Url):`} <input type="text" name='url2' value={this.state.name} onChange={this.selectOnChange}/>
            <br></br>
            {`Image 3 (Url):`} <input type="text" name='url3' value={this.state.name} onChange={this.selectOnChange}/>
            <br></br>
            {`Image 4 (Url):`} <input type="text" name='url4' value={this.state.name} onChange={this.selectOnChange}/>
            <br></br>
            {`Image 5 (Url):`} <input type="text" name='url5' value={this.state.name} onChange={this.selectOnChange}/>
            <br></br>
            {`Image 5 (Url):`} <input type="text" name='url5' value={this.state.name} onChange={this.selectOnChange}/>
            <br></br>
          </label>
          <input type="submit" value="submit" />
          <input  onClick={this.props.HideNewReviewModal} type="submit" value="hide" />
        </form>

      </section>
    </div>
  );
  }
};

export default ReviewModal;