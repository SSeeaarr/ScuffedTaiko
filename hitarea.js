import HandleInput from './handleinput.js';

const canvas = document.getElementById('gamescreen');
const ctx = canvas.getContext('2d');
const deltatime = 1000 / 60;
const handleInput = new HandleInput();
const notes = [];

class HitArea {
  constructor(x = 200, y = 200) {
    this.x = x;
    this.y = y;
    this.radius = 60;
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
  notes.length = 0;

  notes.push(new Note(1, 'red'));
  notes.push(new Note(2, 'blue'));
  notes.push(new Note(3));
}

// we want to specify the note color, and the time it spawns in

class Note {
  constructor(spawnTime = 0, color = 'red') {
    this.x = 1800;
    this.y = 200;
    this.color = color;
    this.spawnTime = spawnTime;
    this.active = false;
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

  movenote() {
    this.x -= 10; 
    if (this.x < -60) { 
      this.x = 1800; 
    }
  }

  destroynote() {
    if (this.x >= 100 && this.x <= 300 && handleInput.outerpressed && this.color === 'blue') {
      this.x = 1800; // Reset the note position until i figure out how to delete it
      console.log('Note destroyed!');
      
    }
    if (this.x >= 100 && this.x <= 300 && handleInput.innerpressed && this.color === 'red') {
      this.x = 1800; // Reset the note position until i figure out how to delete it
      console.log('Note destroyed!');
      
    }
  }
}


const note = new Note();
const hitarea = new HitArea();

let timer = 0;

function update() {
 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hitarea.drawhitarea();

  if (handleInput.outerpressed || handleInput.innerpressed) {
    hitarea.drawhitareapressed();
  }
  
  timer += deltatime / 1000;
  console.log(Math.round(timer));

  notes.forEach(note => {

    if (!note.active && note.spawnTime <= timer) {
      note.active = true;
    }

    if (note.active) {
        note.drawnote();
        note.movenote();
        note.destroynote();
    }
  });

}

//initialize notes
createNotes();
// Start the game loop
setInterval(update, deltatime);

