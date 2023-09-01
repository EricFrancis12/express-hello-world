const express = require('express');
const app = express();

const data = require('./data/data');



app.get('/', (req, res) => {
  res.status(200).send('Root');
});

app.get('/data', (req, res) => {
  res.status(200).send(JSON.stringify(data, null, 4));
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));
