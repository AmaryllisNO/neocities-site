import { shopConfig, shopProducts } from './shopProducts.js';

const selectedProductIds = new Set();
const carouselState = new Map();
const DEFAULT_ASPECT_RATIO = '4 / 5';
const DEFAULT_EMAILER_ENDPOINT =
  'https://emailer-withered-snow-9611.fly.dev/send-email';

const elementIds = {
  products: 'shop-products',
  orderMeta: 'shop-order-meta',
  orderStatus: 'shop-order-status',
  name: 'order-name',
  email: 'order-email',
  country: 'order-country',
  notes: 'order-notes',
  openDraft: 'open-order-email',
  clearSelection: 'clear-order-selection',
};

const currency = (value) => `${shopConfig.currencySymbol}${value.toFixed(2)}`;
const getProductById = (id) => shopProducts.find((item) => item.id === id);
const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
const toEmailLineBreaks = (value) =>
  escapeHtml(value).replace(/\r?\n/g, '<br>');
const getEmailerEndpoint = () =>
  shopConfig.emailerEndpoint || DEFAULT_EMAILER_ENDPOINT;
const getOrderPrice = (product) => {
  if (
    product.status === 'on sale' &&
    Number.isFinite(product.reducedPrice) &&
    product.reducedPrice > 0
  ) {
    return product.reducedPrice;
  }

  return product.price;
};
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
  const subtotal = selected.reduce(
    (sum, product) => sum + getOrderPrice(product),
    0,
  );
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
        `<li>${escapeHtml(product.title)} (${escapeHtml(product.id)}) - ${escapeHtml(currency(getOrderPrice(product)))}</li>`,
    )
    .join('');

  const shippingHtml = shippingEstimate
    ? `
      <p><strong>Estimated shipping to ${escapeHtml(country)}:</strong> ${escapeHtml(String(shippingEstimate.estimateUSD))} USD</p>
      <p><strong>Total (estimated):</strong> ${escapeHtml(currency(grandTotal))} <span class="shop-muted">(final shipping confirmed after inquiry)</span></p>
    `
    : '<p class="shop-muted">Enter your shipping country above for a shipping estimate.</p>';

  orderMeta.innerHTML = `
    <p><strong>Selected paintings (${selected.length}):</strong></p>
    <ul class="shop-inline-list">${listHtml}</ul>
    <p><strong>Artwork subtotal:</strong> ${escapeHtml(currency(subtotal))}</p>
    ${shippingHtml}
    <p class="shop-note">Payment options: ${escapeHtml(shopConfig.paymentMethods)}</p>
  `;
};

const buildOrderSummaryHtml = () => {
  const name = getInputValue('name');
  const email = getInputValue('email');
  const country = getInputValue('country');
  const notes = getInputValue('notes');

  const { selected, subtotal, shippingEstimate, shippingCost, grandTotal } =
    getOrderTotals(country);

  const requestedPaintingsHtml = selected
    .map(
      (product, index) =>
        `<strong>${index + 1}. ${escapeHtml(product.title)} [${escapeHtml(product.id)}]</strong><br>Medium: ${escapeHtml(product.medium)}<br>Size: ${escapeHtml(product.size)}<br>Price: ${escapeHtml(currency(getOrderPrice(product)))}`,
    )
    .join('<br><br>');

  const shippingHtml = shippingEstimate
    ? `Estimated shipping to ${escapeHtml(country)}: ${escapeHtml(String(shippingCost))} USD<br><strong>Total (estimated): ${escapeHtml(currency(grandTotal))}</strong><br><span style="color:#6b6b6b">(final shipping confirmed after inquiry)</span>`
    : 'Shipping estimate unavailable.';

  const notesHtml = notes
    ? `<br><br><strong>Notes</strong><br>${toEmailLineBreaks(notes)}`
    : '';

  return `
    <strong>Order inquiry for original oil paintings</strong><br><br>
    <strong>Customer</strong><br>
    Name: ${escapeHtml(name)}<br>
    Email: ${escapeHtml(email)}<br>
    Shipping country: ${escapeHtml(country)}<br><br>
    <strong>Requested paintings (${selected.length})</strong><br>
    ${requestedPaintingsHtml}<br><br>
    <strong>Pricing</strong><br>
    Artwork subtotal: ${escapeHtml(currency(subtotal))}<br>
    ${shippingHtml}<br><br>
    Preferred payment route: ${escapeHtml(shopConfig.paymentMethods)}
    ${notesHtml}
  `;
};

