const express = require("express");
const app = express();
const port = 8080;

app.get("/test", (req, res) => {
    res.send("Port is ruuning");
    console.log("Helloe world");
});

app.listen(port, () => {
    console.log('The magic happens on port ' + port + ' Date' + Date());
});
