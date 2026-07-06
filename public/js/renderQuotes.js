// renderQuotes.js
// Dynamically rotates quotes on the profile card based on page location
console.log('renderQuotes.js loaded');

const pageQuotes = {
  '/index.html': [
    {
      quote: '"Huh? Do I know you?."',
      attribution: '- Amary',
    },
    {
      quote: '"I don\'t think I know you - please be on your way."',
      attribution: '- Amary',
    },
    {
      quote: '"..."',
      attribution: '- Amary',
    },
    {
      quote: '*sigh*',
      attribution: '- Amary',
    },
    {
      quote: '"I\'m not sure what you want from me."',
      attribution: '- Amary',
    },
    {
      quote: `"what was that? ..."secrets"?, "forbidden knowledge"?, "blood rituals"!?`,
      attribution: '- Amary',
    },
    {
      quote: `"Keep your voice down. I don't know what you're waffling on about."`,
      attribution: '- Amary',
    },
    {
      quote: `*looks around*`,
      attribution: '- Amary',
    },
    {
      quote: `"I need to be somewhere. Do not follow me."`,
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
      quote: `"Where did they find this tasteless excuse of a bard?"`,
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
    {
      quote: '"I don\'t know anyone here, but I\'m sure Aviline does. "',
      attribution: '- Amary.',
    },
  ],
  '/journal/index.html': [
    {
      quote: '"SNOOPING AS USUAL."',
      attribution: '- Amary',
    },
    {
      quote: '"Who gave you permission to read this??"',
      attribution: '- Amary, seeing you reading her journal.',
    },
    {
      quote: '*mumbling* *scribble noises*',
      attribution: '- Amary writing in her journal',
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
      quote: '*unconscious*',
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
let hasStartedConversation = false;
const TYPING_SPEED = 60;

const pagePromptTopics = {
  '/index.html': 'who you are',
  '/art.html': 'art',
  '/music.html': 'music',
  '/commissions.html': 'commission slots',
  '/support.html': 'how to support the site',
  '/characters/index.html': 'the creatures around here',
  '/journal/index.html': 'journal entries',
  '/misc/absinthe.html': 'absinthe',
  default: 'what brought you here',
};

function getValidQuotes(quotes) {
  return (quotes || []).filter(
    (entry) =>
      entry &&
      typeof entry.quote === 'string' &&
      entry.quote.trim().length > 0 &&
      typeof entry.attribution === 'string',
  );
}

function getPageQuotes() {
  const pathname = window.location.pathname || '/';
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

  const candidates = new Set();
  candidates.add(pathname);
  candidates.add(normalizedPathname);

  if (normalizedPathname === '/') {
    candidates.add('/index.html');
  }

  if (pathname.endsWith('/')) {
    candidates.add(`${pathname}index.html`);
  }

  if (normalizedPathname !== '/' && !normalizedPathname.endsWith('.html')) {
    candidates.add(`${normalizedPathname}.html`);
    candidates.add(`${normalizedPathname}/index.html`);
  }

  for (const candidate of candidates) {
    if (pageQuotes[candidate]) {
      const validQuotes = getValidQuotes(pageQuotes[candidate]);
      return validQuotes.length > 0 ? validQuotes : pageQuotes.default;
    }
  }

  // Fallback: compare without .html suffix for existing keys.
  const compactPath = normalizedPathname.replace(/\.html$/, '');
  for (const [path, quotes] of Object.entries(pageQuotes)) {
    if (path === 'default') {
      continue;
    }

    if (path.replace(/\.html$/, '') === compactPath) {
      const validQuotes = getValidQuotes(quotes);
      return validQuotes.length > 0 ? validQuotes : pageQuotes.default;
    }
  }

  return pageQuotes.default;
}

function getPagePromptTopic() {
  const pathname = window.location.pathname || '/';
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

  const candidates = new Set();
  candidates.add(pathname);
  candidates.add(normalizedPathname);

  if (normalizedPathname === '/') {
    candidates.add('/index.html');
  }

  if (pathname.endsWith('/')) {
    candidates.add(`${pathname}index.html`);
  }

  if (normalizedPathname !== '/' && !normalizedPathname.endsWith('.html')) {
    candidates.add(`${normalizedPathname}.html`);
    candidates.add(`${normalizedPathname}/index.html`);
  }

  for (const candidate of candidates) {
    if (pagePromptTopics[candidate]) {
      return pagePromptTopics[candidate];
    }
  }

  return pagePromptTopics.default;
}

function displayInitialPrompt() {
  if (!quoteElement) {
    return;
  }

  quoteElement.textContent = `"Talk to Amary about ${getPagePromptTopic()}..."`;

  const contentContainer = quoteElement.parentElement;
  let attributionElement = contentContainer.querySelector(
    '.profile-card__attribution',
  );

  if (!attributionElement) {
    attributionElement = document.createElement('div');
    attributionElement.className = 'profile-card__attribution';
    contentContainer.appendChild(attributionElement);
  }

  attributionElement.textContent = '- click to start';
}

function displayQuote(quotes) {
  if (!quoteElement) {
    console.warn('Quote element not found');
    return;
  }

  if (!Array.isArray(quotes) || quotes.length === 0) {
    console.warn('No quotes available for this page');
    return;
  }

  const currentQuote = quotes[currentQuoteIndex];
  if (!currentQuote || typeof currentQuote.quote !== 'string') {
    console.warn('Invalid quote entry encountered');
    return;
  }

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
      const audio = new Audio('../assets/audio/amaryspeaks2.ogg');
      audio.volume = 1;
      // audio.playbackRate = 1.5;
      // audio.currentTime = 1;
      // audio.fastSeek(1);
      // audio.duration = 0.1;
      audio.play();

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

  // Display a silent, page-specific prompt until the user interacts.
  displayInitialPrompt();

  // Make the entire profile card clickable to cycle through quotes
  profileCard.classList += ' pointer';
  profileCard.addEventListener('click', () => {
    if (isTyping) {
      return;
    }

    if (!hasStartedConversation) {
      hasStartedConversation = true;
      displayQuote(pageQuotesForCurrentPage);
      return;
    }

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
