import artworksData from '../assets/images/art/showcase/images.json' with { type: 'json' };
import amaryImagesData from '../assets/images/characters/amary/images.json' with { type: 'json' };

const galleryMapper = [
  {
    match: /^\/characters\/amary(?:\.html)?$/,
    data: amaryImagesData,
    imageDirectory: '../assets/images/characters/amary/',
  },
  {
    match: /^\/art(?:\.html)?$/,
    data: artworksData,
    imageDirectory: '../assets/images/art/showcase/',
  },
];

const defaultGallery = {
  data: artworksData,
  imageDirectory: '../assets/images/art/showcase/',
};

function resolveGallery(path) {
  return (
    galleryMapper.find((entry) => entry.match.test(path)) || defaultGallery
  );
}

function resolveImageSrc(baseDirectory, filename) {
  return new URL(baseDirectory + filename, import.meta.url).href;
}

function renderGallery(wrapper, gallery) {
  wrapper.innerHTML = gallery.data
    .map(
      (artwork) => `<a class="gallery__artwork" href="?img=${artwork.id}">
        <img data-id="${artwork.id}" src="${resolveImageSrc(gallery.imageDirectory, artwork.filename)}" alt="${artwork.alt}" loading="lazy">
      </a>`,
    )
    .join('');

  return Array.from(wrapper.querySelectorAll('.gallery__artwork img'));
}

function ensureLightbox() {
  let lightbox = document.querySelector('.lightbox');

  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox__content">
        <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <img class="lightbox__image" src="" alt="">
        <button class="lightbox__nav lightbox__nav--next" aria-label="Next">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <div class="lightbox__caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  return {
    lightbox,
    image: lightbox.querySelector('.lightbox__image'),
    caption: lightbox.querySelector('.lightbox__caption'),
    closeBtn: lightbox.querySelector('.lightbox__close'),
    prevBtn: lightbox.querySelector('.lightbox__nav--prev'),
    nextBtn: lightbox.querySelector('.lightbox__nav--next'),
  };
}

function justifyGallery(container, targetRowHeight = 220) {
  const items = Array.from(container.querySelectorAll('.gallery__artwork'));
  if (items.length === 0) return;

  const images = items.map((item) => item.querySelector('img'));
  const waitForImages = () =>
    Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            }),
      ),
    );

  const layout = () => {
    const containerWidth = Math.floor(container.clientWidth);
    const style = getComputedStyle(container);
    const gap = parseFloat(style.gap || style.columnGap || '10px') || 10;

    let row = [];
    let rowRatios = 0;

    items.forEach((item) => {
      item.style.width = '';
      item.style.height = '';
      item.style.margin = '';
    });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const image = images[i];
      const ratio =
        image.naturalWidth && image.naturalHeight
          ? image.naturalWidth / image.naturalHeight
          : image.width / image.height || 1;

      row.push({ item, image, ratio });
      rowRatios += ratio;

      const totalGap = gap * (row.length - 1);
      const rowWidthAtTarget = rowRatios * targetRowHeight + totalGap;
      const isLastItem = i === items.length - 1;

      if (rowWidthAtTarget >= containerWidth || isLastItem) {
        const rowHeight = (containerWidth - totalGap) / rowRatios;

        row.forEach(({ item: rowItem, image: rowImage, ratio: rowRatio }) => {
          const width = Math.round(rowRatio * rowHeight);
          const height = Math.round(rowHeight);

          rowItem.style.width = width + 'px';
          rowItem.style.height = height + 'px';
          rowItem.style.flex = `0 0 ${width}px`;

          rowImage.style.width = '100%';
          rowImage.style.height = '100%';
          rowImage.style.objectFit = 'contain';
          rowImage.style.display = 'block';
        });

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
    .catch(layout);
}

document.addEventListener('DOMContentLoaded', () => {
  const galleryWrapper = document.querySelector('.gallery__wrapper');
  if (!galleryWrapper) return;

  const gallery = resolveGallery(window.location.pathname);
  const artworks = renderGallery(galleryWrapper, gallery);
  const lightbox = ensureLightbox();
  const url = new URL(window.location.href);

  if (artworks.length === 0) return;

  justifyGallery(galleryWrapper, 220);

  let currentIndex = 0;

  function findIndexById(id) {
    return artworks.findIndex((artwork) => artwork.dataset.id === id);
  }

  function updateNavState() {
    lightbox.prevBtn.disabled = currentIndex === 0;
    lightbox.nextBtn.disabled = currentIndex === artworks.length - 1;
  }

  function setCurrent(index) {
    currentIndex = index;
    lightbox.image.src = artworks[currentIndex].src;
    lightbox.caption.textContent = artworks[currentIndex].alt;
    updateNavState();
  }

  function openLightbox(index) {
    setCurrent(index);
    lightbox.lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(clearQuery = false) {
    lightbox.lightbox.classList.remove('show');
    document.body.style.overflow = '';
    if (clearQuery) history.replaceState({}, '', window.location.pathname);
  }

  function pushImageToUrl(id, label = 'image') {
    url.searchParams.set('img', id);
    history.pushState({ img: id }, label, url);
  }

  function navigate(delta, label) {
    const nextIndex = currentIndex + delta;
    if (nextIndex < 0 || nextIndex >= artworks.length) return;

    setCurrent(nextIndex);
    const imageId = artworks[currentIndex].dataset.id;
    pushImageToUrl(imageId, label);
  }

  artworks.forEach((artwork, index) => {
    const clickTarget = artwork.closest('a') || artwork;
    const imageId = artwork.dataset.id || String(index);

    clickTarget.addEventListener('click', (event) => {
      event.preventDefault();
      openLightbox(index);
      pushImageToUrl(imageId);
    });
  });

  lightbox.prevBtn.addEventListener('click', () => navigate(-1, 'prev image'));
  lightbox.nextBtn.addEventListener('click', () => navigate(1, 'next image'));
  lightbox.closeBtn.addEventListener('click', () => closeLightbox(true));

  lightbox.lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox.lightbox) closeLightbox(true);
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.lightbox.classList.contains('show')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft' && currentIndex > 0)
      setCurrent(currentIndex - 1);
    if (event.key === 'ArrowRight' && currentIndex < artworks.length - 1)
      setCurrent(currentIndex + 1);
  });

  const requestedId = new URLSearchParams(window.location.search).get('img');
  if (!requestedId) return;

  const requestedIndex = findIndexById(requestedId);
  if (requestedIndex >= 0) setTimeout(() => openLightbox(requestedIndex), 0);
});
