// okay, so this defines the database for it to be called later.
let db;
// These get the stuff for my form for creating games
const gameForm = document.getElementById("addGameForm");
const titleInput = document.getElementById("gameName");
const imageInput = document.getElementById("gameImage");

const playlistForm = document.getElementById("addPlaylistForm");
const playlistTitle = document.getElementById("playlistName")
const playlistImage = document.getElementById("playlistImage")
const playlistId = new URLSearchParams(window.location.search).get("id");

// function somehow makes a database?
function openDatabase() {
    // I guess what this does is basically, it opens the database within indexedDB. At spot 1 or smth idk. 
    const request = indexedDB.open("GameLibrary", 2);
    // request.onupgradeneeded. I don't understand what that means man. I think it means, "oh yo is there an object someone's tryna put in there?". So i guess it's literalyl like that okay. But more like, "hey is someone opening a new database?" so it will run after request basically.
    request.onupgradeneeded = function(event) {
        // so event.target is basically, for the object that triggered the event (in this case request?)
        const database = event.target.result;

        console.log("Creating/upgrading database");
        // if this database does not actually have a "games" (column?) spot, it creates a spot for it with the auto increment id
        if (!database.objectStoreNames.contains("games")) {
            database.createObjectStore("games", {keyPath: "id", autoIncrement: true});
        }
        if (!database.objectStoreNames.contains("playlists")) {
            database.createObjectStore("playlists", {keyPath: "id", autoIncrement: true});
        }
    };
    // if it worked 
    request.onsuccess = function(event) {
        db = event.target.result;

        console.log("Database opened successfully!");
        if(document.getElementById("THING").textContent=="GameShelf"){
            loadGames();
            loadPlaylist();
        }
        else{
            renderPlaylist(playlistId);
        }
    };
    // if it didn't
    request.onerror = function(event) {
        // tells me what fucked up
        console.log("Database error:", event.target.error);
    };
}

function addGame() {
    // so first, we got our game from the inputs of the form
    const game = {title:titleInput.value, image:imageInput.files[0]};
    // console.log is telling me what values are being attempted to add
    console.log("Trying to add:", game);
    // so this transaction basically goes into our database, it doesn't make a column, but it goes and it's like "yo database, i need to work with our games here you mind?" and then gives me access for the future that I can reference
    const transaction = db.transaction("games", "readwrite");
    // okay, so that previous transaction? yeah this is sayin "gimme the column so I can modify rq" 
    const store = transaction.objectStore("games");
    // and finally, the store referenced here is just simply the previous line, but then THIS is the one that adds the game info.
    const request = store.add(game);

    // this is just "hey were we able to store the game?" and then it does all of this if it is
    request.onsuccess = function() {
        // this adds a new part to the "game" variable. This is an ID variable that comes from the auto increment in the database (request.result main reference is the id, so this just fetches that i think)
        game.id = request.result;
        // just logs the game, simple.
        console.log("Saved game:", game);
        // performs the display function
        document.getElementById("gameCollection").appendChild(displayGame(game,0));
        gameForm.reset();
    };

    request.onerror = function(event) {
        console.log("Game failed to save:", event.target.error);
    };
}

