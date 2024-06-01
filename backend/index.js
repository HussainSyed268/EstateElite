const express = require('express');
const { sequelize,connectToDb  } = require('./config/database');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors') 


const app = express();
app.use(cors()); 
const port = 5000;


app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, async() => {
    console.log(`Example app listening at http://localhost:${port}`);
    await connectToDb();
    }
);