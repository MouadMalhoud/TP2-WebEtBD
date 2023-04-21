const express = require('express')
const app = express();
const mongoose = require('mongoose')
const mainRouter = require('./routes/main.js')
const profsRouter = require("./routes/profs.js");
//const etudiantsRouter = require("./routes/etudiants");
const coursRouter = require("./routes/cours");

app.set("view engine", "ejs");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://mouadmalhoud:admo123@tp2.0nynopl.mongodb.net/?retryWrites=true&w=majority"
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", mainRouter);
app.use("/profs", profsRouter);
app.use("/cours", coursRouter);
//app.use("/etudiants", etudiantsRouter);

app.listen(5000, () => {
  console.log("Shes up and running");
});

module.exports = {app, mongoose}
