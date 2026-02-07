#!/bin/bash
# Local development server runner
# Fixes environment variable issues for local testing

echo "🧪 Starting local development server..."
echo ""

# Set local development environment variables
export DJANGO_DEBUG=1
export DJANGO_SECRET_KEY="django-insecure-local-dev-key-for-testing-only"
export DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
export DJANGO_CSRF_TRUSTED_ORIGINS="http://localhost:8000,http://127.0.0.1:8000"

echo "📋 Environment variables set:"
echo "   DJANGO_DEBUG=$DJANGO_DEBUG"
echo "   DJANGO_ALLOWED_HOSTS=$DJANGO_ALLOWED_HOSTS"
echo ""

# Check Django configuration
echo "🔍 Checking Django configuration..."
python3 manage.py check
if [ $? -ne 0 ]; then
    echo "❌ Django configuration check failed"
    exit 1
fi

echo "✅ Django configuration OK"
echo ""

# Collect static files if needed
if [ ! -d "staticfiles" ]; then
    echo "📦 Collecting static files..."
    python3 manage.py collectstatic --noinput
fi

# Start development server
echo "🚀 Starting Django development server on http://localhost:8000/"
echo "   Press Ctrl+C to stop the server"
echo ""

python3 manage.py runserver 8000