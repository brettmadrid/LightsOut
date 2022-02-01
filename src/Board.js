import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightsStartOn: 0.25,
  };
  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.props.ncols; i++) {
      let row = [];
      for (let j = 0; j < this.props.nrows; j++) {
        row.push(Math.random() < this.props.chanceLightsStartOn);
      }
      board.push(row);
    }
    return board;
  };

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = coord => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    // flip self
    // flip north neighbor
    // flip south neighbor
    // flip east neighbor
    // flip west neighbor

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({ board, hasWon });
  };

  /** Render game board or winning message. */
  makeTable = () => {
    let tblBoard = [];
  };

  render() {
    let tblBoard = [];
    for (let i = 0; i < this.props.ncols; i++) {
      let row = [];
      for (let j = 0; j < this.props.nrows; j++) {
        let coord = `${i}-${j}`;
        row.push(<Cell key={coord} isLit={this.state.board[i][j]} />);
      }
      tblBoard.push(<tr key={i}>{row}</tr>);
    }
    return (
      // <div>
      //   {this.state.hasWon ? (
      //     <div className='winner'>
      //       <span className='neon-orange'>YOU</span>
      //       <span className='neon-blue'>WIN!</span>
      //     </div>
      //   ) : (
      //     <div>
      //       <div className='Board-title'>
      //         <div className='neon-orange'>Lights</div>
      //         <div className='neon-blue'>Out</div>
      //       </div>
      //       {this.makeTable()}
      //     </div>
      //   )}
      // </div>

      <table className='Board'>
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }
}

export default Board;
