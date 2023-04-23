const http = require("http");
const app = require("./app");
const {PORT} = require("./defaults");

http.createServer(app).listen(PORT,()=>console.log(`server up and running on port ${PORT}`));