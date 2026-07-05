console.log('characters.js loaded');

const characterList = document.querySelectorAll('.characters__list-item');

console.log('characterList:', characterList);

const amary = document.querySelector('#Amary');
console.log('amary', amary);

// for each character, add a an audio hover sound effect on hover
characterList.forEach((character) => {
  character.addEventListener('mouseenter', () => {
    const audio = new Audio('../assets/audio/TASCAM_450.wav');
    audio.play();
  });
});
