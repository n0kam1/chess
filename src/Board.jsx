import React from "react";
import { Chess } from "chess.js";
import { set } from "mongoose";
import { Button, Grid, TextField, Paper, Typography, ImageList } from '@mui/material';

export default function Card({ board, game, render, setRender, setGame }) {

  let fen = board.fen;
  let history = board.history;

  function cardClick(e) {
    console.log(board.history);
    game.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    board.history.forEach(move => {
      setTimeout(() => { game.move(move); }, 1000);
      game.move(move);
      setRender(!render);
    });

  }

  return (<Button variant="contained" sx={{
    width: 100,
    height: 100,
    color: 'white',
    background: '#55516b'
  }} onClick={cardClick} style={{ padding: 20, margin: 20 }}>{board.name}</Button>);
}