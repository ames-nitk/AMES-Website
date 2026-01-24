#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   sudo ./ssl_certbot.sh
# If you omit CERTBOT_EMAIL, certbot will register without email.

DOMAIN="${DOMAIN:-ames.nitk.ac.in}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-amesnitk@gmail.com}"
REDIRECT_HTTP_TO_HTTPS="${REDIRECT_HTTP_TO_HTTPS:-true}"

echo "Preparing webroot for ACME challenges..."
mkdir -p /var/www/certbot

certbot_args=(
  --nginx
  --non-interactive
  --agree-tos
  -d "$DOMAIN"
)

if [[ -n "$CERTBOT_EMAIL" ]]; then
  certbot_args+=(-m "$CERTBOT_EMAIL")
else
  certbot_args+=(--register-unsafely-without-email)
fi

if [[ "$REDIRECT_HTTP_TO_HTTPS" == "true" ]]; then
  certbot_args+=(--redirect)
else
  certbot_args+=(--no-redirect)
fi

echo "Requesting/renewing certificate for $DOMAIN..."
certbot "${certbot_args[@]}"

echo "Reloading nginx..."
systemctl reload nginx

echo ""
echo "============================================"
echo "✓ Certbot complete"
echo "✓ HTTPS enabled for: $DOMAIN"
echo "✓ HTTP behavior: REDIRECT_HTTP_TO_HTTPS=$REDIRECT_HTTP_TO_HTTPS"
echo "============================================"
