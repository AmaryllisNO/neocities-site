const directoryList = window.location.pathname.split('/'); // Subtract 2 for the leading and trailing slashes

let pathPrefix = '';
const pathname = window.location.pathname;

directoryList.forEach((depth) => {
  if (depth !== '') {
    pathPrefix += '../';
  }
});

const startup = document.getElementById('startup');
startup.innerHTML = `
    <div class="startup__content">
     <img class="startup__logo" src="${pathPrefix}assets/images/logo-sketch-2026-white.png" alt="Amaryllis Logo">
     <p class="startup__text">Click to enter</p>
    </div>
`;

startup.addEventListener('click', () => {
  const audio = new Audio(`${pathPrefix}assets/audio/01-UI-womp.mp3`);
  audio.play();
  startup.classList.add('startup--hide');
  setTimeout(() => {
    document.body.removeChild(startup);
  }, 500);
});
