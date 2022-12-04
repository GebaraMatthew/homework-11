const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 3001;
const noteDB = require('./db/db.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.post('/api/notes', (req, res) =>{
  console.log(req.body)
  console.log(path.join(__dirname, './api/notes'))
  const { title, text } = req.body;

  if (req.body) {
    const newNote= {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note Added`);
  } else {
    res.error('Error in adding Note');
  }
})

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
