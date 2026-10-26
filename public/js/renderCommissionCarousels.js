document.querySelectorAll('.commissions__image-container').forEach((container) => {
  const images = Array.from(container.querySelectorAll('.commissions__image'));
  if (images.length < 2) return;

  const track = document.createElement('div');
  track.className = 'commissions__image-track';

  const group = document.createElement('div');
  group.className = 'commissions__image-group';
  images.forEach((image) => group.appendChild(image));

  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('img').forEach((image) => {
    image.alt = '';
  });

  track.append(group, duplicate);
  container.replaceChildren(track);
});