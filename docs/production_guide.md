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

### IMPORTANT: `sudo` + permissions (read this once)

You only need `sudo` for **system-level** actions (installing packages, editing `/etc`, controlling services, Certbot).

- Use `sudo` for: `apt`, `nginx`, `systemctl`, `certbot`, editing `/etc/nginx/...`, copying files into `/etc/...`.
- Avoid `sudo` for: `git`, `npm install`, `npm run build`, and most `pm2` usage.

If you feel like you "need `sudo` for everything" inside `~/AMES-Website`, it usually means the repo (or `node_modules/`) got created as root (e.g. from running `sudo npm install`). Fix it once:

```bash
sudo chown -R $USER:$USER ~/AMES-Website
```

#### Why `pm2` vs `sudo pm2` shows different processes

PM2 stores its process list per-user (in `~/.pm2`). If the app was started with `sudo pm2 ...`, it was started as **root**, so it lives under `/root/.pm2`.

- `pm2 status` (your normal user) can show nothing
- `sudo pm2 status` (root) can show the process

This is normal. Pick one approach and stay consistent:

- **Recommended:** run PM2 as your deploy user (no sudo).
- **If you already started with root PM2:** keep using `sudo pm2 ...` until you migrate it.

### Step-by-Step Instructions

1. **SSH into your server**

   ```bash
   ssh user@your-server-ip
   ```

2. **Clone the repository**

   ```bash
   cd ~
   git clone https://github.com/ames-nitk/AMES-Website.git
   cd AMES-Website
   ```

3. **Install all dependencies (Node.js, Nginx, PM2, Certbot)**

   ```bash
   sudo bash all_dependencies.sh
   ```

4. **Build the app and configure Nginx**

   ```bash
   sudo bash server_setup.sh
   ```

   This will:

   - Install npm packages
   - Build the React app
   - Copy Nginx config to `/etc/nginx/sites-available/ames-website`
   - Start the app with PM2

5. **Enable HTTPS with Let's Encrypt**

   ```bash
   sudo bash ssl_certbot.sh
   ```

6. **CRITICAL: Fix the Nginx config after Certbot**

   Certbot can create a **duplicate server block** that breaks the site. You MUST fix this manually.

   ```bash
   sudo nano /etc/nginx/sites-available/ames-website
   ```

   You may see TWO server blocks. **Delete the second one** that looks like:

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

   Keep ONLY the main server block.

   For safe HTTP → HTTPS redirect (without breaking ACME challenges), put the redirect inside `location /` (not globally), like:

   ```nginx
   server {
       listen 80;
       listen 443 ssl; # managed by Certbot
       server_name ames.nitk.ac.in;

       location ^~ /.well-known/acme-challenge/ {
           root /var/www/certbot;
           try_files $uri =404;
       }

       location / {
           # Redirect HTTP to HTTPS (keeps ACME challenges working)
           if ($scheme = http) {
               return 301 https://$host$request_uri;
           }

           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           # ... proxy settings ...
       }

       ssl_certificate /etc/letsencrypt/live/ames.nitk.ac.in/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/ames.nitk.ac.in/privkey.pem;
       include /etc/letsencrypt/options-ssl-nginx.conf;
       ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
   }
   ```

7. **Test and reload Nginx**

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

8. **Verify the site is running**

   - Visit `http://ames.nitk.ac.in` (should redirect to HTTPS)
   - Visit `https://ames.nitk.ac.in` (should show the website)

---

## Deploying Updates from Repo

When new changes are pushed to the GitHub repository:

1. **SSH into your server**

   ```bash
   ssh user@your-server-ip
   cd ~/AMES-Website
   ```

2. **Pull the latest changes**

   ```bash
   git pull origin main
   ```

3. **Install any new dependencies (if `package.json` changed)**

   ```bash
   npm install
   ```

4. **Rebuild (recommended if frontend changes)**

   ```bash
   npm run build
   ```

5. **Restart the PM2 process**

   ```bash
   pm2 restart ames-website
   ```

   If `pm2 status` shows nothing but `sudo pm2 status` shows your process, use:

   ```bash
   sudo pm2 restart ames-website
   ```

6. **Check status/logs**

   ```bash
   pm2 status
   pm2 logs ames-website --lines 50
   ```

   If the process only appears under root PM2, use:

   ```bash
   sudo pm2 status
   sudo pm2 logs ames-website --lines 50
   ```

### If Nginx config changed

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

