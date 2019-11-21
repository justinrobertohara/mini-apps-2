import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';
import ReactPaginate from 'react-paginate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      results: '',
      searched: false,
      numOfPages: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  handleChange(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  handleSubmit(event) {
    console.log(event.target);
    alert('A name was submitted: ' + this.state.searchKeyword);
    event.preventDefault();
    axios
      .get(`http://localhost:3000/events/?q=${this.state.searchKeyword}`)
      .then(resp => {
        this.setState({
          numOfPages: Math.ceil(resp.data.length / 10)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePageClick(data) {
    let pageNumber = data.selected + 1;
    axios
      .get(
        `http://localhost:3000/events?_page=${pageNumber}&q=${this.state.searchKeyword}`
      )
      .then(results => {
        this.setState({
          searched: true,
          results: results.data
        });
      })
      .catch(err => {
        console.log(err);
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
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.numOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}
