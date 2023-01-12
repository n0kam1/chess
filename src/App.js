
import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { Button, Grid, TextField, Paper, Typography, ImageList } from '@mui/material';
import axios from 'axios';
import { Container } from '@mui/system';
import Board from './Board.jsx';

function App() {
  const [game, setGame] = useState(new Chess());
  const [render, setRender] = useState(false);
  const [name, setName] = useState('');
  const [boards, setBoards] = useState([]);

  // useEffect(() => {
  //   setRender(!render);
  // }), [game._board];

  function makeAMove(move) {
    const gameCopy = game;
    const result = gameCopy.move(move);
    setGame(result);
    // return result;
  }



  // function makeRandomMove() {
  //   const possibleMove = game.moves();

  //   if (game.isGameOver() || game.isDraw() || possibleMove.length === 0) {
  //     return;
  //   }

  //   const randomIndex = Math.floor(Math.random() * possibleMove.length);

  //   makeAMove(game.move(possibleMove[randomIndex]));
  // }

  function onDrop(source, target) { //action when dropped by user
    // makeAMove({
    //   from: source,
    //   to: target,
    //   promotion: 'q'
    // });
    // // setTimeout(makeRandomMove, 200);
    // setGame(game.move({ from: source, to: target }));
    console.log(source, target);
    // game.move('e4');
    // game.move('e5');
    // console.log(game.history());
    game.move({ from: source, to: target });
    setRender(!render);
    // console.log(game);

    // return true;
  }

  async function getBoards() {
    const { data } = await axios.get('http://localhost:3000/chess');
    setBoards(data);
    // console.log(game.history());
  }

  async function deleteBoards() {
    const { data } = await axios.get('http://localhost:3000/chess/delete');
    // console.log(game.history());
  }

  async function addBoard() {
    const { data } = await axios.post('http://localhost:3000/chess', {
      name: name,
      fen: game.fen(),
      history: game.history()
    });
    console.log(data);
  }

  function handleInput(e) {
    setName(e.target.value);
  }

  function onBoardClick(e) {
    console.log(e);
  }
  return (game &&



    <Grid container spacing={2} className="app" justify="center">

      <Paper item xs={12} style={{ marginBottom: '5em', background: '#ada7cc', boxShadow: '15px 15px 35px 5px #ada7cc' }}>
        {boards.map((board) => {
          return <Board game={game} setGame={setGame} board={board} render={render} setRender={setRender} />;
        })}
      </Paper>
      <Grid item xs={12} >
        <Chessboard
          customDarkSquareStyle={{ backgroundColor: '#55516b' }}
          customLightSquareStyle={{ backgroundColor: '#ada7cc' }}
          render={render}
          position={game.fen()}
          onPieceDrop={onDrop}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleInput} value={name} />
      </Grid>

      <Grid item xs={6}>
        {/* <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form> */}


        <Button variant="contained" sx={{
          width: 300,
          height: 100,
          color: 'white',
          background: '#55516b'
        }} onClick={addBoard} style={{ padding: 20, margin: 20 }}>SAVE CURRENT BOARD</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' onClick={getBoards} sx={{
          marginTop: 10,
          width: 300,
          height: 100,
          color: 'white',
          background: '#55516b'
        }}>LOG ALL BOARDS</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' onClick={deleteBoards} sx={{
          marginTop: 10,
          width: 300,
          height: 100,
          color: 'white',
          background: '#55516b'
        }}>DELETE ALL BOARDS</Button>
      </Grid>

    </Grid >
  );
}

export default App;
