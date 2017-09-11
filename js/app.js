(function() {
  "use strict";

  var player1Val = "";
  var player2Val = "";
  var playerTurn = "";
  var boardArray1 = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
  var turnCount = 0;

  window.turn = turn;
  window.startButton = startButton;
  window.start = start;
  window.myForm = myForm;
  window.restartButton = restartButton;
  window.playerChoice = playerChoice;

  function playerChoice(letter) {
    console.log("letter from player choice", letter);
    if (letter == undefined) {
      letter = "o";
    }
    player1Val = letter;
    return player1Val;
  }

   function start () {

        var hideBoard = document.getElementById('board');
        hideBoard.style.display = 'block';
        var hideStart = document.getElementById('start');
        hideStart.style.display = 'none';

        console.log("player1Val  ", player1Val);
        var playerNameGet1 = document.getElementById("player1Name").value;
        var playerNameGet2 = document.getElementById("player2Name").value;
        console.log("playerNameGet1  ", playerNameGet1);

        if (player1Val === "x") {
          document.getElementById("play1").innerHTML = playerNameGet2;
          document.getElementById("play2").innerHTML = playerNameGet1;
          document.getElementById("player2").classList.add("active");
          playerTurn = "x";

          player2Val = "o";
            //console.log("player1Val  ", player1Val);
            //console.log("player2Val  ", player2Val);
        } else if (player1Val === "o") {
          document.getElementById("play1").innerHTML = playerNameGet1;
          document.getElementById("play2").innerHTML = playerNameGet2;
          document.getElementById("player1").classList.add("active");
          playerTurn = "o";
          //console.log("player1Val  ", player1Val);

          player2Val = "x";
          //console.log("player2Val  ", player2Val);
        } else {
          alert("not getting the playerVal1");
        }

}


   function init(){
    console.log("inside game.init");
    var hideFinish = document.getElementById('finish');
    hideFinish.style.display = 'none';
    var hideBoard = document.getElementById('board');
    hideBoard.style.display = 'none';
  }

  function turn (square) {
    if (!square.classList.contains("box-filled-o")  && !square.classList.contains("box-filled-x")) {
      //console.log(square);
      switchTurn(square);
    } else {
      alert("Pick another square.");
    }
  }

  function switchTurn(square) {

    console.log("inside switchTurn. playerTurn ", playerTurn);
    console.log("inside switchTurn. player1Val ", player1Val);
    console.log("inside switchTurn. player2Val ", player2Val);
    turnCount++;

      if (playerTurn === "x" && player1Val === "x") {
        //console.log('playerTurn === "x" && player1Val === "x"');
      document.getElementById("player2").classList.remove("active");
      document.getElementById("player1").classList.add("active");
      square.classList.add("box-filled-x");
    } else if (playerTurn === "x" && player2Val === "x") {

      //console.log('playerTurn === "x" && player2Val === "x")');
      document.getElementById("player1").classList.remove("active");
      document.getElementById("player2").classList.add("active");
      square.classList.add("box-filled-x");

    } else if (playerTurn === "o" && player1Val === "o") {
      //console.log('playerTurn === "o" && player1Val === "o")');
      document.getElementById("player2").classList.remove("active");
      document.getElementById("player1").classList.add("active");
      square.classList.add("box-filled-o");

    } else if (playerTurn === "o" && player2Val === "o") {
      //console.log('playerTurn === "o" && player2Val === "o"');
      document.getElementById("player1").classList.remove("active");
      document.getElementById("player2").classList.add("active");
      square.classList.add("box-filled-o");

    } else {
       console.log('problem');
       alert("switchTurn has a problem");
     }

   if (getWinner(playerTurn)){
     console.log('getWinner');
     displayWinner(playerTurn);
   }  else if (turnCount >= 9) {
     console.log('tie');
     displayTie();
   }

    if (playerTurn == "x") {
      console.log('change x to o');
      playerTurn = "o";
    } else if (playerTurn == "o") {
      console.log('change o to x');
      playerTurn = "x";
    }
    console.log("playerTurn end of switchTurn", playerTurn);


  }

  function getWinner (turn) {
    console.log("turn inside getWinner", turn);
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
      console.log("getWinner ", result);
    }
    return result;
  }

  function checkRow (a, b, c, turn) {
    console.log("inside checkRow & turn ", turn);
    // if (turn == "x") {
    //   turn = "o";
    // } else if (turn == "o") {
    //   turn = "x";
    // }
    var result = false;
    if(getBox(a) == turn && getBox(b) == turn && getBox(c) == turn) {
      result = true;
    }
    console.log("checkRow ", result);
    return result;
  }

  function getBox(number) {
    console.log("getBox ", number);
    //console.log(document.getElementById("box-" + number).classList.contains("box-filled-o"));
    var def = "box-" + number;
    if (document.getElementById(def).classList.contains("box-filled-x")) {
      return "x";
    } else if (document.getElementById(def).classList.contains("box-filled-o")) {
      return "o";
    }
    //  else {
    //   alert("There is a problem with getBox");
    // }

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
    start();

    for(var j = 0; j < 9; j++) {
      var def = "box-" + j;
      document.getElementById(def).classList.remove("box-filled-x");
      document.getElementById(def).classList.remove("box-filled-o");
    }

  }

  init();
  playerChoice();

}());
