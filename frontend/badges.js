function createFakeAd() {
  const ad = document.createElement('div');
  ad.className = 'fake-ad';
  ad.style.position = 'absolute';
  ad.style.width = '88px';
  ad.style.height = '31px';

  const gifNumber = Math.floor(Math.random() * 100);
  const img = document.createElement('img');
  img.src = `badges/${gifNumber}.gif`;
  img.style.width = '100%';
  img.style.height = '100%';
  ad.appendChild(img);

  const x = Math.floor(Math.random() * window.innerWidth) + window.scrollX;
  const y = Math.floor(Math.random() * window.innerHeight) + window.scrollY;
  ad.style.left = x + 'px';
  ad.style.top = y + 'px';

  document.body.appendChild(ad);
}

document.addEventListener('DOMContentLoaded', () => {
  setInterval(createFakeAd, 1000);
});
