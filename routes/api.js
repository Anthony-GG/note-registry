//import statements for required packages
const express = require('express');
const path = require('path');
const router = express.Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const databasePATH = path.join(__dirname, "../db/db.json");

router.use(express.json());


//basic GET call to send notes.html to display on /notes
router.get("/", (req, res) => {
    res.send('Invalid URL: please provide accurate path to data.');
});

router.get('/notes', (req, res) => {
    res.sendFile(databasePATH);
  });

  //Set up request to allow user to request single note
  router.get('/notes/:id', (req, res) => {
    const notes = require(databasePATH);
    if (req.params.id) {
      const noteID = req.params.id;
      for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (currentNote.note_id === noteID) {
          res.json(currentNote);
          return;
        }
      }
      res.status(404).send('Note not found');
    } else {
      res.status(400).send('Note ID not provided');
    }
  });

      //Set up request to allow user to request single note for deletion
      router.delete('/notes/:id', (req, res) => {
        const notes = require(databasePATH);
        if (req.params.id) {
          const noteID = req.params.id;
          for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.note_id === noteID) {
              rNote = currentNote;
              break;
            }
          }
          res.status(404).send('Note not found');
        } else {
          res.status(400).send('Note ID not provided');
        }
  
            //Reads the existing JSON file and extracts data from it to be rewritten adding info added from POST request
            fs.readFile(databasePATH, 'utf8', (err, data) => {
              if (err) {
                console.error(err);
              } else {
                // Parse the existing JSON data
                var existingData = JSON.parse(data);
                
  
  
                //Finds index of the note that needs to removed
                var index = existingData.findIndex(note => note.note_id === rNote.note_id);
                console.log("Index of deleted item: " + index);

                //Removes note object from json file
                existingData.splice(index);
                noteDataJSON = JSON.stringify(existingData);
                

                //Rewrites info to JSON file with new object
                fs.writeFile(databasePATH , noteDataJSON, function(err) {
                    if(err) {console.log(err);
                    }});
              }
            });
      });

//exports file to be used in server.js
module.exports = router;