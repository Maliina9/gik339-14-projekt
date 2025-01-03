// Here ya go Maliina :) 
const express = require('express');
const server = express(); 
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gik339-14-projekt.db');

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
    const sql = 'SELECT * FROM users';
    
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows[0]);
        }
    });

    db.close();
});

    // Här skapar vi en ny länk och då använder vi POST
server.post('/links', (req, res) => {
    const sql = 'INSERT INTO links (name, url, color) VALUES (?, ?, ?)';
    const {name, url, color } = req.body;  

    db.run(sql, [name, url, color], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Länk skapad');
        }
    });

    db.close();
});

    // Här uppdaterar vi en länk och då använder vi PUT
server.put ('/links/:id', (req, res) => {
    const sql = 'UPDATE links SET id = ?, name = ?, url = ?, color = ?, WHERE id = ?';
    const bodyData = req.body; 
    const id = bodyData.id;
    const user ={
        name: bodyData.name,
        url: bodyData.url,
        color: bodyData.color
    };

    db.run(sql, [link.id, link.name, link.url], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Länk uppdaterad lyckad');
        }
    });

    db.close();
});

// Nu ska vi kunna ta bort länk
server.delete('/links/:id', (req, res) => {
    const sql = 'DELETE FROM links WHERE id =?';
    const id  = req.params.id;

    db.run(sql, [id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Länk borttagen lyckad');
        }
    });

    db.close();
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});