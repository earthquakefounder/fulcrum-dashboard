const express = require('express');
const path = require('path');
const app = express();

app.use('/src', express.static(path.join(__dirname, '..', 'src')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/system.config.js', function(req, res) {
    res.sendFile(path.join(__dirname, 'system.config.js'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})