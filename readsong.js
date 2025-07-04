import { hitarea, Note, songstarted, setSongStarted } from './hitarea.js';

// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
  const fileInput = document.getElementById("file-input");
  const fileContentDisplay = document.getElementById("file-content");
  
  // Create a start button and hide it initially
  const startButton = document.createElement("button");
  startButton.textContent = "Start Song";
  startButton.style.display = "none";
  startButton.className = "start-button";
  document.body.appendChild(startButton);
  


  // Path to default song
  const defaultSongPath = "./songs/Tetoris/beatmap.osu";
  const audio = new Audio('./songs/Tetoris/audio.ogg');

  // Load default song when page loads
  loadSongFile(defaultSongPath);

  // Add click event to start the song
  startButton.addEventListener("click", function() {
    // Clear any existing notes first to prevent duplicates
    
    
    // Reset the game timer
    hitarea.timer = 0;
    hitarea.mstime = 0;
    
    // Start the music
    setSongStarted(true);
    audio.play();
    
    console.log("Song started!");
  });

  if (fileInput) {
    fileInput.addEventListener("change", handleFileSelection);
  } else {
    console.error("File input element not found!");
  }

  // Function to load a song file by path
  function loadSongFile(filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load song file: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        processOsuFile(text);
        // Show the start button after default song is loaded
        startButton.style.display = "block";
        showMessage("Default song loaded! Click 'Start Song' to begin.", "success");
      })
      .catch(error => {
        console.error("Error loading default song:", error);
        showMessage("Failed to load default song. Try uploading a file instead.", "error");
      });
  }

  function handleFileSelection(event) {
    const file = event.target.files[0];
    if (fileContentDisplay) {
      fileContentDisplay.textContent = ""; // Clear previous file content
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      processOsuFile(reader.result);
      // Show the start button after file is loaded and processed
      startButton.style.display = "block";
      showMessage("Map loaded! Click 'Start Song' to begin.", "success");
    };
    reader.onerror = () => {
      showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file);
  }
  
  // Process the contents of an osu file
  function processOsuFile(text) {
    const lines = text.split('\n');
    console.log("Processing lines:");
    
    let foundHitObjects = false;
    
    for (let line = 0; line < lines.length; line++) {
      if (lines[line].includes('HitObjects')) {
        foundHitObjects = true;
        console.log("Found HitObjects section at line " + line);
        continue;
      }
      
      if (foundHitObjects && lines[line].includes(',')) {
        const parts = lines[line].split(',');
        if (parts.length >= 5) {
          const time = parseFloat(parts[2]);
          const type = parseInt(parts[4]);
          console.log(`Note at time ${time}, type ${type}`);
          createNote(time, type);
        }
      }
    }
  }

  function createNote(time, type) {
    if (type === 0) {
      hitarea.notes.push(new Note(time, 'red'));
      console.log(`Created small don note at time ${time}`);
    }
    else if (type === 2) {
      hitarea.notes.push(new Note(time, 'blue'));
      console.log(`Created small ka note at time ${time}`);
    }
    else if (type === 4) {
      hitarea.notes.push(new Note(time, 'red'));
      console.log(`Created big don note at time ${time}`);
    }
    else if (type === 8) {
      hitarea.notes.push(new Note(time, 'blue'));
      console.log(`Created big ka note at time ${time}`);
    }
  }

  function showMessage(message, type) {
    console.log(message);
    
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.className = type || "info";
    document.body.appendChild(messageElement);
  }
});
