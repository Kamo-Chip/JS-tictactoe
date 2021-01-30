const container = document.querySelector("body");
const grid = Array.from(document.getElementsByClassName("btn"));
let player1Symbol = "";
let player2Symbol = "";
let symbol = "";
let alternate = 0;
let result = "";
const startButton = document.getElementById("start");
const choice = document.getElementsByClassName("choice")[0];

startButton.onclick = function(){
    let radioButtons = document.querySelectorAll('input[name = "XandO"]');
    for(const radioButton of radioButtons){
        if(radioButton.checked){
            player1Symbol = radioButton.value;
            if(player1Symbol == "X"){
                player2Symbol = "O";
                choice.style.display = "none";
            }else{
                player2Symbol = "X";
                choice.style.display = "none";
            }
            break;
        }
    }
    
}

function play(e){
    if(alternate % 2 == 0){
        symbol = player1Symbol;
    }else{
        symbol = player2Symbol;
    }
    if(!checkWin()){
        if(e.target.innerHTML == " "){
            grid[e.target.id] = symbol;
            e.target.innerHTML = symbol;
        }else{
            alternate--;
        }
        
        if(checkWin() && symbol == player1Symbol){
            result = "Kamo wins!";
        }else if(checkWin() && symbol == player2Symbol){
            result = "Tshepang wins!"
        }
    }
        alternate++;
}

let modal = document.getElementById("myModal");
window.onclick = function(event){
    if(checkWin()){
        modal.textContent = result;
        modal.style.display = "block";
    }
    if(event.target == modal || event.target == container){
       modal.style.display = "none";
       location.reload();
    }
}

function checkWin(){
    /* 0 1 2
       3 4 5
       6 7 8*/

    if(checkAdjacent(0, 1) && checkAdjacent(1, 2)){
        return true;
    }else if(checkAdjacent(3, 4) && checkAdjacent(4, 5)){
        return true;
    }else if(checkAdjacent(6, 7) && checkAdjacent(7, 8)){
        return true;
    }else if(checkAdjacent(0, 3) && checkAdjacent(3, 6)){
        return true;
    }else if(checkAdjacent(1, 4) && checkAdjacent(4, 7)){
        return true;
    }else if(checkAdjacent(2, 5) && checkAdjacent(5, 8)){
        return true;
    }else if(checkAdjacent(0, 4) && checkAdjacent(4, 8)){
        return true;
    }else if(checkAdjacent(2,4) && checkAdjacent(4, 6)){
        return true;
    }else{
        return false;
    }
}

function checkAdjacent(a, b){

    if(grid[a] == grid[b] && grid[a] != ""){
        return true;
    }else{
        return false;
    }
}

grid.forEach((button =>{
    button.addEventListener("click", play);
}));