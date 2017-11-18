const path = require("path");
const express = require('express');
const app = express();
const api = require('./server/api.js');



app.listen(8000, function() {
    console.log('App listening on port 8000!');
});


