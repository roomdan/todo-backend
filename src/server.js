const app = require("./app.js");

var PORT = process.env.PORT || 8000;

const serverLog = () => {
  console.table({
    port: PORT,
    domine: "localhost:",
    status: "Server opened",
  });
};

app.listen(PORT, serverLog);

console.log("hola mundo");
