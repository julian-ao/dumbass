const express = require('express');  // Importerer Express.js
const app = express();  // Oppretter en ny Express.js-app
const PORT = process.env.PORT || 3000;  // Definerer portnummeret som serveren skal lytte på

// En grunnleggende rute
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Starter serveren
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
