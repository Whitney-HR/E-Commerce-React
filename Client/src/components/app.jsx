import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/Reviews.jsx';


class App extends React.Component {
constructor(props) {
  super(props)
}

render() {
  return (
    <div>
      <h1>Hello World!!</h1>
      <Overview />
      <Questions />
      <Reviews />
    </div>
  )
}
}

export default App;

