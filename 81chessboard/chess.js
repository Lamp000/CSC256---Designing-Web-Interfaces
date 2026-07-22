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
let arrSetupChess = [
    ["Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"],
    ["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"],
    ["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"],
    ["Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"],
];
function chessPieces(){
    for(let i=0;i<8;i++){
        for(let o=0;o<8;o++){
            if(i<2 || i>5){
                let element = document.createElement("img");
                element.setAttribute("src", arrSetupChess[["0","1","","","","","2","3"][i]][o]+["W","W","B","W","B","B","B","B"][i]+".png");
                element.setAttribute("class", "piece")
                element.setAttribute("id", "Piece"+i+o)
                document.getElementById("pieceLayer").appendChild(element);
            }
        }
    }
}
function setPieces(){
    document.getElementById("pieceLayer").innerHTML="";
    chessPieces();
    for(let i=0;i<8;i++){
        for(let o=0;o<8;o++){
            if(i<2 || i>5){
                let piece = document.getElementById("Piece"+i+o);
                let square = document.getElementById(["a","b","c","d","e","f","g","h"][o]+(i+1))
                piece.style.top=(square.offsetTop+square.offsetHeight*2/7)+"px";
                piece.style.left=(square.offsetLeft+square.offsetWidth*2/7)+"px";
            }
        }
    }
}