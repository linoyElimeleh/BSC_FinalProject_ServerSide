const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 8000;

app.get('/beep', (req, res) => {
    res.send('boop');
});


app.use(cors)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => console.log(`API is listening on port ${port}`));
