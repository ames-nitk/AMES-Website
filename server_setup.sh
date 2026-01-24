#!/usr/bin/env bash
set -euo pipefail

# Configuration Variables
# "DOMAIN" defaults to "_" which is the Nginx wildcard (Catch-All).
# This allows the site to work via IP address immediately.
DOMAIN="${DOMAIN:-ames.nitk.ac.in}"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_PORT="${APP_PORT:-3000}"

echo "============================================"
echo "AMES Website Server Setup - Local Repo"
echo "============================================"
echo "Tip: For SSL (HTTP->HTTPS redirect), run: sudo DOMAIN=example.com CERTBOT_EMAIL=you@example.com ./ssl_certbot.sh"

# 1. Build the App
echo "Building Application..."
cd "$REPO_DIR"
npm install
npm run build

# 2. Configure Nginx
echo "Configuring Nginx..."
# Copy the config fresh every time to avoid double-replacing
cp "$REPO_DIR/nginx.conf" /etc/nginx/sites-available/ames-website

# Replace the placeholder with the actual domain (or wildcard _)
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" /etc/nginx/sites-available/ames-website

# Link and restart
ln -sf /etc/nginx/sites-available/ames-website /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test config before restarting to prevent crashing Nginx
nginx -t && systemctl restart nginx

# 3. Start/Restart App with PM2
echo "Starting application with PM2..."
# Remove old instance if exists to ensure clean state
pm2 delete ames-website 2>/dev/null || true
# Start the app
pm2 start npm --name "ames-website" -- start
# Freeze the process list for reboot
pm2 save

echo ""
echo "============================================"
echo "✓ Setup complete."
echo "✓ Nginx is listening on Port 80 (Domain: $DOMAIN)"
echo "✓ App is running internally on Port $APP_PORT"
echo "============================================"
