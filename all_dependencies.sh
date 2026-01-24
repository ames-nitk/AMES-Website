#!/usr/bin/env bash
set -euo pipefail

echo "============================================"
echo "AMES Website Dependencies - Ubuntu 22"
echo "============================================"
echo ""

echo "Updating system packages..."
apt-get update && apt-get upgrade -y

echo "Installing essential packages..."
apt-get install -y --no-install-recommends \
  nginx \
  git \
  curl \
  ca-certificates \
  gnupg \
  build-essential \
  python3

if ! command -v node >/dev/null 2>&1; then
  echo "Installing Node.js 18.x..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt-get install -y nodejs
  echo "✓ Node.js version: $(node --version)"
  echo "✓ npm version: $(npm --version)"
else
  echo "Node.js already installed: $(node --version)"
fi

echo "Installing PM2..."
npm install -g pm2@latest

echo ""
echo "============================================"
echo "✓ Dependencies installed"
echo "============================================"
