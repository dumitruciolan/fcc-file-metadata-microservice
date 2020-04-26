"use strict";

// basic configuration
const express = require("express"),
  multer = require("multer"),
  cors = require("cors"),
  app = express(),
  upload = multer({ dest: "uploads/" });

app.use("/public", express.static(`${process.cwd()}/public`));
// enable CORS so the API is remotely testable
app.use(cors({ optionSuccessStatus: 200 }));

// route to main HTML page
app.get("/", (_, res) => res.sendFile(`${process.cwd()}/views/index.html`));

// upload a single file, for other types check multer's documentation
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // using aliases with JavaScript Destructuring
  const { originalname: name, size } = req.file;

  // return the data in the required format
  res.json({ name, size });
});

// handle inexistent routes
app.use((_, res) =>
  res
    .status(404)
    .type("txt")
    .send("Not found")
);

// start the server & listen for requests
app.listen(process.env.PORT || 3000, () => console.log("Node.js listening..."));
