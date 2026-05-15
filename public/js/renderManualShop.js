import { shopConfig, shopProducts } from './shopProducts.js';

const selectedProductIds = new Set();
const carouselState = new Map();
const DEFAULT_ASPECT_RATIO = '4 / 5';

const elementIds = {
  products: 'shop-products',
  orderMeta: 'shop-order-meta',
  orderStatus: 'shop-order-status',
  name: 'order-name',
  email: 'order-email',
  country: 'order-country',
  notes: 'order-notes',
  openDraft: 'open-order-email',
  copySummary: 'copy-order-summary',
  clearSelection: 'clear-order-selection',
};

const currency = (value) => `${shopConfig.currencySymbol}${value.toFixed(2)}`;
const getProductById = (id) => shopProducts.find((item) => item.id === id);
const getInputValue = (key) =>
  document.getElementById(elementIds[key])?.value.trim() || '';

const selectedProducts = () =>
  shopProducts.filter((product) => selectedProductIds.has(product.id));

const getProductImages = (product) => {
  if (Array.isArray(product.images) && product.images.length)
    return product.images;
  return product.image ? [product.image] : [];
};

const getProductAspectRatio = (product) => {
  const rawSize = String(product.size || '');
  const match = rawSize.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/i);

  if (!match) return DEFAULT_ASPECT_RATIO;

  const width = Number(match[1].replace(',', '.'));
  const height = Number(match[2].replace(',', '.'));

  if (!Number.isFinite(width) || !Number.isFinite(height) || height <= 0)
    return DEFAULT_ASPECT_RATIO;

  return `${width} / ${height}`;
};

const getCarouselIndex = (product) => {
  const images = getProductImages(product);
  if (!images.length) return 0;
  const current = carouselState.get(product.id) || 0;
  return current >= images.length ? 0 : current;
};

const setCarouselIndex = (productId, nextIndex) => {
  const product = getProductById(productId);
  if (!product) return;

  const images = getProductImages(product);
  if (!images.length) return;

  const safeIndex =
    ((nextIndex % images.length) + images.length) % images.length;
  carouselState.set(productId, safeIndex);
};

const estimateShipping = (country) => {
  const match = shopConfig.shippingEstimates.find(
    (estimate) => estimate.region === country,
  );

  return (
    match ||
    shopConfig.shippingEstimates.find(
      (estimate) => estimate.region === 'Rest of World',
    )
  );
};

const getOrderTotals = (country) => {
  const selected = selectedProducts();
  const subtotal = selected.reduce((sum, product) => sum + product.price, 0);
  const shippingEstimate = country ? estimateShipping(country) : null;
  const shippingCost = shippingEstimate?.estimateUSD || 0;
  return {
    selected,
    subtotal,
    shippingEstimate,
    shippingCost,
    grandTotal: subtotal + shippingCost,
  };
};

const renderSelectionSummary = () => {
  const orderMeta = document.getElementById(elementIds.orderMeta);
  if (!orderMeta) return;

  const country = getInputValue('country');
  const { selected, subtotal, shippingEstimate, grandTotal } =
    getOrderTotals(country);

  if (selected.length === 0) {
    orderMeta.innerHTML = `
      <p class="shop-empty">No paintings selected yet.</p>
      <p class="shop-muted">Tip: Click "Add to Inquiry" on any available painting.</p>
    `;
    return;
  }

  const listHtml = selected
    .map(
      (product) =>
        `<li>${product.title} (${product.id}) - ${currency(product.price)}</li>`,
    )
    .join('');

  const shippingHtml = shippingEstimate
    ? `
      <p><strong>Estimated shipping to ${country}:</strong> ${shippingEstimate.estimateUSD} USD</p>
      <p><strong>Total (estimated):</strong> ${currency(grandTotal)} <span class="shop-muted">(final shipping confirmed after inquiry)</span></p>
    `
    : '<p class="shop-muted">Enter your shipping country above for a shipping estimate.</p>';

  orderMeta.innerHTML = `
    <p><strong>Selected paintings (${selected.length}):</strong></p>
    <ul class="shop-inline-list">${listHtml}</ul>
    <p><strong>Artwork subtotal:</strong> ${currency(subtotal)}</p>
    ${shippingHtml}
    <p class="shop-note">Payment options: ${shopConfig.paymentMethods}</p>
  `;
};

