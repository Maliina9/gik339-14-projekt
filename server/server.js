// Here ya go Maliina :) 
const express = require('express');
const server = express(); 
const sqlite3 = require('sqlite3').verbose();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

// Här använder vi GET för att att hämta alla länkar
server.get('/links', (req, res) => {
    const db = new sqlite3.Database('gik339-14-projekt.db');
    const sql = 'SELECT * FROM users';
    
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });

    db.close();
});

    // Här skapar vi en ny länk och då använder vi POST
server.post('/users', (req, res) => {
    const db = new sqlite3.Database('gik339-14-projekt.db');
    const sql = 'INSERT INTO users (firstName, lastName, username, color) VALUES (?, ?, ?, ?)';
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

    // Här uppdaterar vi en länk och då använder vi PUT
server.put ('/users/:id', (req, res) => {
    const db = new sqlite3.Database('gik339-14-projekt.db');
    const sql = 'UPDATE users SET firstName = ?, lastName = ?, username = ?, color = ?, WHERE id = ?';
    const { firstName, lastName, username, color } = req.body;
    const { id } = req.params;

    db.run(sql, [firstName, lastName, username, color, id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Användare uppdaterad lyckad');
        }
    });

    db.close();
});

// Nu ska vi kunna ta bort länk
server.delete('/users/:id', (req, res) => {
    const db = new sqlite3.Database('gik339-14-projekt.db');
    const sql = 'DELETE FROM users WHERE id =?';
    const { id } = req.params;

    db.run(sql, [id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Användare borttagen lyckad');
        }
    });

    db.close();
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});