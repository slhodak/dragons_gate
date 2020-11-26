import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1>Dragon's Gate</h1>
      </div>
    )
  }
}

ReactDOM.render(document.getElementsByClassName('root')[0], <App />);
