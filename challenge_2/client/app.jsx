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
        console.log('getting json object jack from axios', response.data.bpi);

        let keys = Object.keys(response.data.bpi);
        let values = Object.values(response.data.bpi);

        var ctx = 'myChart';

        new Chart(ctx, {
          type: 'line',
          data: {
            //Bring in data
            labels: keys,
            datasets: [
              {
                label: 'Bitcoin Value in USD',
                data: values
              }
            ]
          },
          options: {
            //Customize chart options
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Bitcoin Tracker App </h1>
        <canvas
          id="myChart"
          ref={this.chartRef}
          width="400"
          height="400"
        ></canvas>
        <p>"Powered by CoinDesk"</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