const buildCustomerReceiptText = () => {
  const name = getInputValue('name');
  const email = getInputValue('email');
  const country = getInputValue('country');
  const notes = getInputValue('notes');

  const { selected, subtotal, shippingEstimate, shippingCost, grandTotal } =
    getOrderTotals(country);

  const lines = [];
  lines.push('Amaryllis Shop - Inquiry Receipt');
  lines.push(`Receipt generated: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('Customer');
  lines.push(`Name: ${name}`);
  lines.push(`Email: ${email}`);
  lines.push(`Shipping country: ${country}`);
  lines.push('');
  lines.push(`Requested paintings (${selected.length})`);

  selected.forEach((product, index) => {
    lines.push(`${index + 1}. ${product.title} [${product.id}]`);
    lines.push(`   Medium: ${product.medium}`);
    lines.push(`   Size: ${product.size}`);
    lines.push(`   Price: ${currency(getOrderPrice(product))}`);
  });

  lines.push('');
  lines.push(`Artwork subtotal: ${currency(subtotal)}`);
  if (shippingEstimate) {
    lines.push(`Estimated shipping to ${country}: ${shippingCost} USD`);
    lines.push(`Total (estimated): ${currency(grandTotal)}`);
    lines.push('(Final shipping confirmed after inquiry.)');
  } else {
    lines.push('Shipping estimate unavailable.');
  }
  lines.push(`Preferred payment route: ${shopConfig.paymentMethods}`);

  if (notes) {
    lines.push('');
    lines.push('Notes');
    lines.push(notes);
  }

  return lines.join('\n');
};

const downloadReceiptFile = (receiptText) => {
  const dateStamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `amaryllis-inquiry-receipt-${dateStamp}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
  const isOnSale = product.status === 'on sale';
  const buttonText = isSold ? 'Sold' : isSelected ? 'Remove' : 'Add to Inquiry';
  const images = getProductImages(product);
  const activeImageIndex = getCarouselIndex(product);
  const activeImage = images[activeImageIndex] || product.image || '';
  const frameRatio = getProductAspectRatio(product);
  const safeId = escapeHtml(product.id);
  const safeTitle = escapeHtml(product.title);
  const safeYear = escapeHtml(String(product.year || ''));
  const safeMedium = escapeHtml(product.medium);
  const safeSize = escapeHtml(product.size);
  const safeDescription = escapeHtml(product.description);
  const safeImageSrc = escapeHtml(activeImage);
  const safeButtonText = escapeHtml(buttonText);
  const safePrice = escapeHtml(currency(product.price));
  const safeReducedPrice = escapeHtml(currency(product.reducedPrice));
  const altDetails = [product.title, product.medium, product.size]
    .filter(Boolean)
    .join(', ');
  const imageAlt = `${altDetails}${product.year ? ` (${product.year})` : ''} original painting by Amaryllis`;
  const safeImageAlt = escapeHtml(imageAlt);

  console.log(
    `Rendering product ${product.id} with status "${product.status}" and ${images.length} image(s). Active image index: ${activeImageIndex}`,
    `title: ${product.title}, price: ${product.price}, reducedPrice: ${product.reducedPrice}`,
  );

  const carouselControls =
    images.length > 1
      ? `
        <span class="shop-product__step-indicator" aria-label="Image ${activeImageIndex + 1} of ${images.length}">
          ${activeImageIndex + 1} / ${images.length}
        </span>
        <button
          type="button"
          class="shop-product__carousel-button"
          data-carousel-prev="${safeId}"
          aria-label="Previous image for ${safeTitle}"
        >
          <span aria-hidden="true">&#10094;</span>
        </button>
        <button
          type="button"
          class="shop-product__carousel-button"
          data-carousel-next="${safeId}"
          aria-label="Next image for ${safeTitle}"
        >
          <span aria-hidden="true">&#10095;</span>
        </button>
      `
      : '';

  return `
    <article class="shop-product${isSold ? ' shop-product--sold' : ''}">
      <div class="shop-product__media">
        <div class="shop-product__image-frame" style="--shop-product-ratio: ${frameRatio};">
        ${isSold ? '<div class="shop-product__sold-overlay">SOLD</div>' : ''}
          <img class="shop-product__image" src="${safeImageSrc}" alt="${safeImageAlt}">
          <div class="shop-product__carousel-controls">${carouselControls}</div>
        </div>
      </div>
      <div class="shop-product__content">
        ${
          isOnSale
            ? `<div class="shop-product__price-row">
              <p class="shop-product__price--strikethrough">${safePrice}</p>
              <p class="shop-product__price">${safeReducedPrice}</p>
            </div>`
            : `<p class="shop-product__price">${safePrice}</p>`
        }
        <h2 class="shop-product__title">${safeTitle} <span class="shop-product__year">${safeYear}</span></h2>
        <p class="shop-product__meta">${safeMedium} · ${safeSize}</p>
        <p class="shop-product__description">${safeDescription}</p>
        <div class="shop-product__actions">
        ${
          isSold
            ? ``
            : ` <button
            type="button"
            class="shop-product__button"
            data-product-id="${safeId}"
            ${isSold ? 'disabled' : ''}
          >
            ${safeButtonText}
          </button>`
        }
         
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

const sendOrderInquiry = async () => {
  const validationError = validateOrderInput();
  if (validationError) {
    setStatus(validationError);
    return;
  }

  const submitButton = document.getElementById(elementIds.openDraft);
  const originalButtonText = submitButton?.textContent;

  if (submitButton) {
    submitButton.setAttribute('disabled', 'true');
    submitButton.textContent = 'Sending...';
  }

  const name = getInputValue('name');
  const senderEmail = getInputValue('email');
  const summary = buildOrderSummaryHtml();
  const subject = 'Painting order inquiry';
  const endpoint = getEmailerEndpoint();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        senderEmail,
        subject,
        message: summary,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email request failed with status ${response.status}`);
    }

    const receiptText = buildCustomerReceiptText();
    let receiptCopied = false;

    try {
      await navigator.clipboard.writeText(receiptText);
      receiptCopied = true;
    } catch (clipboardError) {
      console.warn('Could not copy receipt to clipboard.', clipboardError);
    }

    downloadReceiptFile(receiptText);
    setStatus(
      receiptCopied
        ? 'Inquiry sent. Receipt copied to clipboard and downloaded as .txt.'
        : 'Inquiry sent. Receipt downloaded as .txt.',
    );
  } catch (error) {
    console.error(error);
    setStatus(
      'Could not send inquiry right now. Please try again in a moment.',
    );
  } finally {
    if (submitButton) {
      submitButton.removeAttribute('disabled');
      submitButton.textContent = originalButtonText || 'Send Inquiry';
    }
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
    ?.addEventListener('click', sendOrderInquiry);
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