function loadGames(){
    // another transaction here. just goes into the database saying that I just need to really quickly read the games.
    const transaction = db.transaction("games", "readonly");
    // gets me the column I need
    const store = transaction.objectStore("games");
    // the store here goes ahead and grabs everything in the list
    const request = store.getAll();
    request.onsuccess = function(){
        // gets the list of games and displays each
        const games = request.result;
        console.log("Games loaded from database:", games);
        games.forEach(function(game) {
            document.getElementById("gameCollection").appendChild(displayGame(game,0));
        });
    };
}
// banana (delete this later, use for ctrl-f)
function displayGame(game, number) {
    // makes html elements for me to use
    const card = document.createElement("div");
    card.setAttribute("class","gameCard card")
    const title = document.createElement("h3");
    title.style.margin="auto";
    title.style.marginLeft="50px";
    title.style.fontSize="35px";
    title.textContent = game.title;
    const img = document.createElement("img");
    img.setAttribute("class", "gameCover")
    // this is essentially, "if the game image exists, make a new URL for it"
    if(game.image){
        img.src = URL.createObjectURL(game.image);
    }

    // makes a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("class", "delete")
    // event listener for click
    // super
    deleteButton.addEventListener("click", function(){
        if(document.getElementById("THING").textContent=="GameShelf"){
            // tells me what game is being deleted
            console.log("Deleting game:", game);
            console.log("Deleting ID:", game.id);
            // removes the id from the database
            deleteGame(game.id);
        }
        else{
            removeFromPlaylist(number)
        }
    });
    card.appendChild(img);
    card.appendChild(title);
    const add = document.createElement("button")
    if(document.getElementById("THING").textContent=="GameShelf"){
        add.textContent = "Add to playlist";
        add.setAttribute("class", "delete")
        // event listener for click
        add.addEventListener("click", function(){
            showPlaylistList(game.id,event.pageX,event.pageY)
        });
        card.appendChild(add);
    }
    card.appendChild(deleteButton);
    // adds to the page
    return(card)
}
function deleteGame(id) {
    // resets the html
    document.getElementById("gameCollection").innerHTML="";
    // goes through the games
    const transaction = db.transaction("games", "readwrite");
    // actually checks the column
    const store = transaction.objectStore("games");
    // deleted the id
    const request = store.delete(id);
    request.onsuccess = function() {
        console.log("Game deleted");
        loadGames();
    };
    request.onerror = function(event){
        console.log("Delete failed:", event.target.error);
    };
}
// This is what actually makes the button/form call addGame()
gameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addGame();
    toggleForm('addGameForm')
    toggleForm('gameButton')
});
playlistForm.addEventListener("submit", function(event) {
    event.preventDefault();
    createPlaylist();
    toggleForm('addPlaylistForm')
    toggleForm('playlistButton')
});
function createPlaylist(){
    const playlist = {title:playlistTitle.value, image:playlistImage.files[0], games:[]};
    console.log("Trying to make:", playlist);
    const transaction = db.transaction("playlists", "readwrite");
    const store = transaction.objectStore("playlists");
    const request = store.add(playlist);
    request.onsuccess = function() {
        playlist.id = request.result;
        console.log("Saved playlist:", playlist);
        document.getElementById("playlistCollection").appendChild(displayPlaylist(playlist));
        playlistForm.reset();
    };

    request.onerror = function(event) {
        console.log("Game failed to save:", event.target.error);
    };
}
function loadPlaylist(){
    const transaction = db.transaction("playlists", "readonly");
    const store = transaction.objectStore("playlists");
    const request = store.getAll();
    request.onsuccess = function(){
        const playlists = request.result;
        console.log("Playlists loaded from database:", playlists);
        playlists.forEach(function(playlist){
            document.getElementById("playlistCollection").appendChild(displayPlaylist(playlist));
        });
    };
}
function displayPlaylist(playlist){
    // makes html elements for me to use
    const card = document.createElement("a");
    card.setAttribute("class","playlistCard card")
    card.setAttribute("href", "playlist.html?id="+playlist.id)
    const title = document.createElement("h3");
    title.textContent = playlist.title;
    const img = document.createElement("img");
    img.setAttribute("class", "playlistCover")
    // this is essentially, "if the game image exists, make a new URL for it"
    if(playlist.image){
        img.src = URL.createObjectURL(playlist.image);
    }
    card.appendChild(img);
    card.appendChild(title);
    return(card)
}
function deletePlaylist(id){
    document.getElementById("playlistCollection").innerHTML = "";

    const transaction = db.transaction("playlists", "readwrite");
    const store = transaction.objectStore("playlists");
    const request = store.delete(id);

    request.onsuccess = function() {
        console.log("Playlist deleted");
        loadPlaylist();
    };

    request.onerror = function(event) {
        console.log("Playlist delete failed:", event.target.error);
    };
}
// This function shows the user what playlists they can add their games to
function showPlaylistList(game,x,y){
    const transaction=db.transaction("playlists","readwrite");
    const store=transaction.objectStore("playlists");
    const request=store.getAll();
    
    request.onsuccess=function(){
        // parent is the thing that holds the playlist buttons
        const parent=document.getElementById("selectPlaylist")
        parent.style.left=x+"px";
        parent.style.top=y+"px";
        console.log(x+","+y)
        // resets it and regenerates playlist buttons
        parent.innerHTML="";
        request.result.forEach(playlist=>{
            // makes a child for the parent to have. lilTimmy is here to perform the "addGameToPlaylist" function
            const lilTimmy=document.createElement("button")
            lilTimmy.textContent=playlist.title
            lilTimmy.addEventListener("click",function(){
                addGameToPlaylist(game,playlist.id)
                parent.hidden="true";
                document.getElementById("cover").hidden=true;
            })
            parent.appendChild(lilTimmy)
        })
        parent.hidden=false;
        document.getElementById("cover").hidden=false;
    }
}
// my cover is a simple thing for when you want to add a playlist and you click off instead
document.getElementById("cover").addEventListener("click",function(){
    document.getElementById("selectPlaylist").hidden=true;
    document.getElementById("cover").hidden=true;
})
// takes a game ID, puts it in the array inside the playlists part of the database
function addGameToPlaylist(game,playlist){
    const transaction=db.transaction("playlists","readwrite");
    const store=transaction.objectStore("playlists");
    const request=store.get(playlist);
    request.onsuccess=function(){
        const playlist=request.result;
        playlist.games.push(game)
        store.put(playlist)
    }
}
// This takes an element, specifically my form elements and their corresponding buttons, and hides or reveals it.
function toggleForm(form){
    document.getElementById(form).hidden=!document.getElementById(form).hidden
}
function renderPlaylist(id){
    id = Number(id);
    const transaction=db.transaction("playlists","readonly");
    const store=transaction.objectStore("playlists");
    const request=store.get(id);
    request.onsuccess=function(){
        const playlist=request.result;
        if(playlist.image){
            document.getElementById("playlistVisual").src = URL.createObjectURL(playlist.image);
        }
        document.querySelector("h1").textContent=playlist.title;
        let o=0;
        playlist.games.forEach(game=>{
            const gameTransaction=db.transaction("games","readonly")
            const gameStore=gameTransaction.objectStore("games")
            const gameRequest=gameStore.get(game)
            gameRequest.onsuccess=function(){
                document.getElementById("gameCollection").appendChild(displayGame(gameRequest.result,o))
                // console.log(gameRequest)
                o+=1;
            }
            // console.log(o)
        })
    }
}
function removeFromPlaylist(number){
    const transaction=db.transaction("playlists","readwrite");
    const store=transaction.objectStore("playlists");
    const request=store.get(Number(playlistId));
    request.onsuccess=function(){
        
        const playlist=request.result
        console.log("number:", number, typeof number);
        console.log("before:", playlist.games);
        console.log(playlist.games)

        playlist.games.splice(number,1)

        console.log(playlist.games)

        const updateRequest = store.put(playlist);
        updateRequest.onsuccess = function() {
            document.getElementById("gameCollection").innerHTML = "";
            renderPlaylist(playlistId);
        };
    }
}
function deleteThisStupidPlaylistThatIwantToBeGoneAndOutOfMyLibraryAsSoonAsPossibleSoBasicallyRightNowPrettyPlease(){
    const transaction=db.transaction("playlists","readwrite");
    const store=transaction.objectStore("playlists")
    const request=store.delete(Number(playlistId))
    goHome();
}
function goHome(){
    window.location.replace("finalpage1.html")
}