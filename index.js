import World from './world.js';
import Bird from './bird.js';
import Vector from './vector.js';
import Bars from './bar.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const scoreDiv = document.getElementById('score');
const startButton = document.getElementById('button');
const dying_duck_sound = new Audio('./dying_duck_bgm.mp3');
let world;
let bird;
let play = true;
let score = 0;

function init() {
    dying_duck_sound.pause();
    world = new World({ gravity: new Vector(0, 10), onGameOver });
    bird = new Bird({ ctx });
    world.add_sprite(bird);
    window.onkeydown = e => {
        if (e.code === 'Space') bird.jump();
        if (e.code === 'ArrowRight') bird.moveHorizontally(1);
        if (e.code === 'ArrowLeft') bird.moveHorizontally(-1);
    }
}

function hideStartButton() {
    startButton.style.display = 'none';
}

function showStartButton() {
    startButton.style.display = 'block';
}

startButton.onclick = () => {
    init();
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
    dying_duck_sound.play();
}

function add_bar() {
    const bar = new Bars({ ctx, canvas, birdRadius: bird.radius });
    world.add_sprite(bar);
    i = 0;
}

let i = 0;

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