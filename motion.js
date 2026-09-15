/* ===================== MOTION: scroll progress, custom cursor, magnetic buttons =====================
   Vanilla-JS ports of the nexus-studio template's motion primitives, adapted to this site's
   existing markup (no framer-motion / React dependency). Desktop pointer devices only. */
(function () {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ---- Scroll progress bar ---- */
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    function updateProgress() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var pct = height > 0 ? scrollTop / height : 0;
        bar.style.transform = 'scaleX(' + pct + ')';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    /* ---- Custom cursor: dot + trailing ring, expands over [data-cursor] ---- */
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.documentElement.classList.add('has-custom-cursor');

    var mouseX = -100, mouseY = -100;
    var dotX = -100, dotY = -100, ringX = -100, ringY = -100;

    window.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function lerp(a, b, n) { return a + (b - a) * n; }

    function raf() {
        dotX = lerp(dotX, mouseX, 0.35);
        dotY = lerp(dotY, mouseY, 0.35);
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);
        dot.style.transform = 'translate(' + dotX + 'px,' + dotY + 'px) translate(-50%,-50%)';
        ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.addEventListener('mouseover', function (e) {
        var el = e.target.closest && e.target.closest('[data-cursor]');
        if (el) {
            var label = el.getAttribute('data-cursor');
            dot.textContent = label === 'text' ? '' : label.toUpperCase();
            dot.classList.add('cursor-dot--hover');
            ring.classList.add('cursor-ring--hover');
        }
    });
    document.addEventListener('mouseout', function (e) {
        var related = e.relatedTarget;
        if (related && related.closest && related.closest('[data-cursor]')) return;
        dot.textContent = '';
        dot.classList.remove('cursor-dot--hover');
        ring.classList.remove('cursor-ring--hover');
    });

    /* ---- Magnetic buttons: pulls toward the cursor within its bounds ----
       Explicit [data-magnetic] opt-in, plus the site's own recurring pill/CTA
       classes so pages don't need per-element markup changes. */
    var magneticSelectors = [
        '[data-magnetic]',
        '.mission-cta',
        '.back-btn',
        '.error-link.primary',
        '.contact-form button[type="submit"]',
        '.logo-dl'
    ];
    document.querySelectorAll(magneticSelectors.join(',')).forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var dx = (e.clientX - cx) * 0.35;
            var dy = (e.clientY - cy) * 0.35;
            el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        });
        el.addEventListener('mouseleave', function () {
            el.style.transform = 'translate(0,0)';
        });
    });

    /* ---- Cursor label on the site's other recurring CTA elements, without
       requiring a data-cursor attribute on every one of them ---- */
    var clickCursorSelectors = magneticSelectors.concat(['.brand-action-card']);
    document.querySelectorAll(clickCursorSelectors.join(',')).forEach(function (el) {
        if (!el.hasAttribute('data-cursor')) el.setAttribute('data-cursor', 'click');
    });
})();
