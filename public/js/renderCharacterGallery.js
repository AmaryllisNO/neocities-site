const DEFAULT_COLUMNS = 3;
const DEFAULT_PEEK_HEIGHT = 120;

const galleryRegistry = new WeakMap();
let lightboxElements = null;
const lightboxState = {
  items: [],
  activeIndex: 0,
};

const resolveUrl = (value, base = window.location.href) =>
  new URL(value, base).href;

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toIndex = (value, fallback = 0) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const splitIntoColumns = (items, columnCount) => {
  const cols = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    cols[index % columnCount].push(item);
  });
  return cols;
};

const toImageSource = (entry, imageBaseHref) => {
  if (entry.src) return resolveUrl(entry.src, imageBaseHref);
  if (entry.filename) return resolveUrl(entry.filename, imageBaseHref);
  return null;
};

const normalizeEntry = (entry, index, imageBaseHref, fallbackAlt) => {
  const source = toImageSource(entry, imageBaseHref);
  if (!source) return null;

  return {
    id: entry.id || `gallery-item-${index + 1}`,
    src: source,
    alt: entry.alt || fallbackAlt,
  };
};

const createGalleryItem = (item, index) => {
  const wrapper = document.createElement('button');
  wrapper.type = 'button';
  wrapper.className = 'character-gallery__item';
  wrapper.dataset.galleryItemId = item.id;
  wrapper.dataset.galleryIndex = String(index);
  wrapper.setAttribute('aria-label', `Open image: ${item.alt}`);

  const image = document.createElement('img');
  image.className = 'character-gallery__image';
  image.src = item.src;
  image.alt = item.alt;
  image.loading = 'lazy';
  image.decoding = 'async';

  wrapper.appendChild(image);
  return wrapper;
};

const createGalleryColumn = (items) => {
  const column = document.createElement('div');
  column.className = 'character-gallery__col';
  items.forEach((payload) => {
    column.appendChild(createGalleryItem(payload.item, payload.index));
  });
  return column;
};

const renderEmptyState = (mountNode, message) => {
  mountNode.innerHTML = `<p class="character-gallery__empty">${message}</p>`;
};

const ensurePanelHeader = (panel, titleEl) => {
  let header = panel.querySelector('.character-gallery-panel__header');

  if (!header) {
    header = document.createElement('div');
    header.className = 'character-gallery-panel__header';
    panel.insertBefore(header, titleEl);
    header.appendChild(titleEl);
  }

  return header;
};

const ensurePanelArrowToggle = (panel) => {
  let arrowToggle = panel.querySelector(
    '.character-gallery-panel__arrow-toggle',
  );

  if (!arrowToggle) {
    arrowToggle = document.createElement('button');
    arrowToggle.type = 'button';
    arrowToggle.className = 'character-gallery-panel__arrow-toggle';
    arrowToggle.innerHTML = `<div>
     <div class="sr-only" style="text-transform: uppercase">Expand gallery</div>
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </div>`;
    panel.appendChild(arrowToggle);
  }

  return arrowToggle;
};

const setPanelCollapsed = (panel, collapsed) => {
  panel.classList.toggle('is-collapsed', collapsed);

  /*  const toggle = panel.querySelector('.character-gallery-panel__toggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.textContent = collapsed ? 'Show gallery' : 'Hide gallery';
  } */

  const arrowToggle = panel.querySelector(
    '.character-gallery-panel__arrow-toggle',
  );
  if (arrowToggle) {
    arrowToggle.setAttribute('aria-expanded', String(!collapsed));
    arrowToggle.setAttribute(
      'aria-label',
      collapsed ? 'Expand gallery' : 'Collapse gallery',
    );
    arrowToggle.innerHTML = `<div>
    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
     <div class="sr-only" style="text-transform: uppercase">${collapsed ? 'Expand gallery' : 'Collapse gallery'}</div>
    </div>`;

    const icon = arrowToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-chevron-down', collapsed);
      icon.classList.toggle('fa-chevron-up', !collapsed);
    }
  }
};

const initPanelAccordion = (mountNode) => {
  const panel = mountNode.closest('.character-gallery-panel');
  if (!panel) return;

  const titleEl = panel.querySelector('.character-gallery-panel__title');
  if (!titleEl) return;

  const header = ensurePanelHeader(panel, titleEl);

  //   let toggle = panel.querySelector('.character-gallery-panel__toggle');
  //   if (!toggle) {
  //     toggle = document.createElement('button');
  //     toggle.type = 'button';
  //     toggle.className = 'character-gallery-panel__toggle';
  //     header.appendChild(toggle);
  //   }

  const arrowToggle = ensurePanelArrowToggle(panel);

  const peekHeight = toPositiveInt(
    panel.dataset.peekHeight || mountNode.dataset.peekHeight,
    DEFAULT_PEEK_HEIGHT,
  );
  panel.style.setProperty('--gallery-peek-height', `${peekHeight}px`);

  const startsCollapsed =
    (panel.dataset.galleryCollapsed ||
      mountNode.dataset.galleryCollapsed ||
      'true') !== 'false';

  setPanelCollapsed(panel, startsCollapsed);

  /*  toggle.addEventListener('click', () => {
    const shouldCollapse = !panel.classList.contains('is-collapsed');
    setPanelCollapsed(panel, shouldCollapse);
  }); */

  arrowToggle.addEventListener('click', () => {
    const shouldCollapse = !panel.classList.contains('is-collapsed');
    setPanelCollapsed(panel, shouldCollapse);
  });
};

