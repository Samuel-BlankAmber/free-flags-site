const marquees = [
  "FLAG{totally_free}",
  "Running rm -rf / --no-preserve-root ...",
  "🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩",
  "FREE FLAGS!!!!",
  "H4CK3R M0D3 🕶️💻💀",
  "I put the 'pro' in procrastination 😎🔥",
  "404: Brain Not Found 🧠❌",
  "UwU what's this? 🥺👉👈",
  "Your RAM is now MINE 😈🖥️",
  "Why touch grass when you can touch code? 🌿🚫💻",
  "Loading... just kidding, I'm lazy 😴",
  "CTRL + ALT + DEL your worries away 🖥️💀",
  "Free WiFi: just connect and hope for the best 😬📡",
  "Press F to pay respects 🕹️🎮",
  "✨ JavaScript: because why not? ✨",
  "If it compiles, it ships 🚀",
  "Oops, I hacked the mainframe again 😏",
  "Code is temporary, cringe is forever 🤡",
  "404: Humor Not Found 🤖❌",
  "Your IP address is 127.0.0.1, you have been tracked. 🌍👀",
  "Hackerman mode activated 🕶️💻",
  "Did someone say free Robux? 😱💰",
  "L33T h4x0r detected 🚨🕶️",
  "When life gives you errors, console.log them 💀",
  "Trust me, I'm a programmer 😉💻",
  "Compiling... 99%... 99%... 99%... forever 🤡",
  "Oops, I accidentally deleted your entire database. 🫠",
  "Git commit -m 'fixed everything' 🤞",
  "JavaScript is just spicy HTML 🔥",
  "Let me just ChatGPT that real quick 🤔💡",
  "Sudo make me a sandwich 🥪",
  "brb, hacking NASA 🚀💻",
  "Deploying to production... what could go wrong? 😬",
  "I speak fluent emoji 🥴🔥😂",
  "Caffeine-powered debugging ☕🐞",
  "There is no cloud, it's just someone else's computer ☁️💻",
  "Bitcoin? Nah, I mine memes. 🤑📀",
  "Hack the planet! 🌎💻",
  "sudo rm -rf cringe_detector/ 🚀",
  "0% skill, 100% Stack Overflow 🔥",
  "This is fine. 🔥🐶🔥",
  "One does not simply write bug-free code 🧙‍♂️💻",
  "Hello world? More like 'Goodbye sanity' 😵",
  "Opening Notepad... for hacking purposes 😏",
];

function changeMarqueeText(marquee) {
  const randomIndex = Math.floor(Math.random() * marquees.length);
  marquee.textContent = marquees[randomIndex];
}

document.addEventListener("DOMContentLoaded", function() {
  const marquee = document.getElementById("marquee");
  changeMarqueeText(marquee);
  setInterval(() => changeMarqueeText(marquee), 10_000);
});
