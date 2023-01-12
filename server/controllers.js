const Board = require("./db.js");

const getBoards = (req, res) => {
  Board.find()
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    }
    );
};

const deleteBoards = (req, res) => {
  Board.deleteMany({})
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
};


const addBoard = (req, res) => {
  console.log(req.body);
  Board.create(req.body)
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    }
    );
};



module.exports.getBoards = getBoards;
module.exports.addBoard = addBoard;
module.exports.deleteBoards = deleteBoards;