const buildOrderSummaryText = () => {
  const name = getInputValue('name');
  const email = getInputValue('email');
  const country = getInputValue('country');
  const notes = getInputValue('notes');

  const { selected, subtotal, shippingEstimate, shippingCost, grandTotal } =
    getOrderTotals(country);

  const lines = [];
  lines.push('Order inquiry for original oil paintings');
  lines.push('');
  lines.push(`Name: ${name}`);
  lines.push(`Email: ${email}`);
  lines.push(`Shipping country: ${country}`);
  lines.push('');
  lines.push('Requested paintings:');

  selected.forEach((product) => {
    lines.push(`- ${product.title} [${product.id}]`);
    lines.push(`  Medium: ${product.medium}`);
    lines.push(`  Size: ${product.size}`);
    lines.push(`  Price: ${currency(product.price)}`);
  });

  lines.push('');
  lines.push(`Artwork subtotal: ${currency(subtotal)}`);
  if (shippingEstimate) {
    lines.push(`Estimated shipping to ${country}: ${shippingCost} USD`);
    lines.push(`Total (estimated): ${currency(grandTotal)}`);
  }
  lines.push(`Preferred payment route: ${shopConfig.paymentMethods}`);

  if (notes) {
    lines.push('');
    lines.push('Notes:');
    lines.push(notes);
  }

  return lines.join('\n');
};

const setStatus = (message) => {
  const status = document.getElementById(elementIds.orderStatus);
  if (status) {
    status.textContent = message;
  }
};

const validateOrderInput = () => {
  const selected = selectedProducts();
  if (selected.length === 0) {
    return 'Select at least one available painting.';
  }

  const name = getInputValue('name');
  const email = getInputValue('email');
  const country = getInputValue('country');

  if (!name || !email || !country) {
    return 'Please fill in name, email, and shipping country.';
  }

  if (
    !shopConfig.contactEmail ||
    shopConfig.contactEmail === 'youremail@example.com'
  ) {
    return 'Set your real contactEmail in js/shopProducts.js before using email draft.';
  }

  return '';
};

const toggleProductSelection = (productId) => {
  selectedProductIds.has(productId)
    ? selectedProductIds.delete(productId)
    : selectedProductIds.add(productId);

  renderSelectionSummary();
  renderProductGrid();
};

const renderProductCard = (product) => {
  const isSelected = selectedProductIds.has(product.id);
  const isSold = product.status === 'sold';
  const buttonText = isSold ? 'Sold' : isSelected ? 'Remove' : 'Add to Inquiry';
  const images = getProductImages(product);
  const activeImageIndex = getCarouselIndex(product);
  const activeImage = images[activeImageIndex] || product.image || '';
  const frameRatio = getProductAspectRatio(product);

  const carouselControls =
    images.length > 1
      ? `
        <span class="shop-product__step-indicator" aria-label="Image ${activeImageIndex + 1} of ${images.length}">
          ${activeImageIndex + 1} / ${images.length}
        </span>
        <button
          type="button"
          class="shop-product__carousel-button"
          data-carousel-prev="${product.id}"
          aria-label="Previous image for ${product.title}"
        >
          <span aria-hidden="true">&#10094;</span>
        </button>
        <button
          type="button"
          class="shop-product__carousel-button"
          data-carousel-next="${product.id}"
          aria-label="Next image for ${product.title}"
        >
          <span aria-hidden="true">&#10095;</span>
        </button>
      `
      : '';

  return `
    <article class="shop-product${isSold ? ' shop-product--sold' : ''}">
      <div class="shop-product__media">
        <div class="shop-product__image-frame" style="--shop-product-ratio: ${frameRatio};">
          <img class="shop-product__image" src="${activeImage}" alt="${product.title}">
          <div class="shop-product__carousel-controls">${carouselControls}</div>
        </div>
      </div>
      <div class="shop-product__content">
        <p class="shop-product__price">${currency(product.price)}</p>
        <h2 class="shop-product__title">${product.title} <span class="shop-product__year">${product.year}</span></h2>
        <p class="shop-product__meta">${product.medium} · ${product.size}</p>
        <p class="shop-product__description">${product.description}</p>
        <div class="shop-product__actions">
          <button
            type="button"
            class="shop-product__button"
            data-product-id="${product.id}"
            ${isSold ? 'disabled' : ''}
          >
            ${buttonText}
          </button>
          ${isSold ? '<span class="shop-product__sold-tag">Unavailable</span>' : ''}
        </div>
      </div>
    </article>
  `;
};

