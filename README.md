# Website Title Fetcher - Control Flow Assessment

Simple Node.js server implementations using different asynchronous control flow patterns.

## Problem

Create a server that responds to `/I/want/title` route and fetches website titles from provided URLs.

## Files

- **`callbacks.js`** - Traditional callback pattern (Port 3001)
- **`async.js`** - Async.js library implementation (Port 3002)  
- **`promises.js`** - Promises implementation (Port 3003)
- **`async-await.js`** - Modern async/await syntax (Port 3004)
- **`RxJs.js`** -  Using RxJS Observables (Port 3005)

## Quick Start

```bash
npm install

# Run any implementation:
node callbacks.js     # Port 3001
node async.js         # Port 3002
node promises.js      # Port 3003
node async-await.js   # Port 3004
node RxJs.js   # Port 3005
```

## Test URLs

**Single website:**
```
http://localhost:3001/I/want/title/?address=google.com
```

**Multiple websites:**
```
http://localhost:3001/I/want/title/?address=google.com&address=github.com
```

**Error handling:**
```
http://localhost:3001/I/want/title/?address=invalidwebsite
```

**404 test:**
```
http://localhost:3001/some/invalid/route
```

## Expected Response

```html
<html>
<head></head>
<body>
<ul>
<h1>Following are the titles of given websites:</h1>
<li>google.com - "Google"</li>
<li>github.com - "GitHub: Let's build from here"</li>
</ul>
</body>
</html>
```

## Control Flow Comparison

| Implementation | Pattern | Code Complexity | Readability |
|---------------|---------|-----------------|-------------|
| callbacks.js | Callbacks | High | Low |
| async.js | Async.js | Medium | Medium |
| promises.js | Promises | Medium | Good |
| async-await.js | Async/Await | Low | High |
| RxJS.js | RxJS (Streams) | Low | High |


## Features

-  Single route: `/I/want/title`
-  Multiple URL support via query parameters
-  HTTP/HTTPS support
-  Error handling (returns "NO RESPONSE" for failed requests)
-  404 handling for invalid routes
-  Clean, simple implementations

---

*Each file is self-contained and demonstrates a different async pattern in Node.js.*
