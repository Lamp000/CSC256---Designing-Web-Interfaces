let movies = ["American Graffiti", "American Psycho", "Scott Pilgrim vs. the World", "the Empire Strikes Back"]

function addMovies(movie){
    // gets the value typed in the text box
    let Text = document.getElementById("txtMovie").value;
    // Prevents the user from accidentaly entering nothing in
    if(Text!=""){
        movies.push(Text)
        Text="";
    }
    loadMovies()
}
function loadMovies(){
    // these next two lines reset the list, then the for loop adds all the items in the movies list in.
    let ulMovies=document.getElementById("ulMovies")
    ulMovies.innerHTML="";
    for(let i=0;i<movies.length;i++){
        // I added a very fun functionality to my thing here. So, every item you add onto the list will bring you to the corresponding page on wikipedia
        let list = document.createElement("li"); // creates a list element for the <a> to sit in
        list.setAttribute("id", "list"+i)
        let movie = document.createElement("a"); // creates the a element so you can click on the links to go to wikipedia
        let name = ""; // resets the movie name to make space for the next one
        for(let o=0;o<movies[i].length;o++){
            // this is a very fun little thing I had to do. Since the links on wikipedia do not use spaces (" ") and instead use underscores ("_"), I made this loop to check for spaces and replace them with underscores. I am guessing that there's an easier way to do this, but this is just what I figured out on my own.
            if(movies[i][o]==" "){name=name + "_"}
            else{name=name + movies[i][o]}
        }
        console.log(name)
        movie.textContent=movies[i]; // makes the movie say the appropriate name
        movie.setAttribute("href", "https://en.wikipedia.org/wiki/" + name); // sets the clickable links to go to the wikipedia page
        movie.setAttribute("target", "_blank") // this makes the <a> link open in a new tab, rather than switching the current page
        ulMovies.appendChild(list)
        document.getElementById("list"+i).appendChild(movie)
    }
}
loadMovies()
