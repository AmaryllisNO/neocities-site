import { shopConfig, shopProducts } from './shopProducts.js';

const selectedProductIds = new Set();

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

const selectedProducts = () => {
  return shopProducts.filter((product) => selectedProductIds.has(product.id));
};

const estimateShipping = (country) => {
  if (!country) return null;

  const countryLower = country.toLowerCase();

  // Check for exact or partial matches
  const estimate = shopConfig.shippingEstimates.find((est) => {
    return (
      countryLower === est.region.toLowerCase() ||
      countryLower.includes(est.region.toLowerCase()) ||
      est.region.toLowerCase().includes(countryLower)
    );
  });

  // Default to "Rest of World" if no match found
  return (
    estimate ||
    shopConfig.shippingEstimates.find((est) => est.region === 'Rest of World')
  );
};

const renderSelectionSummary = () => {
  const orderMeta = document.getElementById(elementIds.orderMeta);
  if (!orderMeta) {
    return;
  }

  const selected = selectedProducts();

  if (selected.length === 0) {
    orderMeta.innerHTML = `
      <p class="shop-empty">No paintings selected yet.</p>
      <p class="shop-muted">Tip: Click "Add to Inquiry" on any available painting.</p>
    `;
    return;
  }

  const total = selected.reduce((sum, product) => sum + product.price, 0);
  const country =
    document.getElementById(elementIds.country)?.value.trim() || '';
  const shippingEstimate = country ? estimateShipping(country) : null;
  const shippingCost = shippingEstimate?.estimateNOK || 0;
  const grandTotal = total + shippingCost;

  const listHtml = selected
    .map(
      (product) =>
        `<li>${product.title} (${product.id}) - ${currency(product.price)}</li>`,
    )
    .join('');

  let summaryHtml = `
    <p><strong>Selected paintings (${selected.length}):</strong></p>
    <ul class="shop-inline-list">${listHtml}</ul>
    <p><strong>Artwork subtotal:</strong> ${currency(total)}</p>
  `;

  if (shippingEstimate) {
    summaryHtml += `
      <p><strong>Estimated shipping to ${country}:</strong> ${shippingEstimate.estimateNOK}kr</p>
      <p><strong>Total (estimated):</strong> ${currency(grandTotal)} <span class="shop-muted">(final shipping confirmed after inquiry)</span></p>
    `;
  } else {
    summaryHtml += `<p class="shop-muted">Enter your shipping country above for a shipping estimate.</p>`;
  }

  summaryHtml += `<p class="shop-note">Payment options: ${shopConfig.paymentMethods}</p>`;

  orderMeta.innerHTML = summaryHtml;
};

const buildOrderSummaryText = () => {
  const name = document.getElementById(elementIds.name)?.value.trim() || '';
  const email = document.getElementById(elementIds.email)?.value.trim() || '';
  const country =
    document.getElementById(elementIds.country)?.value.trim() || '';
  const notes = document.getElementById(elementIds.notes)?.value.trim() || '';

  const selected = selectedProducts();
  const total = selected.reduce((sum, product) => sum + product.price, 0);

  const shippingEstimate = country ? estimateShipping(country) : null;
  const shippingCost = shippingEstimate?.estimateNOK || 0;
  const grandTotal = total + shippingCost;

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
  lines.push(`Artwork subtotal: ${currency(total)}`);
  if (shippingEstimate) {
    lines.push(`Estimated shipping to ${country}: ${shippingCost}kr`);
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

  const name = document.getElementById(elementIds.name)?.value.trim() || '';
  const email = document.getElementById(elementIds.email)?.value.trim() || '';
  const country =
    document.getElementById(elementIds.country)?.value.trim() || '';

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
  if (selectedProductIds.has(productId)) {
    selectedProductIds.delete(productId);
  } else {
    selectedProductIds.add(productId);
  }

  renderSelectionSummary();
  renderProductGrid();
};

const renderProductGrid = () => {
  const productsRoot = document.getElementById(elementIds.products);
  if (!productsRoot) {
    return;
  }

  const cards = shopProducts
    .map((product) => {
      const isSelected = selectedProductIds.has(product.id);
      const isSold = product.status === 'sold';
      const cardClasses = `shop-product${isSold ? ' shop-product--sold' : ''}`;
      const buttonText = isSold
        ? 'Sold'
        : isSelected
          ? 'Remove'
          : 'Add to Inquiry';

      return `
        <article class="${cardClasses}">
          <img class="shop-product__image" src="${product.image}" alt="${product.title}">
          <div>
            <h2 class="shop-product__title">${product.title}</h2>
            <p class="shop-product__meta">${product.medium} · ${product.size}</p>
            <p class="shop-product__price">${currency(product.price)}</p>
            <p>${product.description}</p>
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
    })
    .join('');

  productsRoot.innerHTML = cards;

  productsRoot.querySelectorAll('[data-product-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      if (productId) {
        toggleProductSelection(productId);
      }
    });
  });
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

  // Update summary when country changes
  document
    .getElementById(elementIds.country)
    ?.addEventListener('input', renderSelectionSummary);
};

document.addEventListener('DOMContentLoaded', () => {
  if (
    window.location.pathname.endsWith('/shop.html') ||
    window.location.pathname === '/shop.html'
  ) {
    initManualShop();
  }
});
