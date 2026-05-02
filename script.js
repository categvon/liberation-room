// ---------- SPA NAV ----------
function goTo(id) {
  document.querySelectorAll("section").forEach(s => s.hidden = true);
  document.getElementById(id).hidden = false;
}

// ---------- LANDING EFFECT ----------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = "assets/images/scotoma.png";

let revealProgress = 0;

img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // overlay fog
  ctx.fillStyle = "#F4EFC3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

document.addEventListener("keydown", () => {
  const text = document.getElementById("text");
  if (text) text.style.display = "none";

  // reveal blotches
  for (let i = 0; i < 6; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 60 + Math.random() * 120;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  revealProgress++;

  // transition to next screen
  if (revealProgress > 20) {
    goTo("challenge1");
  }
});

// ---------- CHALLENGE 1 ----------
document.addEventListener("DOMContentLoaded", () => {
  const glasses = document.getElementById("glasses");

  glasses.addEventListener("click", () => {
    goTo("challenge2");
  });
});
