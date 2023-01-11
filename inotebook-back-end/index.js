const ConnectToMonge = require('./db.js')
const express = require('express')
const cors = require('cors');
ConnectToMonge();

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/note',require('./routes/note'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


