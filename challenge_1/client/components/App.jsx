import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';
import ReactPaginate from './ReactPaginate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      results: '',
      searched: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  handleSubmit(event) {
    console.log(event.target);
    alert('A name was submitted: ' + this.state.searchKeyword);
    event.preventDefault();

    let keyword = this.state.searchKeyword;

    axios
      .get(`http://localhost:3000/events?q=${keyword}&_page`)
      // .get(`http://localhost:3000/events/?q=${keyword}`)

      .then(resp => {
        this.setState({
          results: resp.data,
          searched: true
        });
        console.log(resp);
      })
      .then(() => {
        console.log('this is our searched results', this.state.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <label>
            Historical Event Search Bar
            <br></br>
            <input
              type="text"
              name="searchKeyword"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
        {this.state.searched && <Results results={this.state.results} />}
      </div>
      <div><ReactPaginate/></div>
    );
  }
}
