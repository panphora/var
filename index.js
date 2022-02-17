const express = require("express");
const fs = require("fs");
const path = require("upath");
const { customAlphabet } = require("nanoid");


const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 22);
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/core", express.static(path.join(__dirname, "core")));

app.get("/", (req, res) => {
  const id = nanoid();
  const pathToStarterTemplate = path.join(__dirname, "core/starter-template.html");
  const pathToDir = path.join(__dirname, "public", id);
  const pathToPage = path.join(__dirname, "public", id, "index.html");

  fs.readFile(pathToStarterTemplate, "utf8" , (err, starterTemplateData) => {
    if (err) {
      res.status(500);
      res.send("There was an error creating a new page for you");
      return;
    }

    fs.mkdir(pathToDir, (err) => {
      if (err) {
        res.status(500);
        res.send("There was an error creating a new page for you");
        return;
      }

      fs.writeFile(pathToPage, starterTemplateData, err => {
        if (err) {
          res.status(500);
          res.send("There was an error creating a new page for you");
          return;
        }
        
        res.redirect("/" + id);
      })
    });
  })
});

app.post("/save-page", (req, res) => {
  console.log(req.header("referer"));
  res.send({success: true});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is running at port: " + port);
});












