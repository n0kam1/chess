require('dotenv').config();
const mongoose = require('mongoose');



// It's not a good idea to hardcode connection credentials here.
// Configure process.env variables in ../.env and use them
// in your connection code: e.g. process.env.DB_NAME

// TODO: Set up a connection to the "thischord" MongoDB database



mongoose.connect('mongodb://localhost:27017/chess'); // add localhost

// use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled


const boardSchema = new mongoose.Schema(
  {
    name: String,
    fen: String,
    history: [String]
    // TODO: Define fields here...
  },
  { timestamps: true } // will automatically create and set `createdAt` and `updatedAt` timestamps
);

const Board = new mongoose.model('Board', boardSchema); //  TODO: Fill in arguments!

// const Song = new Tab();

module.exports = Board;
