let express = require('express');
let path = require('path');
let controller = require('./controllers.js');


let app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

//ROUTES TO BE ADDED FOR GET/POST? UPDATE/DElETE


// app.get('atelier/api', controller.review.get)
//InThe client
//axios.get('/api/santiago/information')

// app.get('/overview/item', controllers.review.get)

// app.get('/reviews/starts')
/*
GET /products
GET /products/:product_id
GET /products/:product_id/styles
GET /products/:product_id/related

GET/reviews/
GET/reviews/meta
POST/reviews
PUT /reviews/:review_id/helpful
PUT /reviews/:review_id/report

GET /qa/questions
GET /qa/questions/:question_id/answers
POST /qa/questions
POST /qa/questions/:question_id/answers
PUT /qa/questions/:question_id/helpful
PUT /qa/questions/:question_id/report

GET /cart
POST /cart

POST /interactions
*/

/**
 * var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Listening on: ", host, port)
})

const port = 3010;

app.listen(port, () => {
  console.log('Success! Server Initialized');
})
 */

const port =  3737;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
})