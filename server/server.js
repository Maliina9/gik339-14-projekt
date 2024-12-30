// Here ya go Maliina :) 
//Tack åke

const express = require('express');
const server = express(); 
const sqlite3 = require('sqlite3').verbose();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Acccess-Control-Allow-Origin', '*');
    res.header('Allow-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

  