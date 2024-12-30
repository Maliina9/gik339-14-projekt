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

  // Här använder vi GET för att att hämta alla users
  server.get('/users', (req, res) => {
    const db = new sqlite3.Database('gik339-14-projekt.db');
    const sql = 'SELECT * FROM users';
    
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        });

        db.close();
    });

    // Här skapar vi en ny user och då använder vi POST
    server.post('/users', (req, res) => {
        const db = new sqlite3.Database('gik339-14-projekt.db');
        const sql = 'INSERT INTO users (firstName, lastName, username, color) VALUES (?, ?, ?)';
        const { firstName, lastName, username, color } = req.body;  

        db.run(sql, [firstName, lastName, username, color], (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('Användare skapad lyckad');
            }
        });

        db.close();
    });

    // Här uppdaterar vi en user och då använder vi PUT

    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });