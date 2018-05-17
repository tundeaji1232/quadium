const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieSession = require("cookie-session");


if (process.env.NODE_ENV !== "production"){
  require("env2")(".env")
}
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes/get_routes")(app);
require("./routes/post_routes")(app);

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "/client/build/"); 
  app.use(express.static(clientBuildPath));  
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}





app.disabled("x-powered-by");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { app };
