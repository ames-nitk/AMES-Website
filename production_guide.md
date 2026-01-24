# AMES-Website

Production deployment helpers for Ubuntu + Nginx + PM2, including HTTPS via Certbot.

## Quick start (fresh Ubuntu server)

1. Clone the repo onto the server.

1. Install dependencies:

  ```bash
  sudo bash all_dependencies.sh
  ```

1. Build + configure Nginx + start the app (PM2):

  ```bash
  sudo bash server_setup.sh
  ```

1. Enable HTTPS (and redirect HTTP → HTTPS):

  ```bash
  sudo bash ssl_certbot.sh
  ```

That’s it.

## What each script does

### all_dependencies.sh

- Installs: Nginx, Node.js, PM2, and Certbot (Ubuntu 22).
- Run once per server (or when you want to update packages).

### server_setup.sh

- Runs `npm install` and builds the app.
- Installs the repo’s Nginx config to `/etc/nginx/sites-available/ames-website`.
- Enables the site, restarts Nginx.
- Starts the Node app via PM2 (`ames-website`).

### ssl_certbot.sh

- Uses Certbot + Nginx plugin to request/renew a Let’s Encrypt certificate.
- Configures Nginx to redirect HTTP → HTTPS.

Defaults are set inside the script:

- `DOMAIN=ames.nitk.ac.in`
- `CERTBOT_EMAIL=amesnitk@gmail.com`

## HTTPS / SSL notes

### Does the certificate expire?

Yes. Let’s Encrypt certificates are valid for 90 days.

### How does it renew automatically?

On Ubuntu, Certbot installs an auto-renew mechanism (systemd timer). As long as:

- The domain still points to this server
- Port `80` is reachable from the internet
- Nginx can answer the challenge

…renewals will keep succeeding.

### Check / test renewal

- Timer status: `sudo systemctl status certbot.timer`
- Dry-run renewal test: `sudo certbot renew --dry-run`

## Config files

- nginx config template: nginx.conf
  - `server_name` is replaced by `server_setup.sh`
  - Includes a `/.well-known/acme-challenge/` location for Certbot validation

## Troubleshooting

- Certbot fails to issue/renew:
  - Make sure DNS A/AAAA record points to this server
  - Make sure inbound port `80` is open
  - Make sure Nginx is running: `sudo systemctl status nginx`
