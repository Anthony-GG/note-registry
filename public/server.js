//import statements for required packages
const express = require('express');
const path = require('path');
const app = express();

//PORT the server is running on
const PORT = process.env.PORT || 3001;

//basic GET call to send index.html to display on homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

//basic GET call to send styles.css to allow notes.html to display correctly
app.get("/js/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/js/index.js'));
  });

//requires notes router to connect index page to notes, app use implements it
const notesRouter = require('../routes/notes')
app.use('/notes', notesRouter);
//requires api router to connect index page to api, app use implements it
const apiRouter = require('../routes/api')
app.use('/api', apiRouter);

//starts the server
app.listen(PORT);
console.log(`App running on port ${PORT}`);