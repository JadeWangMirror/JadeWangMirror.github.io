// Shared interactions
(function () {
  // Scroll progress
  const bar = document.getElementById('progress-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
    }, { passive: true });
  }

  // Cursor glow
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    let mx = innerWidth / 2, my = innerHeight / 2;
    let gx = mx, gy = my;
    let visible = false;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (!visible) { glow.style.opacity = '1'; visible = true; }
    });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; visible = false; });
    (function loop() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  // Nav stagger entrance
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.style.opacity = '0';
    a.style.transform = 'translateY(-4px)';
    a.style.transition = 'opacity 0.5s ease, transform 0.5s ease, color 0.2s';
    setTimeout(() => { a.style.opacity = ''; a.style.transform = ''; }, 200 + i * 80);
  });

  // Mobile hamburger menu
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    if (overlay) {
      overlay.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
      });
    }
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
  }
})();
