const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

app.use(express.static(path.join('D:\\pokemon-list')));

app.get('/*', (req, res) => {
    res.sendFile(path.join('D:\\pokemon-list', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`START SERVER`);
});
