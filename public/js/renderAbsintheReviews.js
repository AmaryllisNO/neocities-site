// renderAbsintheReviews.js
// Fetches absinthes.json and renders the index + review entries into absinthe.html

const INDEX_GROUPS = [
  { type: 'Faux Absinthe', label: 'Faux Absinthes', slug: 'faux' },
  {
    type: 'Traditional Absinthe',
    label: 'Traditional Absinthes',
    slug: 'traditional',
  },
  { type: 'Pastis', label: 'Pastis', slug: 'pastis' },
];

const TYPE_BY_SLUG = INDEX_GROUPS.reduce((acc, group) => {
  acc[group.slug] = group.type;
  return acc;
}, {});

const SLUG_BY_TYPE = INDEX_GROUPS.reduce((acc, group) => {
  acc[group.type] = group.slug;
  return acc;
}, {});

const typeSlug = (type) => {
  const match = INDEX_GROUPS.find((g) => g.type === type);
  return match ? match.slug : 'other';
};

const stars = (score, outOf = 10) => {
  const filled = Math.floor(score);
  return '★'.repeat(filled) + '☆'.repeat(outOf - filled);
};

const ratingDisplay = (rating) => {
  const { score, outOf, updates } = rating;
  if (updates.length > 0) {
    const first = updates[0];
    return `<s>${first.previousScore}/${outOf} ${stars(first.previousScore, outOf)}</s><br>
            Update, ${first.date}: ${score}/${outOf} ${stars(score, outOf)}`;
  }
  return `${score}/${outOf} ${stars(score, outOf)}`;
};

const renderTableRows = (entry) => {
  const { tasting, rating, dateOfReview } = entry;
  const rows = [];

  if (dateOfReview) {
    rows.push(`<tr><th>Date of review</th><td>${dateOfReview}</td></tr>`);
  }

  rows.push(`<tr><th>Appearance</th><td>${tasting.appearance}</td></tr>`);
  rows.push(`<tr><th>Aroma</th><td>${tasting.aroma}</td></tr>`);
  rows.push(`<tr><th>Taste</th><td>${tasting.taste}</td></tr>`);

  if (tasting.louche) {
    rows.push(`<tr><th>Louche</th><td>${tasting.louche}</td></tr>`);
  } else {
    rows.push(`<tr><th>Louche</th><td>N/A</td></tr>`);
  }

  if (tasting.ingredients) {
    rows.push(`<tr><th>Ingredients</th><td>${tasting.ingredients}</td></tr>`);
  }

  rows.push(`<tr><th>Rating</th><td>${ratingDisplay(rating)}</td></tr>`);

  return rows.join('\n');
};

const renderNotes = (entry) => {
  const { notes, rating } = entry;
  const paragraphs = notes.map(
    (note) => `<p class="review-entry__notes">${note}</p>`,
  );

  rating.updates.forEach((update) => {
    paragraphs.push(`
      <p class="review-entry__notes">
        <strong style="color: red">Update note, ${update.date}</strong><br>
        ${update.note}
      </p>`);
  });

  return paragraphs.join('\n');
};

const renderEntry = (entry) => `
  <div class="review-entry">
    <div class="review-entry__header">
      <h3 class="review-entry__name" id="${entry.id}">${entry.name}</h3>
      <div class="review-entry__meta">
        <span class="review-entry__abv">ABV: ${entry.abv}%</span>
        <span class="review-entry__origin">Origin: ${entry.origin}</span>
        <span class="review-entry__type">Type: ${entry.type}</span>
      </div>
    </div>
    <div class="review-entry__info">
      <img src="${entry.image}" alt="${entry.name}" />
      <table class="review-entry__table">
        ${renderTableRows(entry)}
      </table>
    </div>
    ${renderNotes(entry)}
  </div>`;

const renderIndex = (entries, activeTypeFilter) => {
  const groupedHtml = INDEX_GROUPS.map((group) => {
    const items = entries.filter((e) => e.type === group.type);
    const isActive = activeTypeFilter === group.type;
    const itemsHtml =
      items.length > 0
        ? items
            .map(
              (
                e,
              ) => `<li class="absinthe-index__item absinthe-index__item--${group.slug}">
              <a href="#${e.id}">${e.name}</a> - Rating: ${e.rating.score}/${e.rating.outOf}
            </li>`,
            )
            .join('\n')
        : `<li class="absinthe-index__item absinthe-index__item--${group.slug}">No ${group.label.toLowerCase()} reviewed yet</li>`;

    return `
    <li class="absinthe-index__group">
      <span
        class="absinthe-index__group-title absinthe-index__group-title--${group.slug}${isActive ? ' is-active' : ''}"
        data-type-slug="${group.slug}"
        role="button"
        tabindex="0"
        aria-pressed="${isActive ? 'true' : 'false'}"
      >${group.label}</span>
      <ul class="absinthe-index__sublist">
        ${itemsHtml}
      </ul>
    </li>`;
  });

  return `<ul class="absinthe-index__list">${groupedHtml.join('\n')}</ul>`;
};

const getTypeFilterFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const rawType = (params.get('type') || '').trim().toLowerCase();
  if (!rawType) return null;

  return TYPE_BY_SLUG[rawType] || null;
};

const filterEntriesByType = (entries, activeTypeFilter) => {
  if (!activeTypeFilter) return entries;
  return entries.filter((entry) => entry.type === activeTypeFilter);
};

const setTypeFilterQuery = (slug) => {
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set('type', slug);
  } else {
    url.searchParams.delete('type');
  }
  window.history.replaceState(
    {},
    '',
    `${url.pathname}${url.search}${url.hash}`,
  );
};

const bindIndexTypeToggles = (entries) => {
  const indexEl = document.getElementById('absinthe-index');
  if (!indexEl) return;

  const toggleEls = indexEl.querySelectorAll('.absinthe-index__group-title');
  toggleEls.forEach((toggleEl) => {
    const toggleFilter = () => {
      const clickedSlug = toggleEl.dataset.typeSlug || '';
      const clickedType = TYPE_BY_SLUG[clickedSlug] || null;
      const activeType = getTypeFilterFromQuery();
      const nextType = activeType === clickedType ? null : clickedType;
      const nextSlug = nextType ? SLUG_BY_TYPE[nextType] : null;

      setTypeFilterQuery(nextSlug);
      renderPage(entries);
    };

    toggleEl.addEventListener('click', toggleFilter);
    toggleEl.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggleFilter();
    });
  });
};

const renderPage = (entries) => {
  const activeTypeFilter = getTypeFilterFromQuery();
  const filteredEntries = filterEntriesByType(entries, activeTypeFilter);

  const indexEl = document.getElementById('absinthe-index');
  if (indexEl) {
    indexEl.innerHTML = renderIndex(entries, activeTypeFilter);
    bindIndexTypeToggles(entries);
  }

  const reviewsEl = document.getElementById('absinthe-reviews');
  if (reviewsEl) {
    if (filteredEntries.length === 0) {
      reviewsEl.innerHTML =
        '<p class="review-entry__notes">No entries found for this filter.</p>';
      return;
    }

    reviewsEl.innerHTML = filteredEntries.map(renderEntry).join('\n');
  }
};

const init = async () => {
  const response = await fetch('../js/json/absinthes.json');
  const entries = await response.json();
  renderPage(entries);
};

init();
