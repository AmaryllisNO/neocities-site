// navigation.js

// Define the navigation HTML as a template string
const modes = ['desktop', 'mobile'];
const pathname = window.location.pathname;
console.log('window:', pathname);
const slashCount = (pathname.match(/\//g) || []).length;
console.log('slash count:', slashCount);

let pathPrefix = '';
if (slashCount === 1) {
  pathPrefix = '/';
} else if (slashCount > 1) {
  pathPrefix = '../'.repeat(slashCount - 1) + '';
}

console.log('pathPrefix', pathPrefix);
const navigationHTML = (mode, pathPrefix) => {
  return `
  ${
    mode === 'desktop'
      ? `<img
        class='aside__frame'
        src='${pathPrefix}assets/images/bevels/nav frame.png'
        alt='navigation frame'
      />`
      : ''
  }
  
  <nav class="nav ${mode === 'mobile' && 'nav--mobile'}">
    <ul class="nav nav__list">
      <li class="nav__list-item nav__list-item--logo">
        <a href="/"
          ><img
            src="${pathPrefix}assets/images/amaryllis 2022 text logo with icon.png"
            alt="Amaryllis Logo"
        /></a>
      </li>
      <li class="nav__list-item">
        <a class="nav__link" href="${pathPrefix}art.html">
          <div class="nav__link-container">
            <p class="nav__link-text">Art</p>
          </div>
        </a>
        <img
          class="nav__link-underline"
          src="${pathPrefix}assets/images/Simple Underline Bevel.png"
          alt=""
        />
      </li>
      <li class="nav__list-item">
        <a class="nav__link" href="${pathPrefix}music.html">
          <div class="nav__link-container">
            <p class="nav__link-text">Music</p>
          </div>
        </a>
        <img
          class="nav__link-underline"
          src="${pathPrefix}assets/images/Simple Underline Bevel.png"
          alt=""
        />
      </li>
      <li class="nav__list-item">
        <a class="nav__link" href="/journal/index.html">
          <div class="nav__link-container">
            <p class="nav__link-text">Journal</p>
          </div>
        </a>
        <img
          class="nav__link-underline"
          src="${pathPrefix}assets/images/Simple Underline Bevel.png"
          alt=""
        />
      </li>
      <li class="nav__list-item">
        <a class="nav__link" href="${pathPrefix}commissions.html">
          <div class="nav__link-container">
            <p class="nav__link-text">Commissions</p>
          </div>
        </a>
        <img
          class="nav__link-underline"
          src="${pathPrefix}assets/images/Simple Underline Bevel.png"
          alt=""
        />
      </li>
        <li class="nav__list-item">
        <a class="nav__link" href="${pathPrefix}support.html">
          <div class="nav__link-container">
            <p class="nav__link-text">Support Me</p>
          </div>
        </a>
        <img
          class="nav__link-underline"
          src="${pathPrefix}assets/images/Simple Underline Bevel.png"
          alt=""
        />
      </li>
    </ul>
  </nav>
`;
};

// Inject the navigation HTML into the <aside> element with the ID "aside"
document.addEventListener('DOMContentLoaded', () => {
  const asideElement = document.getElementById('aside');
  if (asideElement) {
    console.log('found aside element');
    asideElement.innerHTML = navigationHTML(modes[0], pathPrefix);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileNavElement = document.getElementById('mobile-nav');
  if (mobileNavElement) {
    console.log('found mobile nav element');
    mobileNavElement.innerHTML = navigationHTML(modes[1], pathPrefix);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileNavElement = document.getElementById('copyright');
  if (copyright) {
    copyright.innerHTML = `© ${new Date().getFullYear()} Amaryllis `;
  }
});
