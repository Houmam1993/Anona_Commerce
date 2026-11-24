# Anona Jewels — store preview

A static preview of the new white e-commerce layout for anonajewels.ae. No build step: plain HTML, CSS and JavaScript.

## Pages
- `index.html`: homepage (hero slideshow, categories, Build Your Piece, favourites, gifts, bespoke)
- `shop.html`: collection page. Use `?c=rings` (or `necklaces`, `bracelets`, `earrings`, `mens`, `signature`, `all`), with optional `&tag=`, `&price=u250|m|o400` and `&q=` search
- `product.html?p=<handle>`: product page for any of the 134 products (all 69 rings included)

## Data
`data.js` is a snapshot of the live Shopify catalogue (titles, prices, descriptions, image links), taken 25 Nov 2026. Product images load from the Shopify CDN.

## Preview link
- **GitHub Pages:** push to a repo → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
- **Netlify:** drag this folder onto app.netlify.com/drop, or connect the repo (no build command, publish directory `/`).

The bag and wishlist only work in this preview (they're stored in the visitor's browser). Checkout isn't connected. "Order or ask on WhatsApp" sends the chosen options to +971 55 620 1515.
