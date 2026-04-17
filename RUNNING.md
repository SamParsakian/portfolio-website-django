# Running the project

Steps to run this Django portfolio locally on **Windows** or **macOS**.

## Prerequisites

- **Python 3.10+**  
  - Windows: [python.org/downloads](https://www.python.org/downloads/) — check "Add Python to PATH" when installing.  
  - macOS: `python3` is often pre-installed; or install via [Homebrew](https://brew.sh/): `brew install python`.

## Steps

### 1. Clone the repository

```bash
git clone <repository-url>
cd portfolio_website
```

### 2. Create a virtual environment

**Windows (Command Prompt or PowerShell):**

```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS (Terminal):**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

This installs Django and the local development debugger, Django Debug Toolbar.

### 4. Run the development server

```bash
python manage.py runserver 9000
```

**Windows:** use `python` if `python3` is not in PATH.

**macOS:** use `python3` if `python` points to Python 2.

### 5. Open in browser

Go to: **http://127.0.0.1:9000/**

## Django Debug Toolbar

The project includes Django Debug Toolbar for local development. It is enabled only when:

- `DEBUG=True`
- `DJANGO_ENV` is not `production`
- tests are not running

When the server is running locally, open **http://127.0.0.1:9000/** and look for the toolbar on the page. The toolbar URLs are added automatically under `/__debug__/` in local debug mode.

If you use VS Code, choose the debug configuration:

```text
Python: Django
```

It runs the same command on every OS:

```bash
python manage.py runserver 9000
```

---

## Optional: environment variables

For local development you don’t need any env files. To customize (e.g. for production), create:

- `.envs/.local/.django` — local overrides  
- `.envs/.production/.django` — production (do not commit)

Example variables: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS`. The app uses safe defaults when these are not set.

## Customizing content

Edit **`core/site_data.py`** to change name, role, about text, experience, projects, and articles. No env vars are required for that.
