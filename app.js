
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./controller/routes");
const db = require("./dao/dbConnection");
const config = require("./config")


db().then(() => console.log('Database connected')).catch(err => console.error(err));

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = config?.port;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", routes);

app.listen(port, () => {
    console.log('The magic happens on port ' + port + ' Date' + Date());
});
