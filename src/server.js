const app = require("./app.js");

var PORT = process.env.PORT || 8000;
var MODE = process.env.NODE_ENV;

const serverLog = () => {
  console.table({
    port: PORT,
    domine: "localhost:",
    status: "Server opened",
    mode: MODE,
  });
};

app.listen(PORT, serverLog);
