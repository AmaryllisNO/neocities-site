document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('collaborationsCarousel');
  const track = document.getElementById('carouselTrack');
  const cards = Array.from(track.querySelectorAll('.collaboration-card'));

  if (cards.length === 0) return;

  // Clone original cards to create seamless loop
  const totalCards = cards.length;
  cards.forEach((card) => track.appendChild(card.cloneNode(true)));

  // Remove CSS transitions; we'll animate via RAF for smooth continuous movement
  track.style.transition = 'none';

  // Calculate width of original set (including gaps)
  const getGap = () => {
    const gs = getComputedStyle(track).gap;
    return gs ? parseFloat(gs) : 20;
  };

  let gap = getGap();
  let originalWidth = 0;
  const recalc = () => {
    gap = getGap();
    originalWidth = 0;
    for (let i = 0; i < totalCards; i++) {
      originalWidth += cards[i].offsetWidth;
    }
    originalWidth += gap * (totalCards - 1);
  };

  // Wait for images inside original cards to load before measuring
  const imgs = [];
  for (let i = 0; i < totalCards; i++) {
    imgs.push(...Array.from(cards[i].querySelectorAll('img')));
  }

  const waitForImages = () =>
    Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => (img.onload = img.onerror = res)),
      ),
    );

  const start = () => {
    recalc();
    window.addEventListener('resize', recalc);

    // animation state
    let last = performance.now();
    let offset = 0; // px scrolled from start
    const speed = 40; // px per second (adjust to taste)

    function step(now) {
      const dt = (now - last) / 1000;
      last = now;
      offset += speed * dt;

      // loop when we've scrolled one set of originals
      if (offset >= originalWidth) offset -= originalWidth;

      track.style.transform = `translateX(-${offset}px)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  };

  waitForImages().then(start).catch(start);
});
