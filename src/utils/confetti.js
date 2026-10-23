export function burstConfetti(originEl) {
  if (!originEl) return;
  const colors = ['#16A34A', '#F59E0B', '#EF4444', '#22c55e', '#FBBF24'];
  const rect = originEl.getBoundingClientRect();

  for (let i = 0; i < 26; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 6;
    piece.style.width = size + 'px';
    piece.style.height = (size * 0.4) + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = (rect.left + rect.width / 2) + 'px';
    piece.style.top = (rect.top + window.scrollY) + 'px'; // account for absolute positioning
    piece.style.position = 'absolute';
    piece.style.zIndex = '99999';
    piece.style.pointerEvents = 'none';

    const angle = Math.random() * Math.PI - Math.PI / 2;
    const velocity = 4 + Math.random() * 5;
    const vx = Math.cos(angle) * velocity * 18;
    const vy = -Math.abs(Math.sin(angle) * velocity) * 22 - 40;
    const rotation = Math.random() * 720 - 360;

    document.body.appendChild(piece);

    piece.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${vx}px, ${vy + 260}px) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: 1100 + Math.random() * 400,
      easing: 'cubic-bezier(.22,.61,.36,1)'
    });

    setTimeout(() => {
      piece.remove();
    }, 1600);
  }
}
