import React from 'react';
import ReactDOM from 'react-dom';
import { runInThisContext } from 'vm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bowling: 'bowling',
      frame: 1,
      roll: 1,
      score: 0,
      tenthFrame: [],
      game: [[], [], [], [], [], [], [], [], [], []],
      newScore: 0
    };
    this.getScore = this.getScore.bind(this);
    this.newGame = this.newGame.bind(this);
    this.tallyScore = this.tallyScore.bind(this);
  }

  newGame() {
    this.setState({
      frame: 1,
      roll: 1,
      score: 0,
      firstRoll: null,
      lastFrame: null,
      extraPinfall: null,
      game: [[], [], [], [], [], [], [], [], [], []],
      newScore: 0,
      tenthFrame: []
    });
  }

  getScore(pinfall) {
    let updateGame = this.state.game;
    let frame = this.state.frame;
    let score = this.state.score;

    if (
      this.state.roll === 2 &&
      pinfall + updateGame[frame - 1][0] > 10 &&
      this.state.frame !== 10
    ) {
      alert('you cant have more than 10 pins knocked down');
      return this.setState({
        roll: 2,
        frame: this.state.frame
      });
    }

    if (this.state.frame === 10) {
      let tenthFrame = this.state.tenthFrame;

      if (this.state.roll === 1) {
        tenthFrame.push(pinfall);
      } else if (this.state.roll === 2) {
        console.log('roll 2');
      }

      if (tenthFrame.length <= 3) {
        tenthFrame.push(pinfall);

        if (
          tenthFrame[0] === 10 ||
          tenthFrame[1] === 10 ||
          tenthFrame[0] + tenthFrame[1] === 10
        ) {
          updateGame[frame - 1] = tenthFrame;
          this.setState({
            roll: this.state.roll + 1,
            game: updateGame
          });
        }
      }

      updateGame[frame - 1] = tenthFrame;

      if (this.state.roll === 1) {
        this.setState({
          roll: 2
        });
      }

      this.setState({
        tenthFrame: tenthFrame,
        game: updateGame
      });
    } else if (this.state.frame < 10 && updateGame[frame - 1].length === 0) {
      updateGame[frame - 1] = [pinfall];

      //strike roll

      if (pinfall === 10 && this.state.frame !== 10) {
        this.setState({
          roll: 1,
          frame: this.state.frame + 1,
          score: score + pinfall
        });

        //normal roll
      } else if (pinfall < 10) {
        this.setState({
          roll: this.state.roll + 1,
          game: updateGame,
          score: score + pinfall
        });
      }
    } else if (updateGame[frame - 1].length === 1) {
      let rollArr = updateGame[frame - 1];
      rollArr.push(pinfall);

      //spare roll
      if (rollArr[0] + rollArr[1] === 10 && this.state.frame === 10) {
        this.setState({
          roll: this.state.roll + 1,
          frame: this.state.frame,
          score: score + pinfall
        });
      }

      updateGame[frame - 1] = rollArr;

      if (this.frame !== 10) {
        this.setState({
          roll: 1,
          frame: this.state.frame + 1,
          game: updateGame,
          score: score + pinfall
        });
      }
    }

    let game = this.state.game;

    this.setState({
      newScore: this.tallyScore(game)
    });
  }

  tallyScore(arr) {
    let totalScore = 0;

    //looping through the frames
    for (let i = 0; i < arr.length; i++) {
      //last frame
      if (arr[9].length > 0) {
        //if the first roll is a strike
        if (arr[9][0] === 10) {
          //there are three roll in the array
          if (arr[9].length === 3) {
            //add all the of the numbers to the totalScore
            totalScore += arr[9][0] + arr[9][1] + arr[9][2];
          } else if (arr[9].length === 2) {
            //if there's only two then add the first two
            totalScore += arr[9][0] + arr[9][1];
          }
          //only add the first roll
          totalScore += arr[9][0];
        } else if (arr[9][1] === 10) {
          totalScore += arr[9][1] + arr[9][2];
        } else if (arr[9][0] + arr[9][1] === 10) {
          if (arr[9].length === 3) {
            totalScore += arr[9][0] + arr[9][1] + arr[9][2];
          } else {
            totalScore += arr[9][0] + arr[9][1];
          }
        }
      } else if (arr[i].length === 1 && arr[i][0] === 10) {
        //if your next frame is a strike
        // console.log('you have rolled a strike in the tally score');

        if (arr[i + 1].length === 1 && arr[i + 1][0] === 10) {
          // console.log('you have rolled two strikes in a row');

          //if next frame exists, add it to the score, if not just double the strike
          if (arr[i + 2].length >= 1) {
            // console.log('if the second strike exists block');
            totalScore += arr[i + 2][0];
          }
          // console.log('adding to the score');
          totalScore += 10;
        } else if (arr[i + 1].length === 1 && arr[i + 1][0] < 10) {
          let nextFrame = arr[i + 1][0];
          // console.log('bonus points on the second frame');
          totalScore += nextFrame;
        } else if (arr[i + 1].length === 2) {
          let nextTwoRolls = arr[i + 1][0] + arr[i + 1][1];
          totalScore += nextTwoRolls;
        }
        //add 10 to the score
        totalScore += 10;

        //spare logic
      } else if (arr[i].length === 2 && arr[i][0] + arr[i][1] === 10) {
        if (arr[i + 1].length > 0) {
          let extraPoint = arr[i + 1][0];
          totalScore += extraPoint;
        }
        totalScore += 10;
      } else if (arr[i].length === 2) {
        let frame = arr[i][0] + arr[i][1];
        totalScore += frame;
      } else if (arr[i].length === 1) {
        let frame = arr[i][0];
        totalScore += frame;
      }
    }

    return totalScore;
  }

  render() {
    return (
      <div>
        <h2>Pins Knocked</h2>
        <table>
          <tr>
            <td onClick={() => this.getScore(10)}>10</td>
            <td>X</td>
            <td onClick={() => this.getScore(0)}>0</td>
          </tr>
          <tr>
            <td onClick={() => this.getScore(7)}>7</td>
            <td onClick={() => this.getScore(8)}>8</td>
            <td onClick={() => this.getScore(9)}>9</td>
          </tr>
          <tr>
            <td onClick={() => this.getScore(4)}>4</td>
            <td onClick={() => this.getScore(5)}>5</td>
            <td onClick={() => this.getScore(6)}>6</td>
          </tr>
          <tr>
            <td onClick={() => this.getScore(1)}>1</td>
            <td onClick={() => this.getScore(2)}>2</td>
            <td onClick={() => this.getScore(3)}>3</td>
          </tr>
        </table>
        <hr></hr>
        <h2>Score Card</h2>
        <table>
          <tr>
            <td>Frame</td>
            <td>Roll </td>
            <td>Total Score</td>
          </tr>
          <tr>
            <td>{this.state.frame}</td>
            <td>{this.state.roll}</td>
            <td> {this.state.newScore}</td>
          </tr>
        </table>
        <button onClick={() => this.newGame()}>New Game</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
