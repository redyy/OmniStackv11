const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//app.use(cors({
 // origin: 'http://meuapp.com'
//}))

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3001);