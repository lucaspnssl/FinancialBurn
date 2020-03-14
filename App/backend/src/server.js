const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://FinancialBurn:FinancialBurn@omnistack-2wlkm.mongodb.net/FinancialBurn?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// req.query = Acessar query params
// req.params = Acessar route params
// req.body = Acessar corpo da requisicao

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3335);
  