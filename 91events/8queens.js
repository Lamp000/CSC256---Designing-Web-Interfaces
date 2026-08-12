function createBoard(row, col){
    let chess = document.getElementById("chess");
    for(let i=0;i<col;i++){
        let tr = document.createElement("tr");
        for(let o=0;o<row;o++){
            let td=document.createElement("td");
            td.setAttribute("id", i+","+o);
            td.style.backgroundColor=["rgb(212, 212, 212)","rgb(95,95,95)"][(i+o)%2]
            td.addEventListener("click", function(){
                makeQueen(i,o,true);
            })
            tr.appendChild(td);
        }
        chess.appendChild(tr);
    }
}
let checkedSolutions=[];
let currentBoardX=[];
let currentBoardY=[];

let solved=[];
function resetBoardColor(){
    for(let i=0;i<8;i++){
        for(let o=0;o<8;o++){
            document.getElementById(i+","+o).style.backgroundColor=["rgb(212, 212, 212)","rgb(95,95,95)"][(i+o)%2]
        }
    }
}
function makeQueen(x,y,playerSolvedIt){
    resetBoardColor()
    document.getElementById("solutions").innerHTML="";
    if(!(currentBoardX.length==8 && currentBoardY.length==8)){
        if(!currentBoardX.includes(x) && getPlayerSquares(x).includes(y)){
            currentBoardX.push(x)
            currentBoardY.push(y)
        }
        else{
            document.getElementById((x)+","+(y)).style.backgroundColor="rgb(255,0,0)"
        }
        if(currentBoardX.length==8 && currentBoardY.length==8 && playerSolvedIt){
            let tempList=[];
            for(let i=0;i<8;i++){
                let correctSquare=document.getElementById(currentBoardX[currentBoardX.indexOf(i)]+","+currentBoardY[currentBoardX.indexOf(i)])
                correctSquare.style.backgroundColor="green";
                tempList.push(currentBoardX[currentBoardY.indexOf(i)]+1)
            }
            if(!solved.includes(tempList)){solved.push(tempList)}
        }
        showQueens()
    }
}
function getPlayerSquares(col){
    let numbers=[0,1,2,3,4,5,6,7]
    for(let i=0;i<currentBoardX.length;i++){
        let colDistance=col-currentBoardX[i];
        numbers=numbers.filter((thing) => thing!=currentBoardY[i] && thing!=currentBoardY[i]+colDistance && thing!=currentBoardY[i]-colDistance)
    }
    return numbers;
};
function getAvailableSquares(queens){
    let numbers=[1,2,3,4,5,6,7,8]
    for(let q=0;q<queens.length;q++){
        let colDistance=queens.length-q;
        numbers=numbers.filter((thing) => thing!=queens[q] && thing!=queens[q]+colDistance && thing!=queens[q]-colDistance)
    }
    return(numbers)
};
function getSolutions(queens){
    let available=getAvailableSquares(queens)
    if(queens.length==8){
        checkedSolutions.push(queens)
    }
    available.forEach(queen => {
        getSolutions([...queens,queen])
    });
}
getSolutions([])

// rough draft ideally ends up doing something like this:
// for each square coming from getAvailableSquares()
    // for each square coming from getAvailableSquares([column 1])
        // for each square coming from getAvailableSquares([column 1, column 2])
            // ...
                // for each square coming from getAvailableSquares([column 1,...,column 8])
                    // add each solution to the list of solutions

