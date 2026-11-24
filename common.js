/* Shared layout + helpers for the Anona preview site */
(function () {
  var P = window.ANONA_PRODUCTS || [];
  var BUILDER = 'https://create.anonajewels.ae/build-your-piece';
  var WA = 'https://wa.me/971556201515';

  var CATS = {
    all: { name: 'All Jewelry', test: function () { return true; }, intro: 'Every piece in the Anona collection.' },
    rings: { name: 'Rings', test: function (p) { return p.type === 'Rings'; }, intro: 'Stackable bands, signets, birthstone and diamond rings, personalised to order.' },
    necklaces: { name: 'Necklaces', test: function (p) { return p.type === 'Necklaces' && +p.price < 5000; }, intro: 'Name, initial, birthstone and hidden-message necklaces.' },
    bracelets: { name: 'Bracelets', test: function (p) { return p.type === 'Bracelets' && +p.price < 5000; }, intro: 'Tennis, initial and family bracelets.' },
    earrings: { name: 'Earrings', test: function (p) { return p.type === 'Earrings'; }, intro: 'Studs, hoops and drops set with birthstones.' },
    mens: { name: "Men's", test: function (p) { return p.type === 'Mens'; }, intro: 'Signets and family rings for him.' },
    signature: { name: 'Signature', test: function (p) { return +p.price >= 5000; }, intro: '18K gold and certified diamonds, finished and ready to wear.' }
  };

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(v) { var n = +v; return 'AED ' + (n >= 1000 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : n.toFixed(2)); }
  function img(u, w) { return u ? u + (u.indexOf('?') > -1 ? '&' : '?') + 'width=' + (w || 600) : ''; }
  function find(h) { for (var i = 0; i < P.length; i++) if (P[i].h === h) return P[i]; return null; }
  function catOf(p) { if (+p.price >= 5000) return 'signature'; return { Rings: 'rings', Necklaces: 'necklaces', Bracelets: 'bracelets', Earrings: 'earrings', Mens: 'mens' }[p.type] || 'all'; }
  function label(p) { return (p.tags && p.tags[0]) ? p.tags[0].replace(/^Fashion /, '') : p.type; }

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('anona_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('anona_' + k, JSON.stringify(v)); } catch (e) {} }
  };

  var heart = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.5" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';

  function card(p, opts) {
    opts = opts || {};
    var wished = (store.get('wish', [])).indexOf(p.h) > -1;
    return '<article class="card">' +
      '<a href="product.html?p=' + encodeURIComponent(p.h) + '">' +
      '<div class="img"><img loading="lazy" src="' + esc(img(p.img[0], 600)) + '" alt="' + esc(p.t) + '"></div>' +
      '<div style="display:flex;flex-direction:column;gap:4px">' +
      (opts.tag ? '<span class="tag">' + esc(label(p)) + '</span>' : '') +
      '<span class="t">' + esc(p.t) + '</span><span class="p">' + money(p.price) + '</span></div></a>' +
      '<button type="button" class="wish' + (wished ? ' on' : '') + '" data-wish="' + esc(p.h) + '" aria-pressed="' + wished + '" aria-label="Save ' + esc(p.t) + ' to wishlist">' + heart + '</button>' +
      '</article>';
  }

  function header(active) {
    var on = function (k) { return active === k ? ' class="on" aria-current="page"' : ''; };
    var ringTags = ['Stackable Rings', "Couple's Rings", 'Initial Rings', 'Promise Rings', "Mother's Rings", 'Fashion Rings'];
    return '' +
      '<div class="util"><div class="wrap"><span>Free insured delivery across the UAE · Lifetime craftsmanship warranty</span>' +
      '<span style="display:flex;flex-wrap:wrap;gap:20px"><a href="' + WA + '">WhatsApp +971 55 620 1515</a><a href="' + WA + '?text=' + encodeURIComponent('Hello Anona, I would like to book an appointment.') + '">Book an appointment</a><span>AED</span></span></div></div>' +
      '<div class="site-head"><div class="wrap head-row">' +
      '<button type="button" class="menu-btn" aria-label="Open menu" aria-expanded="false" id="menuBtn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.6" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
      '<form class="search" role="search" action="shop.html"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><label for="q" class="sr">Search</label><input id="q" name="q" type="search" placeholder="Search jewelry"></form>' +
      '<a class="logo" href="index.html" aria-label="Anona Jewels home"><img src="assets/logo.png" alt="Anona"></a>' +
      '<nav class="icons" aria-label="Account"><a href="#" aria-label="Account"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/><circle cx="12" cy="8" r="4"/></svg></a>' +
      '<a href="shop.html?wish=1" aria-label="Wishlist"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></a>' +
      '<a href="#" aria-label="Bag"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span id="bagCount">' + store.get('bag', 0) + '</span></a></nav>' +
      '</div>' +
      '<nav class="mainnav" id="mainnav" aria-label="Shop">' +
      '<a href="' + BUILDER + '">Engagement Rings</a>' +
      '<div class="has-mega"><a href="shop.html?c=rings"' + on('rings') + '>Rings</a><div class="mega"><div class="wrap">' +
      '<div><h4>Shop by style</h4>' + ringTags.map(function (t) { return '<a href="shop.html?c=rings&tag=' + encodeURIComponent(t) + '">' + esc(t) + '</a>'; }).join('') + '<a href="shop.html?c=rings" style="color:#111;font-weight:500">View all rings</a></div>' +
      '<div><h4>Shop by stone</h4><a href="shop.html?c=rings&q=diamond">Diamond</a><a href="shop.html?c=rings&q=sapphire">Lab-created white sapphire</a><a href="shop.html?c=rings&q=birthstone">Birthstone</a></div>' +
      '<div><h4>Shop by price</h4><a href="shop.html?c=rings&price=u250">Under AED 250</a><a href="shop.html?c=rings&price=m">AED 250 – 400</a><a href="shop.html?c=rings&price=o400">Over AED 400</a></div>' +
      '<a href="' + BUILDER + '" style="padding:0"><img src="assets/byp-ring.jpg" alt="" style="width:100%;aspect-ratio:16/10;object-fit:cover"><span style="display:block;margin-top:10px;color:#111;font-weight:500">Build your own piece →</span></a>' +
      '</div></div></div>' +
      '<a href="shop.html?c=necklaces"' + on('necklaces') + '>Necklaces</a>' +
      '<a href="shop.html?c=bracelets"' + on('bracelets') + '>Bracelets</a>' +
      '<a href="shop.html?c=earrings"' + on('earrings') + '>Earrings</a>' +
      '<a href="shop.html?c=mens"' + on('mens') + '>Men\'s</a>' +
      '<a href="shop.html?c=all&q=mother"' + on('gifts') + '>Gifts</a>' +
      '<a href="shop.html?c=signature"' + on('signature') + '>Signature</a>' +
      '<a class="accent" href="' + BUILDER + '">Design Your Own</a>' +
      '</nav></div>';
  }

  function footer() {
    return '<footer class="site-foot"><div class="wrap foot-cols">' +
      '<div><h4>Shop</h4><a href="shop.html?c=rings">Rings</a><a href="shop.html?c=necklaces">Necklaces</a><a href="shop.html?c=bracelets">Bracelets</a><a href="shop.html?c=earrings">Earrings</a><a href="shop.html?c=signature">Signature</a></div>' +
      '<div><h4>Customer care</h4><a href="#">Delivery</a><a href="#">Returns &amp; exchanges</a><a href="#">Ring size guide</a><a href="#">Jewelry care</a><a href="' + WA + '">Contact us</a></div>' +
      '<div><h4>About</h4><a href="#">Our atelier</a><a href="' + BUILDER + '">Build Your Piece</a><a href="' + WA + '">Book an appointment</a></div>' +
      '<form onsubmit="return false"><h4>Newsletter</h4><p class="muted" style="margin:0 0 12px">New pieces and private offers, by email.</p><label for="nl" class="sr">Email address</label><div class="news"><input id="nl" type="email" placeholder="Email address"><button type="submit">Sign up</button></div></form>' +
      '</div><div class="wrap foot-base"><span>© 2026 Anona Jewels · Dubai, UAE</span><span>info@anonajewels.ae · Privacy Policy · Terms of Service</span></div></footer>' +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
  }

  function toast(msg) { var t = document.getElementById('toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2200); }

  function mount(active) {
    var h = document.getElementById('site-header'); if (h) h.innerHTML = header(active);
    var f = document.getElementById('site-footer'); if (f) f.innerHTML = footer();
    var mb = document.getElementById('menuBtn');
    if (mb) mb.addEventListener('click', function () { var n = document.getElementById('mainnav'); var o = n.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-wish]'); if (!b) return;
      var w = store.get('wish', []); var h = b.getAttribute('data-wish'); var i = w.indexOf(h);
      if (i > -1) w.splice(i, 1); else w.push(h);
      store.set('wish', w); b.classList.toggle('on', i < 0); b.setAttribute('aria-pressed', i < 0);
      toast(i < 0 ? 'Saved to wishlist' : 'Removed from wishlist');
    });
  }

  function addToBag(p) { var n = store.get('bag', 0) + 1; store.set('bag', n); var el = document.getElementById('bagCount'); if (el) el.textContent = n; toast(p.t + ' added to bag'); }

  window.Anona = { P: P, CATS: CATS, BUILDER: BUILDER, WA: WA, esc: esc, money: money, img: img, find: find, catOf: catOf, label: label, card: card, mount: mount, toast: toast, store: store, addToBag: addToBag };
})();
