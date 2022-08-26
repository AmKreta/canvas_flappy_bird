import World from './world.js';
import Bird from './bird.js';
import Vector from './vector.js';
import Bars from './bar.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const scoreDiv = document.getElementById('score');
const startButton = document.getElementById('button');
let play = true;
let score = 0;

function hideStartButton() {
    startButton.style.display = 'none';
}

function showStartButton() {
    startButton.style.display = 'block';
}

startButton.onclick = () => {
    play = true;
    score = -1;
    onUpdate();
    loop();
    hideStartButton();
}

function onUpdate() {
    score++;
    scoreDiv.innerText = score;
}

function onGameOver() {
    play = false;
}

const world = new World({ gravity: new Vector(0, 10), onGameOver });
const bird = new Bird({ ctx });
world.add_sprite(bird);

window.onkeydown = e => {
    if (e.code === 'Space') bird.jump();
    if (e.code === 'ArrowRight') bird.moveHorizontally(1);
    if (e.code === 'ArrowLeft') bird.moveHorizontally(-1);
}
let i = 0;

function add_bar() {
    const bar = new Bars({ ctx, canvas, birdRadius: bird.radius });
    world.add_sprite(bar);
    i = 0;
}

function loop() {
    if (play) window.requestAnimationFrame(loop);
    else showStartButton();
    i === 75 && add_bar();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    world.update({ onUpdate });
    world.render();
    i++;
}