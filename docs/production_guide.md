# AMES-Website Production Deployment Guide

Production deployment guide for Ubuntu + Nginx + PM2, including HTTPS via Certbot.

## Table of Contents

1. [Fresh Server Setup](#fresh-server-setup)
2. [Deploying Updates from Repo](#deploying-updates-from-repo)
3. [SSL Certificate Setup & Troubleshooting](#ssl-certificate-setup--troubleshooting)
4. [Common Operations](#common-operations)
5. [What Each Script Does](#what-each-script-does)
6. [Troubleshooting](#troubleshooting)

---

## Fresh Server Setup

### Prerequisites
- Ubuntu 22.04 server with SSH access
- Domain pointing to your server's IP (for SSL)
- Ports 22 (SSH), 80 (HTTP), 443 (HTTPS) open in firewall

### Step-by-Step Instructions

1. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Clone the repository:**
   ```bash
   cd ~
   git clone https://github.com/ames-nitk/AMES-Website.git
   cd AMES-Website
   ```

3. **Install all dependencies (Node.js, Nginx, PM2, Certbot):**
   ```bash
   sudo bash all_dependencies.sh
   ```

4. **Build the app and configure Nginx:**
   ```bash
   sudo bash server_setup.sh
   ```
   This will:
   - Install npm packages
   - Build the React app
   - Copy Nginx config to `/etc/nginx/sites-available/ames-website`
   - Start the app with PM2

5. **Enable HTTPS with Let's Encrypt:**
   ```bash
   sudo bash ssl_certbot.sh
   ```

6. **⚠️ CRITICAL: Fix the Nginx config after Certbot:**

   Certbot creates a **duplicate server block** that breaks the site. You MUST fix this manually:

   ```bash
   sudo nano /etc/nginx/sites-available/ames-website
   ```

   You'll see TWO server blocks. **Delete the second one** that looks like:
   ```nginx
   server {
       if ($host = ames.nitk.ac.in) {
           return 301 https://$host$request_uri;
       }
       listen 80;
       server_name ames.nitk.ac.in;
       return 404; # managed by Certbot
   }
   ```

   Keep ONLY the first block and ensure it has both:
   - `listen 80;`
   - `listen 443 ssl; # managed by Certbot`

   Add HTTP→HTTPS redirect **inside** the first block, right after `listen 80;`:
   ```nginx
   listen 80;

   # Redirect HTTP to HTTPS
   if ($scheme = http) {
       return 301 https://$host$request_uri;
   }
   ```

7. **Test and reload Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

8. **Verify the site is running:**
   - Visit `http://ames.nitk.ac.in` (should redirect to HTTPS)
   - Visit `https://ames.nitk.ac.in` (should show the website)

Your site is now live! ✓

---

## Deploying Updates from Repo

When new changes are pushed to the GitHub repository:

1. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   cd ~/AMES-Website
   ```

2. **Pull the latest changes:**
   ```bash
   git pull origin main
   ```

3. **Install any new dependencies (if package.json changed):**
   ```bash
   npm install
   ```

4. **Rebuild the React app:**
   ```bash
   npm run build
   ```

5. **Restart the PM2 process:**
   ```bash
   pm2 restart ames-website
   ```

6. **Check the status:**
   ```bash
   pm2 status
   pm2 logs ames-website --lines 50
   ```

### If Nginx config changed:

If you modified `nginx.conf` in the repo:

```bash
cd ~/AMES-Website
sudo cp nginx.conf /etc/nginx/sites-available/ames-website
sudo nginx -t
sudo systemctl reload nginx
```

---

## SSL Certificate Setup & Troubleshooting

### The Certbot Duplicate Block Issue

**Problem:** When you run `ssl_certbot.sh`, Certbot adds SSL configuration but also creates a **second server block** for HTTP→HTTPS redirect. This second block conflicts with the main block and breaks the site.

**Symptoms:**
- Site returns 404 or "Welcome to Nginx" page
- SSL works but the app doesn't load
- Two server blocks exist in `/etc/nginx/sites-available/ames-website`

### Manual Fix (Required after running ssl_certbot.sh)

1. **Edit the Nginx config:**
   ```bash
   sudo nano /etc/nginx/sites-available/ames-website
   ```

2. **Identify the two server blocks:**

   **FIRST BLOCK (KEEP THIS):**
   ```nginx
   server {
       listen 80;
       server_name ames.nitk.ac.in;

       location ^~ /.well-known/acme-challenge/ {
           root /var/www/certbot;
           try_files $uri =404;
       }

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           # ... more proxy settings ...
       }

       listen 443 ssl; # managed by Certbot
       ssl_certificate /etc/letsencrypt/live/ames.nitk.ac.in/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/ames.nitk.ac.in/privkey.pem;
       include /etc/letsencrypt/options-ssl-nginx.conf;
       ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
   }
   ```

   **SECOND BLOCK (DELETE THIS ENTIRE BLOCK):**
   ```nginx
   server {
       if ($host = ames.nitk.ac.in) {
           return 301 https://$host$request_uri;
       }
       listen 80;
       server_name ames.nitk.ac.in;
       return 404; # managed by Certbot
   }
   ```

3. **Add HTTP→HTTPS redirect to the first block:**

   Inside the first server block, right after `listen 80;`, add:
   ```nginx
   listen 80;

   # Redirect HTTP to HTTPS (except ACME challenges)
   if ($scheme = http) {
       return 301 https://$host$request_uri;
   }
   ```

4. **Save the file:**
   - In nano: `Ctrl+O` (save), `Enter`, `Ctrl+X` (exit)

5. **Test and reload:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Certificate Renewal

Let's Encrypt certificates expire every 90 days. Ubuntu auto-renews them.

**Check renewal timer:**
```bash
sudo systemctl status certbot.timer
```

**Test renewal (dry-run):**
```bash
sudo certbot renew --dry-run
```

**Manual renewal (if needed):**
```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## Common Operations

### Check if site is running
```bash
pm2 status
pm2 logs ames-website --lines 50
```

### Restart the app
```bash
pm2 restart ames-website
```

### Stop the app
```bash
pm2 stop ames-website
```

### Start the app
```bash
pm2 start ames-website
```

### View Nginx logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check Nginx status
```bash
sudo systemctl status nginx
```

### Test Nginx configuration
```bash
sudo nginx -t
```

### Reload Nginx (after config changes)
```bash
sudo systemctl reload nginx
```

### Restart Nginx
```bash
sudo systemctl restart nginx
```

---

## What Each Script Does

### all_dependencies.sh

- Installs: Nginx, Node.js, PM2, and Certbot (Ubuntu 22).
- Run once per server (or when you want to update packages).

### server_setup.sh

- Runs `npm install` and builds the app.
- Installs the repo's Nginx config to `/etc/nginx/sites-available/ames-website`.
- Enables the site, restarts Nginx.
- Starts the Node app via PM2 (`ames-website`).

### ssl_certbot.sh

- Uses Certbot + Nginx plugin to request/renew a Let's Encrypt certificate.
- **Note:** Creates a duplicate server block that must be manually removed (see SSL section above).

Defaults are set inside the script:
- `DOMAIN=ames.nitk.ac.in`
- `CERTBOT_EMAIL=amesnitk@gmail.com`

---

## Troubleshooting

### Site shows "Welcome to Nginx" page

**Cause:** Certbot created a duplicate server block that's being served instead of your app.

**Solution:** Follow the [Manual Fix](#manual-fix-required-after-running-ssl_certbotsh) instructions above.

### Site returns 404 error

**Cause:** Same as above - duplicate server blocks.

**Solution:** Edit `/etc/nginx/sites-available/ames-website` and remove the second server block.

### Certbot fails to issue/renew certificate

**Possible causes:**
- DNS A/AAAA record doesn't point to this server
- Inbound port 80 is not open in firewall
- Nginx is not running

**Solutions:**
```bash
# Check DNS
nslookup ames.nitk.ac.in

# Check if Nginx is running
sudo systemctl status nginx

# Check firewall (Ubuntu)
sudo ufw status

# Allow HTTP/HTTPS if needed
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### PM2 app not running

**Check status:**
```bash
pm2 status
pm2 logs ames-website --lines 100
```

**Restart:**
```bash
pm2 restart ames-website
```

**If app won't start, rebuild:**
```bash
cd ~/AMES-Website
npm install
npm run build
pm2 restart ames-website
```

### Changes not reflecting on website

**Possible causes:**
- Browser cache
- Build not completed
- PM2 not restarted

**Solutions:**
```bash
# Rebuild and restart
cd ~/AMES-Website
npm run build
pm2 restart ames-website

# Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
```

### SSL certificate expiration warning

Let's Encrypt certificates are valid for 90 days and should auto-renew.

**Check auto-renewal:**
```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

**Force renewal if needed:**
```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

---

## Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

---

**For questions or issues, contact:** amesnitk@gmail.com
