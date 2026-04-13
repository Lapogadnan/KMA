// face-utils.js — Minecraft face avatar system
// Deterministically assigns one of 12 Minecraft mob/skin faces to any user
// based on their UID or display name. Same seed → same face every time.
(function () {
  var MC_FACES = [
    'faces/Alex_face.png',
    'faces/Bee_face.png',
    'faces/Enderman_face.png',
    'faces/GhastlingFace.png',
    'faces/Human_face.png',
    'faces/Pig_face.png',
    'faces/Skeleton_face.png',
    'faces/Slime_face.png',
    'faces/Snow_Golem_face.png',
    'faces/Spider_face.png',
    'faces/Wither_face.png',
    'faces/Zombie_face.png',
  ];

  // Simple but consistent hash — same seed always returns same index
  function getFace(seed) {
    var str = String(seed || '');
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash * 31) + str.charCodeAt(i)) | 0;
    }
    return MC_FACES[Math.abs(hash) % MC_FACES.length];
  }

  // Returns a ready-to-insert <img> HTML string
  function faceHTML(seed, size, extraClass) {
    size      = size      || 36;
    extraClass = extraClass || '';
    var src = getFace(seed);
    return '<img src="' + src + '" class="mc-avatar ' + extraClass + '" ' +
           'width="' + size + '" height="' + size + '" alt="" ' +
           'style="object-fit:cover;image-rendering:pixelated;display:block;border-radius:2px;">';
  }

  window.MC_FACES  = MC_FACES;
  window.getFace   = getFace;
  window.faceHTML  = faceHTML;
})();
