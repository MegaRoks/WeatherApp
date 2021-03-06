const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "bfe7e973311e421bae184243180312";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", { location: null, error: null });
});

app.post("/", function(req, res) {
  let city = req.body.city;
  let url = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`;

  request(url, function(err, response, body) {
    if (err) {
      res.render("index", { location: null, error: "Error, please try again" });
    } else {
      let { location } = JSON.parse(body);
      let { current } = JSON.parse(body);
      if (location.name == undefined) {
        res.render("index", {
          location: null,
          error: "Error, please try again"
        });
      } else {
        let locationText = `In ${location.name} ${current.temp_c} degrees!`;
        res.render("index", { location: locationText, error: null });
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
