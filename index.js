const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("client/build"));
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Starts the server for production
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`App running live on your browser - http://localhost:${port}`)
);
