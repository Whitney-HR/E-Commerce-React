import React, { useState, useEffect, useLayoutEffect } from 'react';
import token from '/Client/src/env/config.js';
import axios from 'axios';

var Tracker = (element, widget) => {
  var today = new Date ();
  var stringDay = JSON.stringify(today);

  var body = {"element": element , "widget": widget, "time": stringDay}

  axios.post (`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/interactions`, body , { headers: {  Authorization: token } })
  .then(data => {
    console.log('Logged a click')
  })
  .catch(err => {
    console.log(err)
  });


}

export default Tracker;