function getPlaylists(){

}
let db;

const form = document.querySelector("#addGameForm");
const titleInput = document.querySelector("#titleInput");
const typeInput = document.querySelector("#typeInput");
const imageInput = document.querySelector("#imageInput");

function openDatabase() {
  const request = indexedDB.open("GameLibrary", 1);

  request.onupgradeneeded = function(event) {
    const database = event.target.result;

    console.log("Creating/upgrading database");

    if (!database.objectStoreNames.contains("games")) {
      database.createObjectStore("games", {
        keyPath: "id",
        autoIncrement: true
      });
    }
  };

  request.onsuccess = function(event) {
    db = event.target.result;

    console.log("Database opened successfully!");

    loadGames();
  };

  request.onerror = function(event) {
    console.log("Database error:", event.target.error);
  };
}

function addGame() {
    const game = {
        title: titleInput.value,
        type: typeInput.value,
        image: imageInput.files[0]
    };
    console.log("Trying to add:", game);
    const transaction = db.transaction("games", "readwrite");
    const store = transaction.objectStore("games");
    const request = store.add(game);

    request.onsuccess = function() {
        game.id = request.result;

        console.log("Saved game:", game);

        displayGame(game);
        form.reset();
    };
    request.onerror = function(event) {
        console.log("Game failed to save:", event.target.error);
    };
}

function loadGames(){
const transaction = db.transaction("games", "readonly");
const store = transaction.objectStore("games");

const request = store.getAll();

    request.onsuccess = function(){
        const games = request.result;

        games.forEach(function(game) {
            displayGame(game);
        });
    };
}

function displayGame(game) {
    const card = document.createElement("div");
    card.setAttribute("class","gameCard")
    const title = document.createElement("h3");
    title.textContent = game.title;

    const img = document.createElement("img");

    if (game.image) {
    img.src = URL.createObjectURL(game.image);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";

    deleteButton.addEventListener("click", function() {
        console.log("Deleting game:", game);
        console.log("Deleting ID:", game.id);

        deleteGame(game.id);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(deleteButton);

    document.querySelector("#gameCollection").appendChild(card);
}
function deleteGame(id) {
    const transaction = db.transaction("games", "readwrite");
    const store = transaction.objectStore("games");

    const request = store.delete(id);

    request.onsuccess = function() {
        console.log("Game deleted");

        loadGames();
    };

    request.onerror = function(event) {
        console.log("Delete failed:", event.target.error);
    };
}
// This is what actually makes the button/form call addGame()
form.addEventListener("submit", function(event) {
  event.preventDefault();

  console.log("Form submitted");

  addGame();
});


// Start the database
openDatabase(); 