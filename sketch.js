
let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';

let obstacles = [
  { x: 100, y: 130, w: 60, h: 30 },
  { x: 300, y: 220, w: 65, h: 35 },
  { x: 190, y: 290, w: 55, h: 25 }
];

function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

function draw() {
  background(205, 185, 235);

  fill(255);
  noStroke();

  for (let i = 0; i < 20; i++) {
    let x = (i * 83 + 20) % width;
    let y = (i * 51 + 15) % height;
    ellipse(x, y, 3, 3);
  }

  fill(75, 40, 115);
  rect(0, 0, 35, 10);
  rect(0, 0, 10, 35);
  rect(445, 0, 35, 10);
  rect(470, 0, 10, 35);
  rect(0, 350, 35, 10);
  rect(0, 325, 10, 35);
  rect(445, 350, 35, 10);
  rect(470, 325, 10, 35);

  if (state === 'start') {
    fill(75, 40, 115);
    textAlign(CENTER);
    textSize(25);
    text('Ghost Hunter', 240, 150);
    textSize(18);
    text('Click to start', 240, 190);
    return;
  }

  if (state === 'over') {
    fill(75, 40, 115);
    textAlign(CENTER);
    textSize(25);
    text('Game Over', 240, 145);
    textSize(18);
    text('Score: ' + score, 240, 180);
    text('Click to restart', 240, 215);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = duration - elapsed;

  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  for (let i = 0; i < obstacles.length; i++) {
    fill(120, 80, 50);
    rect(obstacles[i].x, obstacles[i].y,
         obstacles[i].w, obstacles[i].h);
  }

  drawGhost(ghost.x, ghost.y);

  fill(75, 40, 115);
  textSize(16);
  textAlign(LEFT);
  text('Score: ' + score, 15, 25);

  textAlign(RIGHT);
  text('Time: ' + ceil(timeLeft), 465, 25);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
  } else {
    if (dist(mouseX, mouseY, ghost.x, ghost.y) < 28) {
      score++;
      spawnGhost();
    }
  }
}

function spawnGhost() {
  let valid = false;

  while (valid === false) {
    ghost = {
      x: random(40, 440),
      y: random(60, 320)
    };

    valid = true;

    for (let i = 0; i < obstacles.length; i++) {
      if (
        ghost.x + 28 > obstacles[i].x &&
        ghost.x - 28 < obstacles[i].x + obstacles[i].w &&
        ghost.y + 28 > obstacles[i].y &&
        ghost.y - 28 < obstacles[i].y + obstacles[i].h
      ) {
        valid = false;
      }
    }
  }
}

function drawGhost(x, y) {
  fill(255, 165, 75);
  noStroke();
  ellipse(x, y, 55, 55);

  fill(30);
  ellipse(x - 10, y - 5, 7, 9);
  ellipse(x + 10, y - 5, 7, 9);
  ellipse(x, y + 10, 7, 5);
}
