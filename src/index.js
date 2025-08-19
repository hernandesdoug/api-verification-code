const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);


app.listen(3333, () => {
    console.log("Servidor executando na porta 3333");
})
