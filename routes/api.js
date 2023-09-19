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

  //POST REQUEST TO ADD TO THE LIST
  router.post('/notes', (req, res) => {
    //Creates valid JSON file synchronously if a file does not exist already
    if(!(fs.existsSync(databasePATH))){
      console.log("Database does not exist! Creating database JSON now...")
      const output = fs.openSync(databasePATH,'w');
      fs.writeSync(output, '[]')
    }
    
    //Reads the existing JSON file and extracts data from it to be rewritten adding info added from POST request
    fs.readFile(databasePATH, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Parse the existing JSON data
        const existingData = JSON.parse(data);
        
            // Destructuring assignment for the items in req.body
            const { title, text } = req.body;

            // If all the required properties are present
            if (title && text) {
              // Variable for the object we will save
              const newNote = {
                title,
                text,
                note_id: uuid(),
              };

              const response = {
                status: 'success',
                body: newNote,
              };




              //Adds new object to json file
              existingData.push(newNote);
              noteDataJSON = JSON.stringify(existingData);
              

              //Rewrites info to JSON file with new object
              fs.writeFile(databasePATH , noteDataJSON, function(err) {
                  if(err) {console.log(err);
                  }});


              res.status(201).json(response);
            } else {
              res.status(500).json('Error in posting review');
            }
      }
    });
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