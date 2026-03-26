// renderQuotes.js
// Dynamically rotates quotes on the profile card based on page location

const pageQuotes = {
  '/index.html': [
    {
      quote: '"A noble spirit embiggens the smallest man."',
      attribution: '- Amary',
    },
    {
      quote: '"Curiosity is the engine of progress."',
      attribution: '- Amary',
    },
    {
      quote: '"Welcome to my corner of the web."',
      attribution: '- Amary',
    },
  ],
  '/art.html': [
    {
      quote: '"This is magic too."',
      attribution: '- Amary',
    },
    {
      quote: '"I\'d love if I could capture this thing accurately."',
      attribution: '- Amary sketching a creature in the wild',
    },
  ],
  '/music.html': [
    {
      quote:
        '"I once heard from someone that music is the "art of which is most nigh to tears and memory"."',
      attribution: '- Amary',
    },
    {
      quote: '"Listening to ballads? Compositions? Songs even?"',
      attribution: '- Amary',
    },
  ],
  '/commissions.html': [{}],
  '/support.html': [{}],
  '/characters/index.html': [
    {
      quote: '"That Aviline.. sure is a character."',
      attribution: '- Amary, talking about Aviline for the first time.',
    },
  ],
  '/journal/index.html': [
    {
      quote: '"Thoughts transcribed, moments preserved."',
      attribution: '- Amary',
    },
    {
      quote: '"This is where I think out loud."',
      attribution: '- Amary',
    },
    {
      quote: '"My journal, my sanctuary."',
      attribution: '- Amary',
    },
  ],
  '/misc/absinthe.html': [
    {
      quote:
        '"Curious spirit - leaves you lightheaded after one sip. I wonder if contention is the only reason it was banned."',
      attribution: '- Amary, sipping a glass of absinthe',
    },
    {
      quote:
        '"You can practically taste the prohibition in this drink - makes it sweeter somehow."',
      attribution: '- Amary, sipping a glass of absinthe',
    },
    {
      quote: '"..."',
      attribution: '- Amary, sipping a glass of absinthe',
    },
    {
      quote: '"I\'m feeling it.."',
      attribution: '- Amary, sipping a glass of absinthe',
    },
    {
      quote: '*unsconscious*',
      attribution: '- Amary, unconscious',
    },
  ],
  default: [
    {
      quote: '"The fog is coming..."',
      attribution: '- Amary',
    },
  ],
};

let currentQuoteIndex = 0;
let quoteElement = null;
let isTyping = false;
const TYPING_SPEED = 15; // milliseconds per character

function getPageQuotes() {
  let pathname = window.location.pathname;

  // Normalize pathname - ensure it ends with .html for comparison
  if (!pathname.endsWith('.html') && !pathname.endsWith('/')) {
    pathname += '.html';
  }

  // Try exact match first
  if (pageQuotes[pathname]) {
    return pageQuotes[pathname];
  }

  // Try without .html extension
  const pathnameWithoutHtml = pathname.replace('.html', '');
  for (const [path, quotes] of Object.entries(pageQuotes)) {
    const pathWithoutHtml = path.replace('.html', '');
    if (pathWithoutHtml === pathnameWithoutHtml) {
      return quotes;
    }
  }

  // Try matching by page name (handles root index differently)
  const pathParts = pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1] || 'index.html';

  for (const [path, quotes] of Object.entries(pageQuotes)) {
    if (
      path.endsWith(lastPart) ||
      path.endsWith(lastPart.replace('.html', ''))
    ) {
      return quotes;
    }
  }

  // Fallback to default
  return pageQuotes.default;
}

function displayQuote(quotes) {
  if (!quoteElement) {
    console.warn('Quote element not found');
    return;
  }

  if (quotes.length === 0) {
    console.warn('No quotes available for this page');
    return;
  }

  const currentQuote = quotes[currentQuoteIndex];

  // Clear the quote element
  quoteElement.textContent = '';
  isTyping = true;

  // Update the attribution text that comes after the quote element
  const contentContainer = quoteElement.parentElement;
  let attributionElement = contentContainer.querySelector(
    '.profile-card__attribution',
  );

  if (!attributionElement) {
    attributionElement = document.createElement('div');
    attributionElement.className = 'profile-card__attribution';
    contentContainer.appendChild(attributionElement);
  }

  // Clear attribution while typing
  attributionElement.textContent = '';

  // Typewriter effect
  const fullText = currentQuote.quote;
  let currentCharIndex = 0;

  function typeNextCharacter() {
    if (currentCharIndex < fullText.length) {
      quoteElement.textContent += fullText[currentCharIndex];
      currentCharIndex++;
      setTimeout(typeNextCharacter, TYPING_SPEED);
    } else {
      // Typing finished, show attribution
      attributionElement.textContent = currentQuote.attribution;
      isTyping = false;
    }
  }

  typeNextCharacter();
}

function nextQuote(quotes) {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  displayQuote(quotes);
}

function initializeQuotes() {
  quoteElement = document.querySelector('.profile-card__quote');
  const profileCard = document.querySelector('.profile-card');

  if (!quoteElement) {
    console.warn('Quote element not found');
    return;
  }

  if (!profileCard) {
    console.warn('Profile card element not found');
    return;
  }

  const pageQuotesForCurrentPage = getPageQuotes();

  // Display initial quote
  displayQuote(pageQuotesForCurrentPage);

  // Make the entire profile card clickable to cycle through quotes
  profileCard.style.cursor = 'pointer';
  profileCard.addEventListener('click', () => {
    if (!isTyping) {
      nextQuote(pageQuotesForCurrentPage);
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuotes);
} else {
  initializeQuotes();
}
