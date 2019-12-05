import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
const axios = require('axios');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(response => {
        console.log('getting json object jack from axios', response.data);
      })
      .catch(err => {
        console.log(err);
      });

    var ctx = 'myChart';

    new Chart(ctx, {
      type: 'line',
      data: {
        //Bring in data
        labels: ['Jan', 'Feb', 'March'],
        datasets: [
          {
            label: 'Sales',
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Hello From Bitcoin Tracker App</h1>

        <canvas
          id="myChart"
          ref={this.chartRef}
          width="400"
          height="400"
        ></canvas>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
