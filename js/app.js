(function() {
  "use strict";

  var player1Val = "ddd";
  var player2Val = "eee";
  var playerTurn = "111";
  var boardArray1 = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
  window.turn = turn;
  window.startButton = startButton;
  window.start = start;
  window.myForm = myForm;


   function start () {
      var clickStartButton = document.getElementById('startButton');
      clickStartButton.addEventListener("click", function (event){
        var hideBoard = document.getElementById('board');
        hideBoard.style.display = 'block';
        var hideStart = document.getElementById('start');
        hideStart.style.display = 'none';
        player1Val = document.querySelector('input[name=player][checked]').value;
        console.log("player1Val  ", player1Val);
        var playerNameGet1 = document.getElementById("player1Name").value;
        var playerNameGet2 = document.getElementById("player2Name").value;
        console.log("playerNameGet1  ", playerNameGet1);

        if (player1Val === "x") {
          document.getElementById("play1").innerHTML = playerNameGet2;
          document.getElementById("play2").innerHTML = playerNameGet1;
          document.getElementById("player1").classList.add("active");
          playerTurn = "o";

          player2Val = "o";
            //console.log("player1Val  ", player1Val);
            //console.log("player2Val  ", player2Val);
        } else if (player1Val === "o") {
          document.getElementById("play1").innerHTML = playerNameGet1;
          document.getElementById("play2").innerHTML = playerNameGet2;
          document.getElementById("player1").classList.add("active");
          playerTurn = "x";
          //console.log("player1Val  ", player1Val);

          player2Val = "x";
          //console.log("player2Val  ", player2Val);
        } else {
          alert("not getting the playerVal1");
        }
      });
}


   function init(){
    console.log("inside game.init");
    var hideFinish = document.getElementById('finish');
    hideFinish.style.display = 'none';
    var hideBoard = document.getElementById('board');
    hideBoard.style.display = 'none';
  }

  function turn (square) {
    //square.classList.add("box-filled-x");
    if (!square.classList.contains("box-filled-o")  && !square.classList.contains("box-filled-o")) {
    console.log(square);
    switchTurn(square);
  } else {
    alert("Pick another square.");
  }
  }

  function switchTurn(square) {
    console.log("inside switchTurn. playerTurn ", playerTurn);
    console.log("inside switchTurn. player1Val ", player1Val);
    console.log("inside switchTurn. player2Val ", player2Val);
    if (playerTurn === "x" && player1Val === "x") {
      document.getElementById("player1").classList.add("active");
      document.getElementById("player2").classList.remove("active");
      square.classList.add("box-filled-o");

      playerTurn = "o";
    } else if (playerTurn === "x" && player2Val === "x") {
      document.getElementById("player2").classList.add("active");
      document.getElementById("player1").classList.remove("active");
      square.classList.add("box-filled-o");
        playerTurn = "o";
    } else if (playerTurn === "o" && player1Val === "o") {
      document.getElementById("player1").classList.add("active");
      document.getElementById("player2").classList.remove("active");
      square.classList.add("box-filled-x");
      playerTurn = "x";
    } else if (playerTurn === "o" && player2Val === "o") {
      document.getElementById("player2").classList.add("active");
      document.getElementById("player1").classList.remove("active");
      square.classList.add("box-filled-x");
      playerTurn = "x";
    } else {
      alert("switchTurn has a problem");
    }
  }




  init();
  start();

}());
