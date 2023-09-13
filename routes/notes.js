//import statements for required packages
const express = require('express');
const path = require('path');
const router = express.Router();
const uuid = require('../helpers/uuid');
const notes = require("../db/db.json")
const fs = require('fs');

router.use(express.json());

//basic GET call to send notes.html to display on /notes
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/data', (req, res) => {
    res.status(200).json(notes);
  });

router.post('/data', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        review_id: uuid(),
      };
  
      const response = {
        status: 'success',
        body: newNote,
      };

      console.log(response);

      //Adds new object to json file
      var notesData = notes;
      notesData.push(newNote);
      noteDataJSON = JSON.stringify(notesData);
      console.log(notesData);
      console.log(noteDataJSON);


      res.status(201).json(response);
    
      req.on('end', function(){
        fs.writeFile(notes , noteDataJSON, function(err) {
            if(err) {console.log(err);
            }});
      })
    } else {
      res.status(500).json('Error in posting review');
    }
  });

//exports file to be used in server.js
module.exports = router;