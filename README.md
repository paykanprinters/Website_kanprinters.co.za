# Kan Screenprinters — website (www.kanprinters.co.za)

Static site built with [Astro](https://astro.build). Output is plain HTML/CSS/JS + one PHP mailer, so it runs on any cPanel host.

## Develop
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve dist/ locally
```
Note: `/api/send.php` needs PHP, so forms only work on the cPanel server (or `php -S localhost:8000 -t dist` after a build).

## Where to edit
| What | File |
|---|---|
| Business details, phone, WhatsApp, address, socials, **all TODOs** | `src/config/site.ts` |
| Services & gift products (text, SEO titles) | `src/data/catalog.ts` |
| Colours / layout | `src/styles/global.css` (`--m #EC008C`, `--c #00AEEF`, `--y #FFDE00`, `--k #141414`) |
| Pages | `src/pages/` (services & gifts detail pages are generated from the catalog) |
| Form mailer | `public/api/send.php` |

Fonts: Montserrat + Kaushan Script (Google Fonts, loaded in `src/layouts/Base.astro`).

## Pages
`/`, `/services`, `/services/{screenprinting,engraving,dtf-printing,uv-printing,digital-printing,pad-printing}`,
`/gifts`, `/gifts/{bobbleheads,key-plaques,memorial-plaques,crystals}`, `/portfolio`, `/about`, `/contact`,
`/request-a-quote`, `/order-a-gift`, `404`. Sitemap is generated at `/sitemap-index.xml`.

## Forms / mail setup (once, on the server)
1. Copy `public_html/api/config.example.php` → `public_html/api/config.php` (via cPanel File Manager).
2. Set `to` (inbox receiving enquiries) and `from` (a mailbox on this domain, e.g. `no-reply@kanprinters.co.za` — create it in cPanel → Email Accounts so SPF/DKIM pass).
3. `config.php` is gitignored and never deployed — it lives only on the server.
4. Optional: in cPanel → MultiPHP INI Editor set `upload_max_filesize = 10M`, `post_max_size = 25M`.

The mailer has a honeypot field, a 30-second per-IP rate limit, extension + MIME checks, a 10 MB/file, 5-file, 20 MB-total limit, and sends via PHP `mail()`.

## Deploy to cPanel

### Option A — cPanel Git Version Control + `.cpanel.yml`
cPanel shared hosting usually can't run `npm`, so deploy built files:
1. Build locally: `npm run build`.
2. Push the build to a `production` branch that includes `dist/` (e.g. `git checkout -B production && git add -f dist && git commit -m "build" && git push -f origin production`, then switch back to `main`).
3. cPanel → **Git™ Version Control** → *Create* → clone `https://github.com/paykanprinters/Website_kanprinters.co.za.git` (use a fine-grained token / deploy key for a private repo), check out `production`.
4. Edit `.cpanel.yml` and replace `USERNAME` with the cPanel username.
5. *Manage* → *Pull or Deploy* → **Update from Remote** then **Deploy HEAD Commit**. `.cpanel.yml` copies `dist/` into `public_html/`.

### Option B — GitHub Action over FTP (manual trigger)
`.github/workflows/deploy.yml` builds the site and uploads `dist/` to `public_html/` over FTPS. It only runs when started manually (**Actions → Deploy to cPanel (manual) → Run workflow**).
Add repo secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (create a dedicated FTP account in cPanel). `api/config.php` is excluded so it's never overwritten.

## Before launch — TODO checklist
See `TODO` comments in `src/config/site.ts`:
- Confirm trading days (hours 08:00–17:00 confirmed; Mon–Fri assumed) and delivery area.
- On the server, copy `api/config.example.php` to `api/config.php` (forms go to `quote@kanprinters.co.za`).
- Google Business Profile URL.
- Hero video: export the **royalty-free** 9:16 cut to `public/media/hero.mp4` + `hero-poster.jpg`, set `heroVideo: true`. Never use the copyrighted-song cut.
- Replace placeholder photos (best sellers, service pages, portfolio) with real WebP photos + alt text.
- **Confirm Charlene consents to appearing on the website** (factory screenprinting clip `public/media/factory-screenprint.*` and portfolio stills `charlene-screenprinting-01`, `screenprint-tote-01`). Remove them if not.
- **Confirm client and staff consent for photos** (iRing iRight case study `src/pages/portfolio/iring-iright.astro`: the client, Charlene and Mario in `public/images/portfolio/iring-*`). Don't name the client or organisation unless they approve.
- About page: owner story, team photo, reviews, client logos.
