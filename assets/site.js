// Wires every [data-buy] link and [data-price] span to assets/store-config.js
(function () {
  var S = window.SITE || {products: {}};
  function isSet(u) { return u && u.indexOf('https://REPLACE') !== 0; }
  document.querySelectorAll('[data-buy]').forEach(function (a) {
    var p = S.products[a.getAttribute('data-buy')];
    if (p && isSet(p.url)) { a.href = p.url; a.rel = 'noopener'; }
    else { a.textContent = 'Coming soon'; a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.style.opacity = '.6'; a.style.cursor = 'default'; }
  });
  document.querySelectorAll('[data-price]').forEach(function (el) {
    var p = S.products[el.getAttribute('data-price')]; if (p) el.textContent = p.price;
  });
  document.querySelectorAll('[data-newsletter]').forEach(function (a) {
    if (isSet(S.newsletterUrl)) { a.href = S.newsletterUrl; a.target = '_blank'; a.rel = 'noopener'; }
    else { var box = a.closest('.cta') || a; box.style.display = 'none'; }
  });
  if (isSet(S.newsletterUrl) && !document.querySelector('[data-newsletter]')) {
    var foot = document.querySelector('footer .wrap');
    if (foot) {
      var p = document.createElement('p');
      p.className = 'free-club';
      var a = document.createElement('a');
      a.setAttribute('data-newsletter', '');
      a.href = S.newsletterUrl; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'Join the free club';
      p.appendChild(a); foot.appendChild(p);
    }
  }
  document.querySelectorAll('[data-contact]').forEach(function (el) {
    if (S.contactEmail && S.contactEmail.indexOf('REPLACE') !== 0) { el.textContent = S.contactEmail; el.href = 'mailto:' + S.contactEmail; }
    else if (S.contactUrl) { el.textContent = 'contact us through our store'; el.href = S.contactUrl; el.rel = 'noopener'; }
    else { el.closest('.contact') && (el.closest('.contact').style.display = 'none'); }
  });
  document.querySelectorAll('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
})();