const ensureLightbox = () => {
  if (lightboxElements) return lightboxElements;

  const host = document.createElement('section');
  host.className = 'character-lightbox';
  host.setAttribute('aria-hidden', 'true');
  host.innerHTML = `
    <button class="character-lightbox__backdrop" type="button" aria-label="Close image viewer"></button>
    <div class="character-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Artwork preview">
      <button class="character-lightbox__close" type="button" aria-label="Close image viewer">Close</button>
      <button class="character-lightbox__nav character-lightbox__nav--prev" type="button" aria-label="Previous image">&#8249;</button>
      <figure class="character-lightbox__figure">
        <img class="character-lightbox__image" alt="">
        <figcaption class="character-lightbox__caption"></figcaption>
      </figure>
      <button class="character-lightbox__nav character-lightbox__nav--next" type="button" aria-label="Next image">&#8250;</button>
    </div>
  `;

  document.body.appendChild(host);

  const close = () => {
    host.classList.remove('is-open');
    host.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-lightbox-open');
  };

  const step = (direction) => {
    if (!lightboxState.items.length) return;

    const next =
      (lightboxState.activeIndex + direction + lightboxState.items.length) %
      lightboxState.items.length;
    lightboxState.activeIndex = next;
    syncLightbox();
  };

  host
    .querySelector('.character-lightbox__close')
    ?.addEventListener('click', close);
  host
    .querySelector('.character-lightbox__backdrop')
    ?.addEventListener('click', close);
  host
    .querySelector('.character-lightbox__nav--prev')
    ?.addEventListener('click', () => step(-1));
  host
    .querySelector('.character-lightbox__nav--next')
    ?.addEventListener('click', () => step(1));

  document.addEventListener('keydown', (event) => {
    if (!host.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key === 'ArrowLeft') {
      step(-1);
      return;
    }

    if (event.key === 'ArrowRight') {
      step(1);
    }
  });

  lightboxElements = {
    host,
    image: host.querySelector('.character-lightbox__image'),
    caption: host.querySelector('.character-lightbox__caption'),
    prev: host.querySelector('.character-lightbox__nav--prev'),
    next: host.querySelector('.character-lightbox__nav--next'),
  };

  return lightboxElements;
};

const syncLightbox = () => {
  const elements = ensureLightbox();
  const item = lightboxState.items[lightboxState.activeIndex];
  if (!item || !elements.image || !elements.caption) return;

  elements.image.src = item.src;
  elements.image.alt = item.alt;
  elements.caption.textContent = item.alt;

  const showNav = lightboxState.items.length > 1;
  if (elements.prev) elements.prev.hidden = !showNav;
  if (elements.next) elements.next.hidden = !showNav;
};

const openLightbox = (items, index) => {
  if (!items.length) return;

  lightboxState.items = items;
  lightboxState.activeIndex = toIndex(index, 0);

  const elements = ensureLightbox();
  syncLightbox();

  elements.host.classList.add('is-open');
  elements.host.setAttribute('aria-hidden', 'false');
  document.body.classList.add('has-lightbox-open');
};

const bindGalleryLightbox = () => {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.character-gallery__item');
    if (!trigger) return;

    const mountNode = trigger.closest('[data-character-gallery]');
    if (!mountNode) return;

    const items = galleryRegistry.get(mountNode) || [];
    if (!items.length) return;

    const index = toIndex(trigger.dataset.galleryIndex, 0);
    openLightbox(items, index);
  });
};

const fetchGalleryEntries = async (sourceHref) => {
  try {
    const response = await fetch(sourceHref);

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to fetch ${sourceHref} (${response.status})`);
    }

    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
  } catch (error) {
    console.error(
      '[renderCharacterGallery] Could not load gallery data:',
      error,
    );
    return [];
  }
};

const renderGalleryFromDataset = async (mountNode) => {
  initPanelAccordion(mountNode);

  const source = mountNode.dataset.source;
  const imageBase = mountNode.dataset.imageBase || source;
  const columnCount = toPositiveInt(mountNode.dataset.columns, DEFAULT_COLUMNS);
  const fallbackAlt =
    mountNode.dataset.defaultAlt || 'Character artwork from gallery';
  const emptyMessage =
    mountNode.dataset.emptyMessage || 'No artwork to show yet.';

  if (!source) {
    galleryRegistry.set(mountNode, []);
    renderEmptyState(mountNode, 'Missing gallery data source.');
    return;
  }

  const sourceHref = resolveUrl(source);
  const imageBaseHref = resolveUrl(imageBase);

  const entries = await fetchGalleryEntries(sourceHref);
  const normalized = entries
    .map((entry, index) =>
      normalizeEntry(entry, index, imageBaseHref, fallbackAlt),
    )
    .filter(Boolean);

  if (!normalized.length) {
    galleryRegistry.set(mountNode, []);
    renderEmptyState(mountNode, emptyMessage);
    return;
  }

  galleryRegistry.set(mountNode, normalized);

  mountNode.innerHTML = '';
  const indexedItems = normalized.map((item, index) => ({ item, index }));
  splitIntoColumns(indexedItems, columnCount).forEach((items) => {
    mountNode.appendChild(createGalleryColumn(items));
  });
};

const initCharacterGallery = () => {
  bindGalleryLightbox();

  const mounts = document.querySelectorAll('[data-character-gallery]');
  mounts.forEach((mountNode) => {
    renderGalleryFromDataset(mountNode);
  });
};

document.addEventListener('DOMContentLoaded', initCharacterGallery);

export { initCharacterGallery, renderGalleryFromDataset };
