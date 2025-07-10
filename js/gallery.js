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

  const artworks = document.querySelectorAll('.gallery__artwork img');
  let currentIndex = 0;

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

  // Artwork click event
  artworks.forEach((artwork, index) => {
    artwork.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // Lightbox navigation
  lightboxPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      lightboxImg.src = artworks[currentIndex].src;
      lightboxCaption.textContent = artworks[currentIndex].alt;
      updateLightboxNav();
    }
  });

  lightboxNext.addEventListener('click', () => {
    if (currentIndex < artworks.length - 1) {
      currentIndex++;
      lightboxImg.src = artworks[currentIndex].src;
      lightboxCaption.textContent = artworks[currentIndex].alt;
      updateLightboxNav();
    }
  });

  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
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
});
