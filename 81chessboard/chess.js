function createBoard(row, col){
    let chess = document.getElementById("chess");
    for(let i=0;i<col;i++){
        let tr = document.createElement("tr");
        for(let o=0;o<row;o++){
            let td=document.createElement("td");
            td.setAttribute("id", ["a","b","c","d","e","f","g","h"][o]+(8-i));
            td.style.backgroundColor=["white","black"][(i+o)%2]
            // td.style.borderColor=["white","black"][(i+o)%2]
            tr.appendChild(td);
        }
        chess.appendChild(tr);
    }
}

function setPieces(){
    document.getElementById("pieceLayer").innerHTML="";
    
}