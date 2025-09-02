const express = require("express");
const async = require("async");
const https = require("https");
const http = require("http");
const { normalizeUrl } = require("./helpers");

const app = express();
const PORT = 3002;

function getTitle(url, callback) {
  url = normalizeUrl(url);

  const lib = url.startsWith("https") ? https : http;

  lib
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const match = data.match(/<title[^>]*>([^<]*)<\/title>/i);
        const title = match ? match[1].trim() : "NO RESPONSE";
        callback(null, { url: url.replace(/^https?:\/\//, ""), title });
      });
    })
    .on("error", () => {
      callback(null, {
        url: url.replace(/^https?:\/\//, ""),
        title: "NO RESPONSE",
      });
    });
}

app.get("/I/want/title", (req, res) => {
  const addresses = req.query.address;
  if (!addresses) {
    return res.send("<h1>No addresses provided</h1>");
  }

  const urls = Array.isArray(addresses) ? addresses : [addresses];

  async.map(urls, getTitle, (err, results) => {
    let html =
      "<html><head></head><body><ul><h1>Following are the titles of given websites:</h1>";
    results.forEach((r) => {
      html += `<li>${r.url} - "${r.title}"</li>`;
    });
    html += "</ul></body></html>";
    res.send(html);
  });
});

app.use("*", (req, res) => {
  res.status(404).send("<h1>404 - Route not found</h1>");
});

app.listen(PORT, () => {
  console.log(`Async.js Server running on http://localhost:${PORT}`);
});
