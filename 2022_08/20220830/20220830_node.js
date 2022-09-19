const express = require("express");
const fs = require("fs");
const app = express();


app.use((req, res) => {
    console.log("get");
    const text = fs.readFileSync("20220830.html", "utf8");
    res.send(text);
})

app.get("/register", require("./route/registerRoute.js"));


// app.get("/", (req, res) => {
//     console.log("get");
//     const text = fs.readFileSync("20220830.html", "utf8");
//     res.send(text);
// })

app.listen(8080, () => {
    console.log("receive!");
})