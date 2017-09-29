(function() {
  "use strict";

  var player1Val = "";
  var player2Val = "";
  var playerTurn = "";
  var boardArray1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var turnCount = 0;
  var square;
  var numberPlayers;
  var playerNameGet1 = "";
  var playerNameGet2 = "";


  window.turn = turn;
  window.startButton = startButton;
  window.start = start;
  window.myForm = myForm;
  window.restartButton = restartButton;
  window.playerChoice = playerChoice;
  window.playerNumber = playerNumber;

  function playerChoice(letter) {

    if (letter == undefined) {
      letter = "o";
    }
    player1Val = letter;
    return player1Val;
  }

  function playerNumber(number) {

    if (number != 1) {
      number = 2;
    } else {
      number = 1;
    }
    numberPlayers = number;
    return numberPlayers;
  }

   function start () {

        var hideBoard = document.getElementById('board');
        hideBoard.style.display = 'block';
        var hideStart = document.getElementById('start');
        hideStart.style.display = 'none';

        if (numberPlayers == 2) {
          playerNameGet1 = document.getElementById("player1Name").value;
          playerNameGet2 = document.getElementById("player2Name").value;

        } else if (numberPlayers == 1) {
          playerNameGet1 = document.getElementById("player1Name").value;
          playerNameGet2 = "Master Control Program(MCP)";

        } else {
          alert("not getting the playerVal1");
        }

          if (player1Val === "x") {
            document.getElementById("play1").innerHTML = playerNameGet2;
            document.getElementById("play2").innerHTML = playerNameGet1;
            document.getElementById("player2").classList.add("active");
            playerTurn = "x";
            player2Val = "o";

          } else if (player1Val === "o") {
            document.getElementById("play1").innerHTML = playerNameGet1;
            document.getElementById("play2").innerHTML = playerNameGet2;
            document.getElementById("player1").classList.add("active");
            playerTurn = "o";
            player2Val = "x";
        }
}

   function init(){

    var hideFinish = document.getElementById('finish');
    hideFinish.style.display = 'none';
    var hideBoard = document.getElementById('board');
    hideBoard.style.display = 'none';
  }

  function turn(square) {

    if (numberPlayers == 1 && turnCount % 2 == 0) {

      if (!square.classList.contains("box-filled-o")  && !square.classList.contains("box-filled-x")) {

        switchTurn(square);
      } else {
        alert("Pick another square.");
      }
    } else if (numberPlayers == 1 && turnCount % 2 !== 0) {

      switchTurn(computerPlayer());
    } else if (numberPlayers == 2) {
      if (!square.classList.contains("box-filled-o")  && !square.classList.contains("box-filled-x")) {

        switchTurn(square);
      } else {
        alert("Pick another square.");
      }
    }
  }

  function switchTurn(square) {
    if(!square)
    {
      return;
    }
    console.log("square inside switchTurn  ", square);
    console.log("inside switchTurn. playerTurn ", playerTurn);
    console.log("inside switchTurn. player1Val ", player1Val);
    console.log("inside switchTurn. player2Val ", player2Val);
    turnCount++;

      if (playerTurn === "x" && player1Val === "x") {
        console.log('playerTurn === "x" && player1Val === "x"');
        document.getElementById("player2").classList.remove("active");
        document.getElementById("player1").classList.add("active");
        square.classList.add("box-filled-x");
    } else if (playerTurn === "x" && player2Val === "x") {

        console.log('playerTurn === "x" && player2Val === "x")');
        document.getElementById("player2").classList.remove("active");
        document.getElementById("player1").classList.add("active");
        square.classList.add("box-filled-x");

    } else if (playerTurn === "o" && player1Val === "o") {
        console.log('playerTurn === "o" && player1Val === "o")');
        document.getElementById("player1").classList.remove("active");
        document.getElementById("player2").classList.add("active");
        square.classList.add("box-filled-o");

    } else if (playerTurn === "o" && player2Val === "o") {
        console.log('playerTurn === "o" && player2Val === "o"');
        document.getElementById("player1").classList.remove("active");
        document.getElementById("player2").classList.add("active");
        square.classList.add("box-filled-o");

    } else {

         alert("switchTurn has a problem");
     }


     if(numberPlayers == 1 && player1Val == playerTurn) {

        setTimeout(function() {
         var squareId = square.id;
         var boxNum = squareId.slice(-1);

         boxNum = Number(boxNum);
         var index = boardArray1.indexOf(boxNum);
         console.log("squareId, boxNum, index", squareId, boxNum, index);
         boardArray1.splice(index, 1);
         console.log("boardArray1 inside switchTurn", boardArray1);
          checkResultOfMove(turn);
      }, 1000);
     }
     else {
       console.log("inside else of switchTurn");
       checkResultOfMove(turn);
     }
   }

   function checkResultOfMove(turn) {
     console.log("inside checkResultOfMove() seeing playerTurn ", playerTurn);
     if (getWinner(playerTurn)){

       displayWinner(playerTurn);
     }  else if (turnCount >= 9) {

       displayTie();
     }

    if (playerTurn == "x") {


      playerTurn = "o";
      turn();
      if(player2Val == "o" && numberPlayers == 1 &&  player2Val == playerTurn){
        turn();

      }
    } else if (playerTurn == "o") {
      playerTurn = "x";
      turn();
      if(player2Val == "x" && numberPlayers == 1 &&  player2Val == playerTurn){
        turn();
      }
    }

  }

  function computerPlayer(playerTurn) {
    if(boardArray1.length == 0)
    {
      return;
    }

    var ind = Math.floor(Math.random() * boardArray1.length);
    var index = boardArray1[ind];
    var def = "box-" + index;
    square = document.getElementById(def);
    boardArray1.splice(ind, 1);
    return square;
  }

  function getWinner (turn) {
    var result = false;
    if (checkRow(0, 1, 2, turn) ||
        checkRow(3, 4, 5, turn) ||
        checkRow(6, 7, 8, turn) ||
        checkRow(0, 3, 6, turn) ||
        checkRow(1, 4, 7, turn) ||
        checkRow(2, 5, 8, turn) ||
        checkRow(0, 4, 8, turn) ||
        checkRow(2, 4, 6, turn)
        ) {
      result = true;
    }
    return result;
  }

  function checkRow (a, b, c, turn) {

    var result = false;
    if(getBox(a) == turn && getBox(b) == turn && getBox(c) == turn) {
      result = true;
    }

    return result;
  }

  function getBox(number) {
    var def = "box-" + number;
    if (document.getElementById(def).classList.contains("box-filled-x")) {
      return "x";
    } else if (document.getElementById(def).classList.contains("box-filled-o")) {
      return "o";
    }
  }

  function displayWinner (turn) {
      console.log("Winner is player " + turn);
      var showFinish = document.getElementById('finish');
      showFinish.style.display = 'block';
      var hideBoard = document.getElementById('board');
      hideBoard.style.display = 'none';

      if (playerTurn == "x") {
        document.getElementById("finish").classList.add("screen-win-x");
      } else if (playerTurn == "o") {
        document.getElementById("finish").classList.add("screen-win-o");
      }
  }

  function displayTie () {
    console.log("inside displayTie()");
    document.getElementById("finish").classList.add("screen-win-tie");
    var showFinish = document.getElementById('finish');
    showFinish.style.display = 'block';
    var hideBoard = document.getElementById('board');
    hideBoard.style.display = 'none';

  }


  function restartButton() {
    var hideFinish = document.getElementById('finish');
    hideFinish.style.display = 'none';
    document.getElementById("finish").classList.remove("screen-win-o");
    document.getElementById("finish").classList.remove("screen-win-x");
    document.getElementById("player1").classList.remove("active");
    document.getElementById("player2").classList.remove("active");
    turnCount = 0;
    boardArray1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    start();

    for(var j = 0; j < 9; j++) {
      var def = "box-" + j;
      document.getElementById(def).classList.remove("box-filled-x");
      document.getElementById(def).classList.remove("box-filled-o");
      document.getElementById(def).classList.remove("box-unfilled-o");
      document.getElementById(def).classList.remove("box-unfilled-x");

    }
  }

  init();
  playerChoice();
  playerNumber();


    var hoverObj = document.getElementsByClassName("box");

    for (var i = 0; i < hoverObj.length; i++) {
      hoverObj[i].addEventListener("mouseover", myHover);
      hoverObj[i].addEventListener("mouseout", myOutHover);
    }

    function myHover (){
       if(!this.classList.contains("box-filled-x") && !this.classList.contains("box-filled-o")){
         if (playerTurn == "o") {
          this.classList.add("box-unfilled-o");
        } else {
          this.classList.add("box-unfilled-x");
        }
      }
    }

    function myOutHover() {
      console.log("inside the mtOutHover event listener");
      if(!this.classList.contains("box-filled-x") && !this.classList.contains("box-filled-o")){
       if(this.classList.contains("box-unfilled-x")) {
         this.classList.remove("box-unfilled-x");
       }
       if(this.classList.contains("box-unfilled-o")) {
         this.classList.remove("box-unfilled-o");
       }
      }
     }

}());
