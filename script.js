const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const colorArray = ["green", "red", "white"];
let hue = 0;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawCircle();
});

const mouse = {
  y: 100,
  x: 100,
};

let particlesArray = [];

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log(mouse);

  for (let i = 0; i <= 5; i++) {
    particlesArray.push(new Particle());
  }
});

window.addEventListener("click", () => {
  console.log(mouse);
});

function drawCircle() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, Math.PI * 2);
  ctx.fill();
}

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.color = colorArray[Math.floor(Math.random() * 3)];
    this.color = `hsl(${hue},100%,50%)`;
    this.size = Math.random() * 10;
    this.speexX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speexX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleparticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let j = 0; j < particlesArray.length; j += 1) {
    particlesArray[j].update();
    particlesArray[j].draw();

    // console.log(particlesArray[j]);
    for (let i = j; i < particlesArray.length; i += 1) {
      const dx = particlesArray[j].x - particlesArray[i].x;
      const dy = particlesArray[j].y - particlesArray[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[j].color;
        // ctx.lineWidth = particlesArray[i].size / 10;
        ctx.lineWidth = 0.1;
        ctx.moveTo(particlesArray[j].x, particlesArray[j].y);
        ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particlesArray[j].size < 0.2) {
      particlesArray.splice(j, 1);
      j = j - 1;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  hue++;
  handleparticles();
  requestAnimationFrame(animate);
}

animate();

// drawCircle();
