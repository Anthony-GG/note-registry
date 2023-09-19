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


//exports file to be used in server.js
module.exports = router;