
// DEFINING
const viewport = document.getElementById("viewport");
const world = document.getElementById("world");
const template = document.getElementById("template");

const TILE_SIZE = 2200;
const GRID = 10;
const SPEED = 0.1;

let posX = 0;
let posY = 0;

let targetX = 0;
let targetY = 0;

function positionItems(dadash) {

  dadash.querySelectorAll(".item").forEach(item => {

    const x = Number(item.dataset.x);
    const y = Number(item.dataset.y);

    item.style.left = x + "px";
    item.style.top = y + "px";
    item.style.bottom = y + "px";
    item.style.right = x + "px";
  });
}

// REPETITION

positionItems(template);

template.style.left = TILE_SIZE + "px";
template.style.top = TILE_SIZE + "px";
template.style.bottom = TILE_SIZE + "px";
template.style.right = TILE_SIZE + "px";


for (let y = 0; y < GRID; y++) {
  for (let x = 0; x < GRID; x++) {

  

    const clone = template.cloneNode(true);

    clone.style.left = x * TILE_SIZE + "px";
    clone.style.top = y * TILE_SIZE + "px";
    clone.style.bottom = y * TILE_SIZE + "px";
    clone.style.right = x * TILE_SIZE + "px";

    positionItems(clone);

    world.appendChild(clone);
  }
}

let isDragging = false;
let startX = 0;
let startY = 0;

// USER INTERFACE

viewport.addEventListener("mousedown", e => {

  startX = e.clientX;
  startY = e.clientY;

  viewport.style.cursor = "all-scroll";
});


window.addEventListener("mouseup", () => {

  isDragging = false;
  viewport.style.cursor = "all-scroll";
});

viewport.addEventListener("touchstart", e => {
  isDragging = true;
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  viewport.style.cursor = "all-scroll"; 
});

viewport.addEventListener("touchmove", e => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;
  targetX += dx;
  targetY += dy;
  startX = touch.clientX;
  startY = touch.clientY;
  e.preventDefault(); 
});

viewport.addEventListener("touchend", () => {
  isDragging = false;
});

// SCROLLING AND CLONING MATHS

viewport.addEventListener("wheel", e => {

  e.preventDefault();

  targetX -= e.deltaX;
  targetY -= e.deltaY;

}, { passive: false });


function wrap(value) {

  const limit = TILE_SIZE*GRID;

  return ((value + limit) % (limit * 2)) - limit;
}


function animate() {

  targetX = wrap(targetX);
  targetY = wrap(targetY);

  posX += (targetX - posX) * SPEED;
  posY += (targetY - posY) * SPEED;

  world.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`;

  requestAnimationFrame(animate);
}

animate();
