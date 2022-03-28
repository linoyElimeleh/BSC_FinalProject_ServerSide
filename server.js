const app = require('./app');

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`API is listening on port ${port}`));
