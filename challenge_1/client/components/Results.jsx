import React from 'react';
import axios from 'axios';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let listOfResults = this.props.results;
    listOfResults = listOfResults.map(item => {
      return (
        <div>
          Date :{item.date} <br></br>
          Description: {item.description}
        </div>
      );
    });
    return <div>{listOfResults}</div>;
  }
}
