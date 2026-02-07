#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

VENV=".venv"
PYTHON="${VENV}/bin/python"
PIP="${VENV}/bin/pip"

echo "Django Portfolio — local run"
echo ""

if [ ! -d "$VENV" ]; then
  echo "Creating virtual environment..."
  python3 -m venv "$VENV"
fi

echo "Installing dependencies..."
"$PIP" install -q -r requirements.txt

if [ ! -f .env ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
fi

echo "Running migrations..."
"$PYTHON" manage.py migrate --noinput -q

echo ""
echo "Starting development server at http://127.0.0.1:8000/"
echo "Press Ctrl+C to stop."
echo ""
"$PYTHON" manage.py runserver 8000
