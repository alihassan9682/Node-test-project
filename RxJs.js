const express = require("express");
const http = require("http");
const https = require("https");
const { from, Observable } = require("rxjs");
const { map, mergeMap, toArray, catchError } = require("rxjs/operators");
const { normalizeUrl } = require("./helpers");

const app = express();
const PORT = 3005;

function getTitle$(url) {
  return new Observable((subscriber) => {
        url = normalizeUrl(url);

    const lib = url.startsWith("https") ? https : http;

    lib.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const match = data.match(/<title[^>]*>([^<]*)<\/title>/i);
            const title = match ? match[1].trim() : "NO RESPONSE";
            subscriber.next({ url: url.replace(/^https?:\/\//, ""), title });
            subscriber.complete();
          } catch (err) {
            subscriber.error(err);
          }
        });
      })
      .on("error", () => {
        subscriber.next({ url: url.replace(/^https?:\/\//, ""), title: "NO RESPONSE" });
        subscriber.complete();
      });
  });
}

app.get("/I/want/title", (req, res) => {
  const addresses = req.query.address;
  if (!addresses) {
    return res.send("<h1>No addresses provided</h1>");
  }

  const urls = Array.isArray(addresses) ? addresses : [addresses];

  from(urls)
    .pipe(
      mergeMap((url) => getTitle$(url)), 
      toArray(), 
      map((results) => {
        let html = "<html><head></head><body><ul><h1>Following are the titles of given websites:</h1>";
        results.forEach((r) => {
          html += `<li>${r.url} - "${r.title}"</li>`;
        });
        html += "</ul></body></html>";
        return html;
      }),
      catchError((err) => {
        return from([`<h1>Error: ${err.message}</h1>`]);
      })
    )
    .subscribe((html) => res.send(html));
});

app.use("*", (req, res) => {
  res.status(404).send("<h1>404 - Route not found</h1>");
});

app.listen(PORT, () => {
  console.log(`RxJS Server running on http://localhost:${PORT}`);
});
