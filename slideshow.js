let images = ["20251018011103_1.jpg", "20251021001355_1.jpg", "20251023021009_1.jpg", "20251024195512_1.jpg"]
let current = 0

function changeSlide(n){
    // changes the slide "number"
    current = current + n;
    // if the number it gets changed to is invalid, sets it to what it would be
    if(current<=-1){
        // the number goes below zero, so it goes to the 4th image in the array
        current = 3
    }
    if(current>=4){
        // the number goes above 3, so it goes to the 1st image in the array
        current = 0
    }
    // finally, sets the image on the webpage to the correct image
    document.getElementById("image").setAttribute("src", images[current])
}