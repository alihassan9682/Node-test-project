function normalizeUrl(rawUrl) {
  let url = rawUrl.trim();

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    let parsed = new URL(url);

    parsed.hostname = parsed.hostname.replace(/^(www\.){2,}/, "www.");
    if (!/^www\./i.test(parsed.hostname)) {
      parsed.hostname = "www." + parsed.hostname;
    }

    return parsed.toString();
  } catch (err) {
    console.error("Invalid URL:", rawUrl);
    return null;
  }
}

module.exports = { normalizeUrl };
