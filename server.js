const express = require('express');
const app = express();



app.get('/', (req, res) => {
  res.status(200).send('Root');
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
