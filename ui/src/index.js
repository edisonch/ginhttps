import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(<App />, document.getElementById("root"));

// const https = require('https');
// const fs = require('fs');
// const express = require('express');
//
// const app = express();
// https.createServer({
//     key: fs.readFileSync('/XXX/localhost+2-key.pem'), // where's me key?
//     cert: fs.readFileSync('/XXX/localhost+2.pem'), // where's me cert?
//     requestCert: false,
//     rejectUnauthorized: false,
// }, app).listen(3030); // get creative