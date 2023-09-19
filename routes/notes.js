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
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    //Creates valid JSON file synchronously if a file does not exist already
    if(!(fs.existsSync(databasePATH))){
      console.log("Database does not exist! Creating database JSON now...")
      const output = fs.openSync(databasePATH,'w');
      fs.writeSync(output, '[]')
    }
});
//basic GET call to send styles.css to allow notes.html to display correctly
router.get("/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/css/styles.css'));
});
//basic GET call to send styles.css to allow notes.html to display correctly
router.get("/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/js/index.js'));
});

router.post('/data', (req, res) => {
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

//exports file to be used in server.js
module.exports = router;