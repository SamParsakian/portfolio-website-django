# Pipenv Setup

Use these steps if you want to manage the project environment with `pipenv`.

## 1. Open the project folder

```powershell
cd "h:\Personal\CV\personal website\final portfolio django template\portfolio-website-django"
```

## 2. Install pipenv

```powershell
pip install pipenv
```

## 3. Create the pipenv environment and install packages

```powershell
pipenv install -r requirements.txt
```

## 4. Activate the environment

```powershell
pipenv shell
```

## 5. Run the Django project

```powershell
python manage.py migrate
python manage.py runserver
```

Open the site here:

```text
http://127.0.0.1:8000/
```

To leave the pipenv shell:

```powershell
exit
```

## Next time

After the first setup, use only these commands:

```powershell
cd "h:\Personal\CV\personal website\final portfolio django template\portfolio-website-django"
pipenv shell
python manage.py runserver
```
