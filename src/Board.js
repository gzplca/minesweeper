import React from 'react';
import Square from './Square';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(81).fill(null),
            new: true
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    layMines(i) {
        const limit = 10;
        let currentNum = 0;
        const squares = this.state.squares.slice();
        while (currentNum < limit) {
            let index = Math.floor(Math.random() * 9 * 9);
            if (index !== i && squares[index] !== -1) {
                squares[index] = -1
            }
            currentNum++;
        }
        this.setState({ squares: squares, new: false });
        setTimeout(() => {
            this.checkAround(i);
        }, 1000);
    }

    handleClick(i) {
        if (this.state.new) {
            this.layMines(i)
        } else {
            if (this.state.squares[i] === -1) {
                alert('fail');
            } else {
                this.checkAround(i);
            }
        }
    }

    checkAround(i, sentSquares) {
        let minerNum = 0;
        let leftLine = i % 9 !== 0 ? [i - 9 - 1, i - 1, i + 9 - 1] : [];
        let rightLine = (i + 1) % 9 !== 0 ? [i - 9 + 1, i + 1, i + 9 + 1] : [];
        let checkIndexArr = [i + 9, i - 9].concat(leftLine, rightLine);
        const squares = sentSquares ?? this.state.squares.slice();
        let availableIndexArr = checkIndexArr.filter(index => index >= 0 && index < 9 * 9 && (squares[index] === null || squares[index] === -1));
        availableIndexArr.forEach(index => {
            if (squares[index] === -1) {
                minerNum++;
            }
        });
        squares[i] = minerNum;
        this.setState({ squares: squares });
        if (minerNum === 0) {
            availableIndexArr.forEach(index => {
                if (!squares[index]) {
                    this.checkAround(index, squares);
                }
            });
        }
        this.setState({ squares: squares });
    }


    boardArray() {
        const row = 9;
        const col = 9;
        let boardArray = [];
        let index = 0;
        for (let i = 0; i < row; i++) {
            let boardRowArray = [];
            for (let j = 0; j < col; j++) {
                boardRowArray.push(index++);
            }
            boardArray.push(boardRowArray);
        }
        return boardArray;
    }

    render() {
        const boardElements = this.boardArray();
        return (
            <div className="Board">
                {boardElements.map(rowEelments => {
                    return (
                        <div className="board-row">
                            {rowEelments.map(element => {
                                return this.renderSquare(element)
                            })}
                        </div>
                    )
                })}
            </div >
        )
    }
}


export default Board;