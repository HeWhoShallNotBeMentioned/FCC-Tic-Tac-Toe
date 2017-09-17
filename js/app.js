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
  console.log("playerNameGet1  ", playerNameGet1);

  window.turn = turn;
  window.startButton = startButton;
  window.start = start;
  window.myForm = myForm;
  window.restartButton = restartButton;
  window.playerChoice = playerChoice;
  window.playerNumber = playerNumber;

  function playerChoice(letter) {
    console.log("letter from player choice", letter);
    if (letter == undefined) {
      letter = "o";
    }
    player1Val = letter;
    return player1Val;
  }

  function playerNumber(number) {
    console.log("Number from playerNumber ", number);
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
        console.log("number of players ", numberPlayers);
        console.log("player1Val  ", player1Val);
        if (numberPlayers == 2) {
          playerNameGet1 = document.getElementById("player1Name").value;
          playerNameGet2 = document.getElementById("player2Name").value;
          console.log("playerNameGet1  ", playerNameGet1);
        } else if (numberPlayers == 1) {
          console.log("inside else if players = 1");

          playerNameGet1 = document.getElementById("player1Name").value;
          playerNameGet2 = "Master Control Program(MCP)";
          console.log("playerNameGet1  ", playerNameGet1);

        } else {
          alert("not getting the playerVal1");
        }




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
      document.getElementById(def).style.backgroundImage = "none";
    }
  }

  init();
  playerChoice();
  playerNumber();

  //console.log("square within function ", square);
    var hoverObj = document.getElementsByClassName("box");
  //console.log("hoverObj  ", hoverObj);


    for (var i = 0; i < hoverObj.length; i++) {
      hoverObj[i].addEventListener("mouseover", myHover);
      hoverObj[i].addEventListener("mouseout", myOutHover);
    }

    function myHover (){
      //console.log("inside the myHover event listener");
      //console.log("i  ", i);
       if(!this.classList.contains("box-filled-x") && !this.classList.contains("box-filled-o")){
         if (playerTurn == "o") {
          this.style.backgroundImage = "url('./img/o.svg')";
        } else {
          this.style.backgroundImage = "url('./img/x.svg')";
        }
      }
    }

    function myOutHover() {
      console.log("inside the mtOutHover event listener");
      if(!this.classList.contains("box-filled-x") && !this.classList.contains("box-filled-o")){
       this.style.backgroundImage = "none";
      }
     }

}());



// [].forEach.call(document.querySelectorAll('nav > ul > li a'), function (link) {
//     link.addEventListener('mouseover', coloringHandler);
//     link.addEventListener('mouseout', decoloringHandler);
// });
//
// function coloringHandler() {
//     this.dataset.initialInlineColor = this.style.color;
//     this.style.color = 'red';
// }
//
// function decoloringHandler() {
//     this.style.color = this.dataset.initialInlineColor;
// }
//
// //function hover() {
//   console.log("square within function ", square);
//     var hoverObj = document.getElementsByClassName("box");
//   console.log("hoverObj  ", hoverObj);
//     //hoverObj.onmouseover = function(){};
//
//     for (var i = 0; i < hoverObj.length; i++) {
//       hoverObj[i].addEventListener("mouseover", myHover);
//       hoverObj[i].addEventListener("mouseout", myOutHover);
//     }
//
//     function myHover (){
//       console.log("inside the myHover event listener");
//       console.log("i  ", i);
//       this.style.backgroundImage = "url('./img/o.svg')";
//       // if (!hoverObj.hasClass('box-filled-o') && !hoverObj.hasClass('box-filled-x') &&
//       //   playerTurn == "o") {
//       //   hoverObj[i].style.backgroundImage = "url('./img/o.svg')";
//       // }
//     }
//
//     function myOutHover() {
//       console.log("inside the mtOutHover event listener");
//     //   console.log("i  ", i);
//        hoverObj[i].style.backgroundImage = "none";
//      }
// //}
