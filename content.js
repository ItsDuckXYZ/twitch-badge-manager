let badges = [];

chrome.storage.sync.get(['badges'], results => {
  Object.values(results.badges).forEach(badgeSet => {
    badges = badges.concat(badgeSet)
  })
})

const chatObserver = new MutationObserver(mutations => {
  for (mutation in mutations) {
    if (mutations[mutation].addedNodes.length) {
      const newNode = mutations[mutation].addedNodes[0];
      let badgeCollection = newNode.querySelectorAll('[data-badge]');

      if (!badgeCollection.length) {
        badgeCollection = newNode.querySelectorAll('.chat-badge');
      }

      badgeCollection.forEach(b => {
        let badgeName = b.dataset.badge || b.alt;
        badgeName = badgeName.toLowerCase().replace(' ', '');
        badgeName = badgeName.includes('subscriber') ? 'subscriber' : badgeName;
        badgeName = badgeName.includes('prime') ? 'premium' : badgeName;
        badgeName = badgeName.includes('cheer') ? 'bits' : badgeName;
        badgeName = badgeName.includes('verified') ? 'partner' : badgeName;
        badgeName = badgeName.includes('glhfpledge') ? 'glhf-pledge' : badgeName;
        badgeName = badgeName.includes('gift') ? 'sub-gifter' : badgeName;
        badgeName = badgeName.includes('conductor') ? 'hype-train' : badgeName;
        badgeName = badgeName.includes('owlall-accesspass2018') ? 'overwatch-league-insider_1' : badgeName;
        badgeName = badgeName.includes('directrelief') ? 'bits-charity' : badgeName;
        badgeName = badgeName.includes('cuphead') ? 'cuphead_1' : badgeName;
        console.log(b.dataset)
        if (badges.includes(badgeName)) {
          b.remove();
        }
      })
    }
  }
});

let chat,
  twitchType;
const findChat = setInterval(() => {
  chat = document.querySelector('.chat-scrollable-area__message-container');
  if (chat) {
    chatObserver.observe(chat, {
      childList: true
    })
    console.log('Disabled Badges: ' + badges)
    clearInterval(findChat);
  }
}, 1000);
