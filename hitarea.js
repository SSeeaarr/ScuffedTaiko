import HandleInput from './handleinput.js';

const canvas = document.getElementById('gamescreen');
const ctx = canvas.getContext('2d');
const deltatime = 1000 / 60;
const handleInput = new HandleInput();
const notes = [];
let songstarted = false;
export { songstarted };

export function setSongStarted(value) {
  songstarted = value;
}

export class HitArea {
  constructor(x = 200, y = 200) {
    this.x = x;
    this.y = y;
    this.radius = 60;
    this.notes = [];
  }
 drawhitarea() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 60, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'darkgray';
  ctx.fill();
  ctx.stroke();
}

 drawhitareapressed() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 60, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'gray';
  ctx.fill();
  ctx.stroke();
  }
}


function createNotes() {
  hitarea.notes.length = 0;

  
}

// we want to specify the note color, and the time it spawns in

export class Note {
  constructor(spawnTime = 0, color = 'red') {
    this.x = 1800;
    this.y = 200;
    this.color = color;
    this.spawnTime = spawnTime;
    this.active = false;
    this.speed = 600; // pixels per second (adjust as needed)
  }
  drawnote() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 60, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = 'dark' + this.color;
    ctx.fill();
    ctx.stroke();
  }

  movenote(elapsed) {
    // Move based on elapsed time instead of fixed pixels per frame
    const movement = (this.speed * elapsed) / 1000;
    this.x -= movement;
    
    if (this.x < -60) { 
      this.x = 1800; 
    }
  }

  destroynote() {
    if (this.x >= 100 && this.x <= 300 && handleInput.outerpressed && this.color === 'blue') {
      this.toRemove = true;
      
    }
    if (this.x >= 100 && this.x <= 300 && handleInput.innerpressed && this.color === 'red') {
      this.toRemove = true;


    }
  }
}


const note = new Note();
export const hitarea = new HitArea();

let timer = 0;
let mstime = 0;
let lastTime = 0;

function update(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;
  lastTime = timestamp;
  
  // More accurate millisecond timing
  if (songstarted) {
    mstime += elapsed;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hitarea.drawhitarea();

  if (handleInput.outerpressed || handleInput.innerpressed) {
    hitarea.drawhitareapressed();
  }
  
  // Debug info
  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.fillText(`Time: ${Math.floor(mstime)}ms | Notes: ${hitarea.notes.length}`, 10, 20);
  
  // Process all notes
  if (songstarted) {
    hitarea.notes.forEach(note => {
      // Add travel time offset (1800px at 10px/frame takes ~180 frames to reach the hit area)
      const travelTimeOffset = 3000; // Adjust this value based on testing
      
      // Only activate notes when their spawn time matches the current time minus travel offset
      if (!note.active && note.spawnTime <= mstime + travelTimeOffset) {
        note.active = true;
        note.x = 1800; // Start position
        console.log(`Activated note at ${mstime}ms (spawn time: ${note.spawnTime}ms)`);
      }

      if (note.active) {
        note.drawnote();
        note.movenote(elapsed); // Pass elapsed time to movenote
        note.destroynote();
      }
    });
    
    // Remove notes marked for deletion
    hitarea.notes = hitarea.notes.filter(note => !note.toRemove);
  }
  
  requestAnimationFrame(update);
}

//initialize notes
createNotes();
// Start the animation loop
requestAnimationFrame(update);

