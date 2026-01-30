# SEO Implementation Guide for AMES NITK Website

## What We've Implemented

### 1. Meta Tags (index.html)

✅ **Primary Meta Tags**
- Title, description, keywords
- Author, robots directives
- Canonical URL

✅ **Open Graph Tags** (Facebook, LinkedIn)
- Proper social media preview cards
- Title, description, image, URL

✅ **Twitter Card Tags**
- Large image summary card
- Optimized for Twitter sharing

✅ **Geo Tags**
- Location data for NITK Surathkal
- Helps with local search

✅ **Structured Data (JSON-LD)**
- Organization schema
- Contact information
- Address and geo-coordinates
- Parent organization (NITK)

### 2. SEO Files

✅ **robots.txt** - Tells search engines what to crawl
✅ **sitemap.xml** - Lists all pages for search engines

---

## Post-Deployment Tasks

### 1. Submit to Search Engines

#### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property: `https://ames.nitk.ac.in`
3. Verify ownership (use HTML file or DNS method)
4. Submit sitemap: `https://ames.nitk.ac.in/sitemap.xml`
5. Request indexing for homepage

#### Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap
4. Request indexing

### 2. Create Social Media Images

For now, the site reuses the existing logo image for social previews:

- `public/ames-logo.png` is used for both Open Graph and Twitter cards
- The same image is also used as the Apple touch icon

If you later want richer previews, you can replace `public/ames-logo.png` with a dedicated 1200×630 share image (recommended), or add a separate OG/Twitter image and update `public/index.html` accordingly.

Use tools like Canva or Figma to create branded images with:
- AMES logo
- "Association of Mechanical Engineering Students"
- "NITK Surathkal"
- Your brand colors

### 3. Update Social Media Links

In `index.html`, update the `sameAs` array with your actual social media URLs:

```json
"sameAs": [
  "https://www.facebook.com/amesnitk",
  "https://twitter.com/amesnitk",
  "https://www.instagram.com/amesnitk",
  "https://www.linkedin.com/company/amesnitk"
]
```

### 4. Performance Optimization

#### Enable Gzip Compression (Nginx)

Add to `/etc/nginx/sites-available/ames-website`:

```nginx
# Gzip compression
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
```

#### Add Caching Headers

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

Then reload: `sudo systemctl reload nginx`

### 5. Monitor SEO

#### Google Search Console - Check:
- Indexing status
- Search performance
- Mobile usability
- Core Web Vitals
- Coverage errors

#### Google Analytics (Optional)
1. Create account: https://analytics.google.com
2. Get tracking code
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## SEO Best Practices Going Forward

### Content Guidelines

✅ **Use Descriptive URLs**
- Good: `/events`, `/about`, `/projects`
- Bad: `/page1`, `/section`, `/temp`

✅ **Write Quality Content**
- Use proper headings (H1, H2, H3)
- Include relevant keywords naturally
- Keep paragraphs short and readable
- Add alt text to all images

✅ **Update Regularly**
- Post new events and updates
- Keep content fresh
- Update sitemap.xml when adding pages

### Technical SEO

✅ **Mobile-Friendly** (Already implemented)
- Responsive design
- Touch-friendly buttons
- Fast loading on mobile

✅ **HTTPS** (Already implemented)
- SSL certificate active
- Secure connection

✅ **Fast Loading Speed**
- Optimize images (use WebP format)
- Minimize CSS/JS
- Lazy load images

✅ **Accessibility**
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works

---

## Update Sitemap When Adding Pages

When you add new pages, update `public/sitemap.xml`:

```xml
<url>
  <loc>https://ames.nitk.ac.in/new-page</loc>
  <lastmod>2026-XX-XX</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

Then submit to Google Search Console.

---

## Testing Your SEO

### Test Tools:

1. **Google Mobile-Friendly Test**
   https://search.google.com/test/mobile-friendly

2. **Google Rich Results Test**
   https://search.google.com/test/rich-results

3. **PageSpeed Insights**
   https://pagespeed.web.dev/

4. **Open Graph Checker**
   https://www.opengraph.xyz/

5. **Twitter Card Validator**
   https://cards-dev.twitter.com/validator

6. **Structured Data Testing Tool**
   https://validator.schema.org/

---

## Expected Timeline

- **24-48 hours**: Google discovers your site
- **1-2 weeks**: Initial indexing of main pages
- **2-4 weeks**: Full indexing and ranking begins
- **1-3 months**: Stable rankings achieved

---

## Keywords to Target

Primary:
- AMES NITK
- Mechanical Engineering NITK
- NITK Student Organizations

Secondary:
- Mechanical Engineering Events
- NITK Surathkal Student Associations
- Engineering Projects NITK
- Mechanical Engineering Students India

Long-tail:
- Association of Mechanical Engineering Students NITK
- Best mechanical engineering colleges in India
- NITK Surathkal mechanical department

---

## Support

For SEO questions or issues, refer to:
- Google Search Central: https://developers.google.com/search
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmasters-guidelines

**Need help? Contact:** amesnitk@gmail.com
