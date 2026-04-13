// audio.js — Minecraft sound effects for Kill My Assignments

(function () {
  function mkAudio(src) {
    var a = new Audio(src);
    a.preload = 'auto';
    a.volume = 0.5;
    return a;
  }

  var SFX = {
    button:      mkAudio('audio/button.mp3'),
    anvil:       mkAudio('audio/anvil.mp3'),
    achievement: mkAudio('audio/Rare Achievement - Minecraft Sound Effect (HD).mp3'),
    creeper:     mkAudio('audio/Creeper Minecraft Sound Effect.mp3'),
    villager:    mkAudio('audio/Minecraft Villager (huh) - Sound Effect.mp3'),
    metalPipe:   mkAudio('audio/metal pipe falling sound effect.mp3'),
    zombie:      mkAudio('audio/zombie.mp3'),
  };

  function play(sfx) {
    try { sfx.currentTime = 0; sfx.play().catch(function () {}); } catch (e) {}
  }

  window.KMA = window.KMA || {};

  // Named play helpers — called from page-specific JS
  window.KMA.playButton      = function () { play(SFX.button); };
  window.KMA.playAnvil       = function () { play(SFX.anvil); };
  window.KMA.playAchievement = function () { play(SFX.achievement); };
  window.KMA.playCreeper     = function () { play(SFX.creeper); };
  window.KMA.playZombie      = function () { play(SFX.zombie); };

  // Check-in sound: 9/10 villager "huh", 1/10 metal pipe
  window.KMA.playCheckin = function () {
    play(Math.random() < 0.1 ? SFX.metalPipe : SFX.villager);
  };

  function isNavigableNavLink(el) {
    if (!el || el.tagName !== 'A') return false;
    var href = el.getAttribute('href');
    if (!href || href === '#' || href.indexOf('javascript:') === 0) return false;
    if (el.hasAttribute('download') || el.target === '_blank') return false;
    return el.matches('a.nav-tab, a.nav-logo, a.nav-login-btn, a.nav-user-pill, a.nav-item');
  }

  document.addEventListener('click', function (e) {
    var navLink = e.target.closest('a.nav-tab, a.nav-logo, a.nav-login-btn, a.nav-user-pill, a.nav-item');
    if (!isNavigableNavLink(navLink)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    play(SFX.button);
    window.setTimeout(function () {
      window.location.href = navLink.href;
    }, 140);
  }, true);

  // Global click handler — fires button.mp3 for any other interactive element
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    var el = e.target.closest(
      'button, ' +
      'a.nav-tab, a.nav-logo, a.nav-login-btn, a.nav-user-pill, ' +
      'a.nav-item, .nav-login-btn, ' +
      '.nearby-item, .lb-row, ' +
      '.mc-avatar, .nav-user-dot, ' +
      '.duel-btn, .encourage-btn, .lb-duel-btn, ' +
      '.btn-challenge, .gate-btn-primary, .gate-btn-ghost, ' +
      '.duel-locked-btn, .btn-white'
    );
    if (el) window.KMA.playButton();
  }, true); // capture phase — fires even on dynamically-created elements
})();
