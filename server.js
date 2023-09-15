const express = require('express');




const app = express();
const port = process.env.PORT || "0.0.0.0";

app.use(cors({
  origin: allowedOrigins,
}));

app.get('/', (req, res) => {
  res.send('Hello, Express on Glitch!');
});

