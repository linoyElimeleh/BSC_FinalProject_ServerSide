module.exports = (app) => {
    app.get('/beep', (req, res) => {
        res.send('boop');
    });
}