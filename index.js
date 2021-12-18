const express = require('express');
const app = express();
const connectDB = require ('./config/dbConfig')
const bodyParser = require('body-parser');
const chickens = require('./routes/chickenAPI');
const farmyard = require('./routes/farmyardAPI');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json())
app.use('/chicken' , chickens);
app.use('/farmyard' , farmyard);
connectDB();
app.listen(8001,()=>console.log('server started'));


