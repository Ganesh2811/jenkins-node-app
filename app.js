
const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const routes = require("./controller/routes");
// const config = require("./config")

const app = express();
// app.use(express.json());
// app.use(cookieParser());

const port = "8000" || config?.port;

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// const daoMiddleware = require("./middleware").daoMiddleware;
// app.use(daoMiddleware);
// app.use("/api", routes);

app.get("/api/sample", (req, res, next) => {
    res.send({status: true, data: "Data gets successfully !!"})
})

app.listen(port, () => {
    console.log('The magic happens on port ' + port + ' Date' + Date());
});
