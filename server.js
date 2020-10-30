const express = require("express")

const server = express()

server.use(express.json())


server.use((error, req, res, next) => {
    res.status(500).json({ message: error })
  });

module.exports = server