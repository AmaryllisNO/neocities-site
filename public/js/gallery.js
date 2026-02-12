import artworksData from '../assets/images/art/showcase/images.json' with { type: 'json' };
console.log('artworksData', artworksData);

document.addEventListener('DOMContentLoaded', function () {
  // Gallery navigation
  const galleryWrapper = document.querySelector('.gallery__wrapper');

  // create images dynamically from JSON data
  const artworkHtml = artworksData
    .map((artwork) => {
      return `<a class="gallery__artwork" href="?img=${artwork.id}">
        <img data-id="${artwork.id}" src="../../assets/images/art/showcase/${artwork.filename}" alt="${artwork.alt}" loading="lazy">
      </a>`;
    })
    .join('');

  galleryWrapper.innerHTML = artworkHtml;

  // Lightbox elements
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__image');
  const lightboxCaption = document.querySelector('.lightbox__caption');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__nav--prev');
  const lightboxNext = document.querySelector('.lightbox__nav--next');
  const url = new URL(window.location.href);

  const artworks = document.querySelectorAll('.gallery__artwork img');

  // Justified layout function: groups images into rows that fill the container width
  function justifyGallery(container, options = {}) {
    const targetRowHeight = options.targetRowHeight || 220; // preferred row height in px
    const items = Array.from(container.querySelectorAll('.gallery__artwork'));
    if (items.length === 0) return;

    const imgs = items.map((i) => i.querySelector('img'));

    const waitForImages = () =>
      Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = img.onerror = res;
              }),
        ),
      );

    const layout = () => {
      const containerWidth = Math.floor(container.clientWidth);
      const gapStr =
        getComputedStyle(container).gap ||
        getComputedStyle(container).columnGap ||
        '10px';
      const gap = parseFloat(gapStr) || 10;

      let row = [];
      let rowRatios = 0;

      // reset styles
      items.forEach((it) => {
        it.style.width = '';
        it.style.height = '';
        it.style.margin = '';
      });

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const img = imgs[i];
        const ratio =
          img.naturalWidth && img.naturalHeight
            ? img.naturalWidth / img.naturalHeight
            : img.width / img.height || 1;

        row.push({ it, img, ratio });
        rowRatios += ratio;

        const totalGap = gap * (row.length - 1);
        const rowWidthAtTarget = rowRatios * targetRowHeight + totalGap;

        if (rowWidthAtTarget >= containerWidth || i === items.length - 1) {
          // finalize this row; compute row height to exactly fill width
          const height = (containerWidth - totalGap) / rowRatios;

          // apply sizes
          row.forEach(({ it, img, ratio }) => {
            const w = Math.round(ratio * height);
            it.style.width = w + 'px';
            it.style.height = Math.round(height) + 'px';
            it.style.flex = '0 0 ' + w + 'px';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.style.display = 'block';
          });

          // reset row
          row = [];
          rowRatios = 0;
        }
      }
    };

    waitForImages()
      .then(() => {
        layout();
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(layout, 150);
        });
      })
      .catch(() => layout());
  }

  // run justified layout on the gallery wrapper
  const galleryWrapperEl = document.querySelector('.gallery__wrapper');
  if (galleryWrapperEl)
    justifyGallery(galleryWrapperEl, { targetRowHeight: 220 });
  let currentIndex = 0;

  // Helper to find index by data-id
  function findIndexById(id) {
    for (let i = 0; i < artworks.length; i++) {
      if (artworks[i].dataset.id === id) return i;
    }
    return -1;
  }

  // Set total slides count

  // Lightbox functions
  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = artworks[currentIndex].src;
    lightboxCaption.textContent = artworks[currentIndex].alt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
    updateLightboxNav();
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  }

  function updateLightboxNav() {
    lightboxPrev.disabled = currentIndex === 0;
    lightboxNext.disabled = currentIndex === artworks.length - 1;
  }

  // Artwork click event: use anchor if present, push query string for sharing
  artworks.forEach((artwork, index) => {
    const anchor = artwork.closest('a');
    console.log('artwork', artwork, anchor);
    const id = artwork.dataset.id || String(index);

    const onClick = (e) => {
      if (e) e.preventDefault();
      openLightbox(index);
      const url = new URL(window.location.href);
      url.searchParams.set('img', id);
      history.pushState({ img: id }, '', url);
    };

    if (anchor) {
      anchor.addEventListener('click', onClick);
    } else {
      artwork.addEventListener('click', onClick);
    }
  });

  // Lightbox navigation
  lightboxPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      lightboxImg.src = artworks[currentIndex].src;
      lightboxCaption.textContent = artworks[currentIndex].alt;

      const newId = artworks[currentIndex].dataset.id;
      url.searchParams.set('img', newId);
      history.pushState({ img: newId }, 'prev image', url);

      updateLightboxNav();
    }
  });

  lightboxNext.addEventListener('click', () => {
    if (currentIndex < artworks.length - 1) {
      currentIndex++;
      lightboxImg.src = artworks[currentIndex].src;
      lightboxCaption.textContent = artworks[currentIndex].alt;

      const newId = artworks[currentIndex].dataset.id;
      url.searchParams.set('img', newId);
      history.pushState({ img: newId }, 'next image', url);

      updateLightboxNav();
    }
  });

  // Close lightbox
  lightboxClose.addEventListener('click', () => {
    closeLightbox();
    // Remove query string when closing
    history.replaceState({}, '', window.location.pathname);
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
      history.replaceState({}, '', window.location.pathname);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('show')) {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            currentIndex--;
            lightboxImg.src = artworks[currentIndex].src;
            lightboxCaption.textContent = artworks[currentIndex].alt;
            updateLightboxNav();
          }
          break;
        case 'ArrowRight':
          if (currentIndex < artworks.length - 1) {
            currentIndex++;
            lightboxImg.src = artworks[currentIndex].src;
            lightboxCaption.textContent = artworks[currentIndex].alt;
            updateLightboxNav();
          }
          break;
      }
    }
  });

  // Initialize
  // If page has ?img=slug, open that artwork on load
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('img');
  if (requested) {
    const idx = findIndexById(requested);
    if (idx >= 0) {
      // open after a tick to allow layout
      setTimeout(() => openLightbox(idx), 0);
    }
  }

  // Handle back/forward navigation
  /*  window.addEventListener('popstate', (e) => {
    const p = new URLSearchParams(window.location.search);
    console.log('popstate', p);
    const img = p.get('img');
    if (img) {
      const idx = findIndexById(img);
      if (idx >= 0) openLightbox(idx);
    } else {
      closeLightbox();
    }
  }); */
});
