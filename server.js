const express = require("express")
const helmet = require('helmet')
const morgan = require('morgan')

const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');


const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
  
    res.send(`
      <h2>Welcome to My sprint week project</h2>
      <p>this is going to be a bumpy ride</p>
    `);
  });

server.use((error, req, res, next) => {
    res.status(500).json({ message: error })
  });

module.exports = server