**Problem:** When you run `ssl_certbot.sh`, Certbot adds SSL configuration but can also create a **second server block** for HTTP → HTTPS redirect. This second block can conflict with the main block and break the site.

**Symptoms:**

- Site returns 404 or "Welcome to Nginx" page
- SSL works but the app doesn't load
- Two server blocks exist in `/etc/nginx/sites-available/ames-website`

### Manual Fix (required after running `ssl_certbot.sh`)

1. **Edit the Nginx config**

   ```bash
   sudo nano /etc/nginx/sites-available/ames-website
   ```

2. **Delete the duplicate block**

   You should keep ONE main block (the one that proxies to your app), and delete the extra Certbot-managed block that returns 404.

3. **Confirm redirect behavior**

   Prefer redirecting inside `location /` (so `/.well-known/acme-challenge/` still works), like in the Fresh Setup section.

4. **Test and reload**

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Certificate Renewal

Let's Encrypt certificates expire every 90 days. Ubuntu typically auto-renews them.

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

### Quick rule: `pm2` vs `sudo pm2`

Use **the same user** that originally started the process.

- If `pm2 status` shows your process: use plain `pm2 ...`
- If only `sudo pm2 status` shows your process: use `sudo pm2 ...`

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

Note: if you run this script with `sudo`, PM2 may start the process under the root user, so you may only see/manage it via `sudo pm2 ...`.

### ssl_certbot.sh

- Uses Certbot + Nginx plugin to request/renew a Let's Encrypt certificate.
- Note: can create a duplicate server block that must be manually removed (see SSL section above).

Defaults are set inside the script:

- `DOMAIN=ames.nitk.ac.in`
- `CERTBOT_EMAIL=amesnitk@gmail.com`

---

## Troubleshooting

### Site shows "Welcome to Nginx" page

**Cause:** Nginx is serving the default site, or Certbot created a duplicate server block that is being matched instead of your app.

**Solution:** remove the duplicate server block and ensure `/etc/nginx/sites-enabled/ames-website` is enabled.

### Site returns 404 error

**Cause:** same as above (duplicate server blocks / wrong server block serving).

**Solution:** edit `/etc/nginx/sites-available/ames-website` and remove the extra Certbot-managed block.

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

#### `pm2` shows nothing but `sudo pm2` shows the process

**Cause:** the app was started as root (`sudo pm2 ...`), so it exists under `/root/.pm2`.

**Short-term:** manage it with `sudo pm2 ...`.

**Recommended fix (migrate to user PM2):**

```bash
# See what root is running
sudo pm2 status

# Stop/delete the root-owned process
sudo pm2 stop ames-website
sudo pm2 delete ames-website

# Start again as your deploy user (NO sudo)
cd ~/AMES-Website
npm install
npm run build

# Start using your project's real start command
pm2 start <YOUR_START_COMMAND> --name ames-website

# Persist + boot startup for your user
pm2 save
pm2 startup systemd -u $USER --hp $HOME
```

Replace `<YOUR_START_COMMAND>` with whatever your server actually runs (e.g. `npm start` or `node server.js`).

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

**For questions or issues, contact:** [amesnitk@gmail.com](mailto:amesnitk@gmail.com)
   sudo pm2 status
   sudo pm2 logs ames-website --lines 50
   ```

### If Nginx config changed

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

### Quick rule: `pm2` vs `sudo pm2`

Use **the same user** that originally started the process.

- If `pm2 status` shows your process: use plain `pm2 ...`
- If only `sudo pm2 status` shows your process: use `sudo pm2 ...`

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

Note: if you run this script with `sudo`, PM2 may start the process under the root user, so you may only see/manage it via `sudo pm2 ...`.

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

#### `pm2` shows nothing but `sudo pm2` shows the process

**Cause:** the app was started as root (`sudo pm2 ...`), so it exists under `/root/.pm2`.

**Short-term:** manage it with `sudo pm2 ...`.

**Recommended fix (migrate to user PM2):**
```bash
# See what root is running
sudo pm2 status

# Stop/delete the root-owned process
sudo pm2 stop ames-website
sudo pm2 delete ames-website

# Start again as your deploy user (NO sudo)
cd ~/AMES-Website
npm install
npm run build

# Start using your project's real start command
pm2 start <YOUR_START_COMMAND> --name ames-website

# Persist + boot startup for your user
pm2 save
pm2 startup systemd -u $USER --hp $HOME
```

Replace `<YOUR_START_COMMAND>` with whatever your server actually runs (e.g. `npm start` or `node server.js`).

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
