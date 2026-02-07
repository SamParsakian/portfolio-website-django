#!/bin/bash
# Sets env vars and runs Django development server (no .env required)

echo "🧪 Starting local development server..."
echo ""
export DJANGO_DEBUG=1
export DJANGO_SECRET_KEY="django-insecure-local-dev-key-for-testing-only"
export DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
export DJANGO_CSRF_TRUSTED_ORIGINS="http://localhost:8000,http://127.0.0.1:8000"

echo "📋 Environment variables set:"
echo "   DJANGO_DEBUG=$DJANGO_DEBUG"
echo "   DJANGO_ALLOWED_HOSTS=$DJANGO_ALLOWED_HOSTS"
echo ""
echo "🔍 Checking Django configuration..."
python3 manage.py check
if [ $? -ne 0 ]; then
    echo "❌ Django configuration check failed"
    exit 1
fi

echo "✅ Django configuration OK"
echo ""
if [ ! -d "staticfiles" ]; then
    echo "📦 Collecting static files..."
    python3 manage.py collectstatic --noinput
fi
echo "🚀 Starting Django development server on http://localhost:8000/"
echo "   Press Ctrl+C to stop the server"
echo ""

python3 manage.py runserver 8000