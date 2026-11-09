(function () {
  'use strict';

  /* ---------- تكبير/تصغير نسخة الديسكتوب لتطابق فيقما (عرض 1440) ---------- */
  var DESIGN_WIDTH = 1440;
  var DESKTOP_MIN = 1024;
  var root = document.documentElement;

  function fitDesktop() {
    var w = root.clientWidth || window.innerWidth;
    var z = (w >= DESKTOP_MIN && w < DESIGN_WIDTH) ? (w / DESIGN_WIDTH) : 1;
    root.style.setProperty('--z', z);
  }
  fitDesktop();
  window.addEventListener('resize', fitDesktop);

  /* ---------- Popups: الشروط والأحكام / سياسة الخصوصية ---------- */
  var lastFocus = null;

  function openModal(id) {
    var modal = document.getElementById('modal-' + id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-modal'));
    });
  });

  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(modal); });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = document.querySelector('.modal.is-open');
      if (open) closeModal(open);
    }
  });
})();
/* ===== FAQ: فتح وإغلاق الأسئلة ===== */
document.querySelectorAll('.faq__q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var isOpen = btn.parentElement.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
  });
});