function resetBoard(){
    resetBoardColor()
    for(let i=0;i<8;i++){
        removeQueen(i)
    }
}
function showQueens(){
    currentBoardX.forEach(thing=>{
        let queen=document.getElementById("queen"+thing);
        let index = currentBoardX.indexOf(thing)
        queen.hidden=false;
        queen.style.top=60*(currentBoardX[index])+"px";
        queen.style.left=60*(currentBoardY[index])+"px";
    })
}
function removeQueen(i){
    document.getElementById("solutions").innerHTML="";
    const index=currentBoardX.indexOf(i);
    if (index!=-1){
        document.getElementById(currentBoardX[index]+","+currentBoardY[index]).style.backgroundColor=["rgb(212, 212, 212)","rgb(95,95,95)"][(currentBoardX[index]+currentBoardY[index])%2];
        currentBoardX.splice(index,1);
        currentBoardY.splice(index,1);
    }
    document.getElementById("queen"+i).hidden=true;
}
for(let i=0;i<8;i++){
    let img=document.createElement("img");
    img.setAttribute("id", "queen"+i);
    img.setAttribute("src", "queen.png");
    img.setAttribute("class", "piece");
    img.addEventListener("click", function(){
        removeQueen(i)
    })
    img.hidden=true;
    document.getElementById("pieceLayer").appendChild(img);
}

function getPlayerSolutions(){
    resetBoardColor()
    let PlayerSolutions=checkedSolutions;
    // solved.forEach(solve=>{
    //     PlayerSolutions=PlayerSolutions.filter(possible=>!(solve[0]==possible[0] && solve[1]==possible[1] && solve[2]==possible[2] && solve[3]==possible[3] && solve[4]==possible[4] && solve[5]==possible[5] && solve[6]==possible[6] && solve[7]==possible[7]))
    // })
    for(let i=0;i<currentBoardX.length;i++){
        if(PlayerSolutions.filter(solution=>solution[currentBoardY[i]]==currentBoardX[i]+1).length!=0){
            let X=currentBoardX[i];
            let Y=currentBoardY[i];
            PlayerSolutions=PlayerSolutions.filter(solution=>solution[Y]==X+1)
        }
        else{
            return([[i]])
        }
    }
    return(PlayerSolutions)
}
function seeSolutions(){
    document.getElementById("solutions").innerHTML="";
    let solutions=getPlayerSolutions();
    if(solutions[0].length==8){
        for(let s=0;s<solutions.length;s++){
            let Anthony=document.createElement("button");
            Anthony.textContent="Solution "+(s+1);
            Anthony.style.width=8+"%";
            Anthony.addEventListener("click",function(){
                resetBoard()
                for(let i=0;i<8;i++){
                    makeQueen(solutions[s][i]-1,i,false)
                }
            })
            document.getElementById("solutions").appendChild(Anthony)
        }
    }
    else{
        let Antony=document.createElement("div")
        Antony.textContent="No Solutions!"
        document.getElementById("solutions").appendChild(Antony)
    }
}
function getHint(){
    let solutions=getPlayerSolutions();
    let hintSquares=[];
    let popularSquares=[];
    let theSquares=[];
    if(solutions[0].length==8){
        for(let s=0;s<solutions.length;s++){
            let solution=solutions[s];
            for(let n=0;n<8;n++){
                if(!currentBoardY.includes(n)){
                    hintSquares.push((10*(n+1))+(solution[n]))
                }
            }
        }
        while(hintSquares.length>0){
            let Square=hintSquares[0]
            theSquares.push(Square)
            popularSquares.push(hintSquares.filter(square=>square==Square).length)
            hintSquares=hintSquares.filter(square=>square!=Square)
        }
        while(theSquares.length>0){
            if(Math.max(...popularSquares)!=Math.max(...popularSquares)){
                theSquares=theSquares.filter(square=>Math.max(...popularSquares)==popularSquares[theSquares.indexOf(square)])
                popularSquares=popularSquares.filter(square=>Math.max(...popularSquares)==square)
            }
            else{
                theSquares=[theSquares[Math.floor(Math.random()*theSquares.length)]] // this one does a thing where it makes it into a single number in a lift (hint then takes it away, but yeah)
                let hint=theSquares.shift(); // this one removes one to be highlighted
                document.getElementById((hint%10-1)+","+(Math.floor(hint/10)-1)).style.backgroundColor="blue"
            }
        }
        
    }
    else{
        console.log(solutions[0])
        document.getElementById(currentBoardX[solutions[0][0]]+","+currentBoardY[solutions[0][0]]).style.backgroundColor="red"
    }
}