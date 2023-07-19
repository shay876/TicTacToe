//keep track of whose turn it is

let activePlayer = "X";
//this array stores an array of moves. We use this to determine win conditions
let selectedSquares = [];

//this function is for placing an x or o on a square
function placeXOrO(squareNumber) {
    //this condition ensures a square hasn't been selected already
    //the .some() is used to check each element of the selectSquare array
    //to see if it contains the square number clicked on

    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves the html element id that was clicked
        let select = document.getElementById(squareNumber);
        //this condition checks whose turn it is
        if (activePlayer === "X"){
            //if active player is equal to X the x.png is placed in html
            select.style.backgroundImage = 'url("images/x.png")';
            //active player may only be X or O so, if not X must be O
        } else {
            //if active player is equal to O the o.png is placed in html
            select.style.backgroundImage = 'url("images/o.png")';
        }
       //squareNumber and activePlayer are concatenated together and added to array
       selectedSquares.push(squareNumber + activePlayer);
       //this calls a function to check for win conditions
       checkWinConditions();
       //this condition is for changing active player
       if (activePlayer === "X") {
        //if active player is X chnage to O
        activePlayer = "O";
        //if active player is anything besides X
    
       }else {
        //change activePlayer to X
        activePlayer = "X";
       }

      //play placement sound
      audio('./media/place.mp3');
      //this condition checks to see if its computers turn
       if (activePlayer === "O") {
        //this function disables clicking for computers turn
        disableClick();
        //this functions waits 1 sec before the computer places an image and enables click
        setTimeout(function () {computersTurn(); }, 1000);
       }
       //returning true is needed for our computersTurn() to work
       return true;
    }

    //this function results ina  random square selected by computer
    function computersTurn() {
        //this boolean is needed for our while loop
        let success=false;
        //this variable stores a random number 0-8
        let pickASquare;
        //this condition allows our while loop to keep trying if square is alrady slected
        while (!success) {
            //random number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            //if the random number evaluated returns true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success= true;
            };
        }
    }
}

//this function parses the selectedSquares array to search for win conditions.
//drawLine() function is called to draw a line on the screen if the condition is met

function checkWinConditions() {
    //X O,1,2 condition
    if (arrayIncludes("0X", "1X" , "2X")) { drawWinLine( 50 , 100 , 558 , 100 ) }
    //X 3,4,5 condition
    else if (arrayIncludes("3X", "4X", "5X")) { drawWinLine( 50 , 304 , 558 , 304 ) }
    else if (arrayIncludes("6X", "7X", "8X")) { drawWinLine( 50 , 508 , 558 , 508 ) }
    else if (arrayIncludes("0X", "3X", "6X")) { drawWinLine( 100 , 50 , 100 , 558 ) }
    else if (arrayIncludes("1X", "4X", "7X")) { drawWinLine( 304,  50 , 304 , 558 ) }
    else if (arrayIncludes("2X", "5X", "8X")) { drawWinLine( 508,  50 , 508 , 558 ) }
    else if (arrayIncludes("6X", "4X", "2X")) { drawWinLine( 100, 508 , 510 , 90 ) }
    else if (arrayIncludes("0X", "4X", "8X")) { drawWinLine( 100, 100 , 520 , 520 ) }
    else if (arrayIncludes("0O", "1O", "2O")) { drawWinLine( 50 , 100 , 558 , 100 ) }
    else if (arrayIncludes("3O", "4O", "5O")) { drawWinLine( 50 , 304 , 558 , 304 ) }
    else if (arrayIncludes("6O", "7O", "8O")) { drawWinLine( 50 , 508 , 558 , 508 ) }
    else if (arrayIncludes("0O", "3O", "6O")) { drawWinLine( 100, 50  , 100 , 558 ) }
    else if (arrayIncludes("1O", "4O", "7O")) { drawWinLine( 304, 50  , 304 , 558 ) }
    else if (arrayIncludes("2O", "5O", "8O")) { drawWinLine( 508, 50  , 508 , 558 ) }
    else if (arrayIncludes("6O", "4O", "2O")) { drawWinLine( 100, 508 , 510 , 90 ) }
    else if (arrayIncludes("0O", "4O", "8O")) { drawWinLine( 100, 100 , 520 , 520) }

    //this condition checks for a tie, if none of the above conditions are met and
    //9 squares are selected the code executes

    else if (selectedSquares.length >=9){
        //this plays tie sound
        audio('./media/tie.mp3');
        //this function sets a .3 second timer before the resetGame is called
        setTimeout(function () {resetGame(); }, 500);
    }

    //this function checks if an array includes 3 strings, it is used to check for 
    //each win condition

    function arrayIncludes(squareA, squareB, squareC) {
        //these 3 variables check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 vqriqbles we pass are all included in our array then
        //true is returned and our else if condition executes the drawLine() function
        if (a === true && b === true && c === true) {return true;}
    }
}

//this makes body element temporarily unclickable

function disableClick(){
    //this makes body unclickable
    body.style.pointerEvents = 'none';
    //this makes body clickable after 1s
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

//this takes a string parameter of the path you set earlier for
//placement sound
function audio(audioURL) {
    //we create new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays audio sound
    audio.play();
}

//this utilizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //accesses canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //This line indicated start of lines x axis
    let x1 =coordX1,
        y1 = coordY1,
        x2 = coordX2, 
        y2 = coordY2,
        x = x1,
        y = y1;

        //this fucntion interacts with canvas

        function animateLineDrawing(){
            //this variable creates a loop
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            c.clearRect(0,0,608,608);
            c.beginPath();
            c.moveTo(x1,y1);
            c.lineTo(x,y);
            c.lineWidth = 10;
            c.strokeStyle = 'rgba(70, 255 ,33, .8)';
            c.stroke();
            //checks if reached endpoints
            if (x1 <= x2 && y1 <= y2) {
                if (x < x2) { x += 10; }
                if (y < y2) { y += 10; }
                if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop);}
            }
        }

        //clears canvas after win line drawn
        function clear() {
            //starts animation loop
            const animationLoop = requestAnimationFrame(clear);
            //clear canvas
            c.clearRect(0,0,608,608);
            //stop animation loop
            cancelAnimationFrame(animationLoop);
        }
        //disallow click while win sound playing
        disableClick();
        //play win sound
        audio('./media/winGame.mp3');
        //call main animation loop
        animateLineDrawing();
        //this line waits 1s then clears canvas, resets game, and allows clicking again
        setTimeout(function () { clear(); resetGame(); }, 1000);
}

//reset game when tie or win

function resetGame(){
    //this for loop iterates thru each html square element
    for (let i = 0; i < 9; i++){
        //this variable gets the html element i
        let square = document.getElementById(String(i));
        //remove elements background img
        square.style.backgroundImage = '';
    }
    //rests array so empty and can start over
    selectedSquares=[];
}