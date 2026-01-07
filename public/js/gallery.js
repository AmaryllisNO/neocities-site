document.addEventListener('DOMContentLoaded', function () {
  // Gallery navigation
  const galleryWrapper = document.querySelector('.gallery__wrapper');

  // Lightbox elements
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__image');
  const lightboxCaption = document.querySelector('.lightbox__caption');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__nav--prev');
  const lightboxNext = document.querySelector('.lightbox__nav--next');
  const url = new URL(window.location.href);

  const artworks = document.querySelectorAll('.gallery__artwork img');
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
