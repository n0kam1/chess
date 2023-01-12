require("dotenv").config();

const express = require("express");
const controllers = require("./controllers.js");
const cors = require('cors');
const app = express();

// TODO: Add app-wide middleware
app.use(express.json());


const corsOptions = {
  origin: '*',
  credential: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.get('/chess', controllers.getBoards);

app.post('/chess', controllers.addBoard);
app.get('/chess/delete', controllers.deleteBoards);

app.all('/chess', (req, res, next) => {
  res.send('This has probably not been implemented yet');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);