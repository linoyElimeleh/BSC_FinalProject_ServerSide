const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const routes = require('./routes');
const session = require("express-session");


var isProduction = process.env.NODE_ENV === 'production';

const app = express();

const port = process.env.PORT || 8000;

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('cookie-parser')());

app.use(routes);

app.use(cors);

app.use(session({ secret: 'todobom' }))

if (!isProduction) {
    app.use(errorhandler());
}

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

app.listen(port, () => console.log(`API is listening on port ${port}`));