const renderProductGrid = () => {
  const productsRoot = document.getElementById(elementIds.products);
  if (!productsRoot) return;
  productsRoot.innerHTML = shopProducts.map(renderProductCard).join('');
};

const rotateCarousel = (productId, direction) => {
  const product = getProductById(productId);
  if (!product) return;

  setCarouselIndex(productId, getCarouselIndex(product) + direction);
  renderProductGrid();
};

const handleProductsClick = (event) => {
  const toggleButton = event.target.closest('[data-product-id]');
  if (toggleButton) {
    const productId = toggleButton.getAttribute('data-product-id');
    if (productId) toggleProductSelection(productId);
    return;
  }

  const prevButton = event.target.closest('[data-carousel-prev]');
  if (prevButton) {
    const productId = prevButton.getAttribute('data-carousel-prev');
    if (productId) rotateCarousel(productId, -1);
    return;
  }

  const nextButton = event.target.closest('[data-carousel-next]');
  if (!nextButton) return;

  const productId = nextButton.getAttribute('data-carousel-next');
  if (productId) rotateCarousel(productId, 1);
};

const openEmailDraft = () => {
  const validationError = validateOrderInput();
  if (validationError) {
    setStatus(validationError);
    return;
  }

  const summary = buildOrderSummaryText();
  const subject = encodeURIComponent('Painting order inquiry');
  const body = encodeURIComponent(summary);
  const mailto = `mailto:${shopConfig.contactEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailto;
  setStatus('Email draft opened with your selected paintings.');
};

const copyOrderSummary = async () => {
  const validationError = validateOrderInput();
  if (validationError) {
    setStatus(validationError);
    return;
  }

  const summary = buildOrderSummaryText();

  try {
    await navigator.clipboard.writeText(summary);
    setStatus('Order summary copied to clipboard.');
  } catch (error) {
    console.error(error);
    setStatus('Could not copy automatically. Use Open Email Draft instead.');
  }
};

const clearSelection = () => {
  selectedProductIds.clear();
  renderSelectionSummary();
  renderProductGrid();
  setStatus('Selection cleared.');
};

const initManualShop = () => {
  const productsRoot = document.getElementById(elementIds.products);

  productsRoot?.addEventListener('click', handleProductsClick);
  renderProductGrid();
  renderSelectionSummary();

  document
    .getElementById(elementIds.openDraft)
    ?.addEventListener('click', openEmailDraft);
  document
    .getElementById(elementIds.copySummary)
    ?.addEventListener('click', copyOrderSummary);
  document
    .getElementById(elementIds.clearSelection)
    ?.addEventListener('click', clearSelection);

  document
    .getElementById(elementIds.country)
    ?.addEventListener('input', renderSelectionSummary);
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize whenever the shop root exists, regardless of URL rewrite style.
  if (document.getElementById(elementIds.products)) {
    initManualShop();
  }
});
