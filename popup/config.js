let userBadges = {};
chrome.storage.sync.get('badges', results => {
  if (!Object.keys(results).length) return;

  userBadges = results.badges;
  if (!userBadges[document.title]) return;
  badgeToggles = document.querySelectorAll('.badge-toggle');
  badgeToggles.forEach(toggle => {
    if (userBadges[document.title].includes(toggle.classList[1])) {
      toggle.checked = true;
    }
  })
});

const savedBanned = document.querySelector('#saved');
let enabledBadges = [];
document.querySelector('#save-changes').addEventListener('click', () => {
  const toggles = document.querySelectorAll('.badge-toggle');
  toggles.forEach(toggle => {
    if (!toggle.checked) return;
    enabledBadges.push(toggle.classList[1]);
    console.log(toggle.classList[1])
  });
  userBadges[document.title] = enabledBadges;
  chrome.storage.sync.set({'badges': userBadges});

  savedBanned.style.display = "block";
  setTimeout(() => {
    savedBanned.style.display = "none";
  }, 5000)
})

document.querySelector('.github').addEventListener('click', () => {
  window.open('https://github.com/ItsDuckXYZ/twitch-badge-manager')
})

const ffzLinks = document.querySelectorAll('.ffzLink');
ffzLinks.forEach(e => e.addEventListener('click', () => {
  window.open('https://www.frankerfacez.com/')
}))