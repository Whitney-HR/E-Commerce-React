import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/Review.jsx';
import SearchBar from './Questions/SearchBar.jsx';


class App extends React.Component {
constructor(props) {
  super(props)
}

render() {
  return (
    <div>
      <h1>Hello World!!</h1>
      <Questions id={19089}/>
    </div>
  )
}
}

export default App;

