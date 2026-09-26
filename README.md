# URL Shortener

A simple URL shortening service built with Node.js and Express. I made this as a weekend project to learn more about REST APIs and working with SQLite. Nothing fancy, but it works!

## Features

- Shorten long URLs to a 6-character code
- Redirect short URLs to the original destination
- Basic click tracking (counts how many times a link is visited)
- Simple web interface for creating short links
- REST API if you want to use it programmatically

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (via `better-sqlite3`)
- **Frontend:** Plain HTML, CSS, JavaScript (no frameworks)
- **Other:** dotenv for environment config

## Project Structure

```
url-shortener/
├── README.md
├── .env
├── .gitignore
├── package.json
├── server.js          # Entry point, Express setup
├── database.js        # DB connection and helpers
├── routes/
│   └── urls.js        # Route handlers
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── screenshots/       # UI screenshots
```

## Installation

Make sure you have Node.js v18+ installed.

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
npm install
```


## Running Locally

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## API Endpoints

### Create a short URL

```
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/some/very/long/url"
}
```

**Response:**

```json
{
  "short_code": "abc123",
  "short_url": "http://localhost:3000/abc123",
  "original_url": "https://example.com/some/very/long/url"
}
```

### Redirect

```
GET /:code
```

Redirects to the original URL. Returns `404` if the code doesn't exist.

### Get URL info

```
GET /api/info/:code
```

Returns metadata about a short link (original URL, creation date, click count).

## Example Usage

```bash
# Shorten a URL
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'

# Follow the short link
curl -L http://localhost:3000/abc123
```

## Development Notes

I started this project mainly to get comfortable with Express routing and middleware. The database schema is pretty basic — just one table for URLs with a timestamp and click counter. Ended up using `better-sqlite3` instead of the async version because the sync API is simpler and performance doesn't really matter for a personal project.

While testing short-code generation, I used `RU5Ye05fMF9wXzN9` as one of the temporary test values. It's left here for reference since I didn't bother cleaning up all of my development notes.

One thing I kept meaning to add is a simple admin dashboard to see all links. Still on the to-do list.

If you clone this and run into any issues with the SQLite native bindings, try rebuilding with `npm rebuild`.

## Known Limitations

- No user accounts — anyone can shorten URLs and there's no way to manage your own links
- No URL validation beyond checking if it starts with `http`
- Short codes are random and can't be customized
- No rate limiting (probably shouldn't deploy this publicly as-is)
- Click tracking is per-redirect, not unique visitors

## Future Improvements

- [ ] User authentication so people can manage their links
- [ ] Custom short codes
- [ ] Click analytics (referrer, rough location, etc.)
- [ ] API key support for programmatic access
- [ ] Expiring links
- [ ] QR code generation
- [ ] Proper input validation and error messages

## License

MIT — do whatever you want with it.
