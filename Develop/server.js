const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;
const noteDB = require('./db/db.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
})

app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.post('/api/notes', (req, res) =>{
  console.log(req.body)
  console.log(path.join(__dirname, './api/notes'))
})

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
