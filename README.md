# Django Portfolio Template

A single-page Django portfolio template with a sticky sidebar and scrollable content. Suited for junior developers to clone, customize, and deploy as a personal portfolio or project showcase.

---

## Features

- **Single-page layout** — Sticky left column (name, role, nav, social) and scrollable right column (About, Experience, Projects, Writing).
- **One file for content** — All copy and links live in `core/site_data.py`; no need to hunt through templates.
- **Responsive** — Layout adapts for mobile and tablet.
- **Accessible** — Skip link, keyboard focus styles, semantic HTML, and descriptive image alt text.
- **Production-ready** — WhiteNoise for static files, env-based config, security headers when `DEBUG=False`.
- **Template content** — Placeholder text and example links; replace with your own in `site_data.py`.

---

## Tech stack

| Layer    | Choice                                   |
| -------- | ---------------------------------------- |
| Backend  | Django 5.x                               |
| Static   | WhiteNoise                               |
| Frontend | Bootstrap 5, vanilla JS                  |
| Config   | django-environ, `.env`                   |
| Deploy   | Gunicorn (+ Nginx or platform ASGI/WSGI) |

---

## Screenshots

<!-- Add a screenshot or GIF of the home page here, e.g.:
![Home page](docs/screenshot-home.png)
-->

_Add a screenshot or short GIF of your portfolio here once you’ve customized it._

---

## Local setup

**Requirements:** Python 3.11+, Bash (on Windows use WSL or Git Bash).

### Option A — One script (recommended)

```bash
chmod +x run.sh
./run.sh
```

Then open **http://127.0.0.1:8000/**. The script creates a venv, installs deps, copies `.env.example` → `.env` if missing, runs migrations, and starts the server.

### Option B — Manual

```bash
# Clone and enter project
git clone <your-repo-url>
cd <project-folder>

# Virtual environment
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Dependencies
pip install -r requirements.txt

# Environment (copy and edit if needed)
cp .env.example .env

# Database and run
python manage.py migrate
python manage.py runserver
```

Open **http://127.0.0.1:8000/**.

### Optional: create superuser (admin)

```bash
python manage.py createsuperuser
```

Then visit **http://127.0.0.1:8000/admin/** (admin is available but this template doesn’t use the admin for content; editing `site_data.py` is the main way to change copy).

### Alternative: run without `.env`

```bash
./run-local-dev.sh
```

Uses in-script env vars for local dev only (no `.env` required).

---

## Environment variables

Use `.env` (never commit it). Copy from `.env.example`:

| Variable                      | Description                         | Example (local)                 |
| ----------------------------- | ----------------------------------- | ------------------------------- |
| `DJANGO_SECRET_KEY`           | Secret key (required in production) | Long random string (50+ chars)  |
| `DJANGO_DEBUG`                | Enable debug mode                   | `True` (local) / `False` (prod) |
| `DJANGO_ALLOWED_HOSTS`        | Comma-separated hosts               | `localhost,127.0.0.1`           |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | HTTPS origins for CSRF (production) | `https://yourdomain.com`        |

No API keys or third-party secrets are required for this template.

---

## Customizing content

1. Open **`core/site_data.py`**.
2. Replace the example profile (name, role, tagline), social links, about paragraphs, experience, projects, writing, and archive rows with your own.
3. Keep the same structure (same keys); only change the values and image paths if you add new assets.
4. Add your resume as **`static/documents/resume.pdf`** so the “View Full Résumé” link works (or change the link in the template).

---

## Tests

The project includes a `core/tests.py` placeholder. No tests are implemented yet. To run the test suite after adding tests:

```bash
python manage.py test
```

---

## Deployment

1. Set in your production environment (e.g. `.env` or platform config):

   - `DJANGO_DEBUG=False`
   - `DJANGO_SECRET_KEY=<long random secret>`
   - `DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com`
   - `DJANGO_CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com`

2. Collect static files and run with Gunicorn:

   ```bash
   python manage.py collectstatic --noinput
   gunicorn config.wsgi:application --bind 0.0.0.0:8000
   ```

3. Put Gunicorn behind a reverse proxy (e.g. Nginx) or use a platform (Heroku, Railway, Render, etc.) that runs a WSGI server. Point the proxy to your app and serve static files via WhiteNoise (no separate static server required if using WhiteNoise).

---

## Demo

<!-- If you deploy the template, add the live URL here:
**Live demo:** [https://your-portfolio.example.com](https://your-portfolio.example.com)
-->

_Add your live demo URL here after deployment._

---

## What I learned (template author)

- **Django:** Single-app structure, env-based settings, WhiteNoise for static files, and keeping all editable content in one data file (`site_data.py`).
- **Security:** No secrets in repo; `.env` for config; production security headers when `DEBUG=False`.
- **UX:** Sticky sidebar + scrollable content, skip link, and focus styles for keyboard users.
- **Maintainability:** Clear project layout and a README that supports both “run it” and “deploy it.”

---

## Project structure

```
config/          # Django project (settings, urls, wsgi)
core/            # Main app: views, urls, site_data.py, templates
templates/       # Base HTML template
static/          # CSS, JS, images (optimized + optimized_webp), documents/
manage.py
run.sh           # One-shot: venv, install, migrate, runserver
run-local-dev.sh # Local dev with env vars, no .env required
```

---

## License

MIT. Use and adapt for your own portfolio.

---

## Optional: clean commit history before first push

If you want a short, readable history before pushing to GitHub:

1. **Backup:** Ensure you have a copy of the repo (e.g. push to a backup branch or another remote).
2. **Interactive rebase** (example: squash the last 3 commits into one):

   ```bash
   git rebase -i HEAD~3
   ```

   In the editor, leave the first line as `pick` and change the next two to `squash` (or `s`). Save and close. Edit the new combined commit message to something like:

   ```
   chore: release portfolio template for GitHub

   - Generic placeholder content in site_data.py
   - README and .env.example updates for public repo
   - Exclude resume.pdf and duplicate assets
   ```

3. **Force-push** (only if this branch is not shared yet, or you’re sure no one else depends on the old history):
   ```bash
   git push --force-with-lease origin main
   ```
   `--force-with-lease` is safer than `--force` because it will abort if the remote has new commits you don’t have.

If you prefer to keep the current history, you can skip this section and push as-is.
