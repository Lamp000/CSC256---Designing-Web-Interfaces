function createBoard(row, col){
    let puzzle = document.getElementById("puzzle");
    for(let i=0;i<col;i++){
        let tr = document.createElement("tr");
        for(let o=0;o<row;o++){
            let td=document.createElement("td");
            tr.appendChild(td);
        }
        puzzle.appendChild(tr);
    }
}
function buildLetters(startRow, startCol, dir, word, table, showAns, clueNum){
    for(let i=0;i<word.length;i++){
        let rowIndex=0;
        let colIndex=0;

        if(dir =="across"){
            rowIndex=startRow;
            colIndex=startCol+i;
        }
        else{
            colIndex=startCol;
            rowIndex=startRow+i;
        }
        let tr=table.rows[rowIndex];
        let td=tr.cells[colIndex];
        
        if(!td.querySelector("input")){
            let input=document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("maxLength","1");
            if(showAns==true){
                input.value=word[i].toUpperCase();
            }
            input.addEventListener("keyup", function(){
                console.log(event.key)
                if(input.value.toUpperCase()==word[i] || event.key.toUpperCase()==word[i]){
                    input.style.backgroundColor="green"
                }
                else{
                    input.style.backgroundColor="red"
                }
                if(event.key=="Backspace"){
                    input.style.backgroundColor="white"
                }
            })
            td.appendChild(input)
        }
        if(i==0){
            let number = document.createElement("div")
            number.textContent=clueNum;
            td.appendChild(number)
        }
        td.style.borderColor="black"
    }
}
let arrWords = ["JAVASCRIPT", "APPRAISE", "CUBES"];