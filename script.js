const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = "/liberation-room/assets/images/scotoma.png";

let started = false;
let revealAmount = 0;

// store blobs
const blobs = [];

img.onload = () => {
  drawBase();
};

// draw covered screen
function drawBase() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#F4EFC3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// create soft blob
function createBlob(x, y) {
  return {
    x,
    y,
    r: 40 + Math.random() * 80,
    growth: 0.5 + Math.random(),
    alpha: 1
  };
}

// draw blobs
function drawBlobs() {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";

  blobs.forEach(b => {
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);

    g.addColorStop(0, `rgba(0,0,0,${b.alpha})`);
    g.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();

    // grow + fade
    b.r += b.growth;
    b.alpha *= 0.98;
  });

  ctx.restore();
}

// animation loop
function animate() {
  if (!started) return;

  drawBase();
  drawBlobs();

  // auto generate blobs slowly
  if (Math.random() < 0.08) {
    blobs.push(createBlob(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    ));
  }

  revealAmount += blobs.length * 0.0002;

  if (revealAmount > 1.2) {
    goTo("next");
    return;
  }

  requestAnimationFrame(animate);
}

// interaction (mouse = intentional exploration)
canvas.addEventListener("mousemove", (e) => {
  if (!started) return;

  blobs.push(createBlob(e.clientX, e.clientY));
});

// start
document.addEventListener("keydown", () => {
  if (started) return;

  started = true;
  document.getElementById("overlay").classList.add("hidden");

  animate();
});

// navigation
function goTo(id) {
  document.querySelectorAll("section").forEach(s => s.hidden = true);
  document.getElementById(id).hidden = false;
}
