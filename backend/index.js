const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
const connection = mysql.createConnection({
    user: 'root',
    password : 'root',
    database : 'tour'

});

app.get('/insert', (req, res) => {
    const {name, location, price} = req.query;
    const INSERT_TOUR_QUERY = `INSERT INTO properties (name, location, type) VALUES('DHA villa', 'DHA Lahore', 'Bungalow')`;
    connection.query(INSERT_TOUR_QUERY, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            console.log('successfully added tour');
        }
    });
}
);

    



app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);