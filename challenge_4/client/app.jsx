import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]
      ]
    };
    this.createBoard = this.createBoard.bind(this);
    this.revealButton = this.revealButton.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    let newBoard = [
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]
    ];

    for (let i = 0; i < 10; i++) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      if (newBoard[randomX][randomY] !== [1]) {
        newBoard[randomX][randomY] = [1];
      }
    }

    this.setState({
      board: newBoard
    });
  }

  revealButton(e) {
    console.log('you have clicked a target', e.target.value);
  }

  render() {
    const board = this.state.board;

    const divStyle = {
      visibility: 'visible'
    };

    const clickedStyle = {
      visibility: 'visible'
    };

    const rowsAndColumns = board.map(row => {
      return (
        <div>
          {row.map(individual => {
            return (
              <button
                style={divStyle}
                value={individual}
                onClick={e => this.revealButton(e)}
              >
                {individual}
              </button>
            );
          })}
        </div>
      );
    });

    return <div>{rowsAndColumns}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
