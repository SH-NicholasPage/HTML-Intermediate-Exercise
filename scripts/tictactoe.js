const gameStates = Object.freeze({ 
    in_game: 0,
    won: 1,
    draw: 2
});

let turn = 0;
let player = "X";
let numberOfCells = 0;
let rows = 0;
let table = [];

window.onload = function()
{
    while(document.getElementById("cell" + (numberOfCells + 1)) != null)
    {
        numberOfCells++;
    }

    rows = Math.sqrt(numberOfCells);

    for(let i = 0; i < rows; i++)
    {
        table[i] = [];
        for(let j = 0; j < rows; j++)
        {
            table[i][j] = document.getElementById("cell" + (i * rows + j + 1)).innerHTML;
        }
    }
}

function cellClicked(cellNumber) 
{
    if(document.getElementById("cell" + cellNumber).innerHTML !== "" || checkForWin() === true)
    {
        return;
    }

    player = (turn++ % 2 === 0) ? "X" : "O";
    document.getElementById("cell" + cellNumber).innerHTML = player;
    table[Math.floor((cellNumber - 1) / rows)][(cellNumber - 1) % rows] = player;

    if(checkForWin() === true)
    {
        changeGameStatus(gameStates.won);
    }
    else if(turn === numberOfCells)
    {
        changeGameStatus(gameStates.draw);
    }
    else
    {
        let playerElems = document.getElementsByClassName("player");

        for(let i = 0; i < playerElems.length; i++)
        {
            playerElems[i].innerHTML = turn % 2 + 1;
        }
    }
}

function changeGameStatus(state)
{
    switch(state)
    {
        case gameStates.in_game:
            document.getElementById("game-status").innerHTML = `Player <span class="player">1</span>'s turn`;
            document.getElementById("game-status").style.color = "black";
            document.getElementById("game-status").style.fontWeight = "normal";
            document.getElementById("reset-button").style.visibility = "hidden";
            break;
        case gameStates.won:
            document.getElementById("game-status").innerHTML = `Player ${(turn - 1) % 2 + 1} wins!`;
            document.getElementById("game-status").style.color = "green";
            document.getElementById("game-status").style.fontWeight = "bold";
            document.getElementById("reset-button").style.visibility = "visible";
            break;
        case gameStates.draw:
            document.getElementById("game-status").innerHTML = "Draw!";
            document.getElementById("game-status").style.color = "orange";
            document.getElementById("game-status").style.fontWeight = "bold";
            document.getElementById("reset-button").style.visibility = "visible";
            break;
    }
}

function checkForWin()
{
    for(let i = 0; i < rows; i++)
    {
        let row = true;
        let column = true;
        for(let j = 0; j < rows; j++)
        {
            row = row && table[i][j] === player;
            column = column && table[j][i] === player;
        }

        if(row || column)
        {
            return true;
        }
    }

    let diagonal1 = true;
    let diagonal2 = true;
    for(let i = 0; i < rows; i++)
    {
        diagonal1 = diagonal1 && table[i][i] === player;
        diagonal2 = diagonal2 && table[i][rows - i - 1] === player;
    }

    return diagonal1 || diagonal2;
}

function resetGame()
{
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < rows; j++)
        {
            table[i][j] = document.getElementById("cell" + (i * rows + j + 1)).innerHTML = "";
        }
    }

    turn = 0;
    player = "X";
    changeGameStatus(gameStates.in_game);
}