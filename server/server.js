// Here ya go Maliina :) 
const express = require('express');
const server = express(); 
const sqlite3 = require('sqlite3').verbose();
const dbfile = 'gik339-14-projekt.db';

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
    const db = new sqlite3.Database(dbfile);
    const sql = 'SELECT * FROM links';

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });

    db.close();
});
// Här hämtar vi enbart EN länk om man så vill.
server.get('/links/:id', (req, res) => {
    const db = new sqlite3.Database(dbfile);
    const id = req.params.id;
    const sql = `SELECT * FROM links WHERE id= ${id}`;

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
    const db = new sqlite3.Database(dbfile);
    const sql = 'INSERT INTO links (name, url, color) VALUES (?, ?, ?)';
    const link = req.body;  

    db.run(sql, Object.values(link), (err) => {
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
    const db = new sqlite3.Database(dbfile);
    const id = req.params.id;
    const sql = `UPDATE links SET name = ?, url = ?, color = ? WHERE id = ${id}`;
    const link = req.body; 

    db.run(sql, Object.values(link), (err) => {
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
    const db = new sqlite3.Database(dbfile);
    const id  = req.params.id;
    const sql = `DELETE FROM links WHERE id =${id}`;
    
    db.run(sql, (err) => {
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
    // Testa databasen och kolla så 'links' finns
    const db = new sqlite3.Database(dbfile, (err) => {
        if (err) {
        console.error('Fel vid koppling till databasen', err.message);
        } else {
        console.log('Databaskoppling lyckad.');
    
        // Skapa 'links' table on den inte finns
        db.run(`
            CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            color TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
            console.error('Fel vid koll så "links" tabellen finns:', err.message);
            } else {
            console.log('Tabellen "links" är redo.');
            }
        });
        }
        });
        db.close();
    });