(function() {
  "use strict";

  var player1Val = "";

  var game = {
    init: function() {
      console.log("inside game.init");
      var hideFinish = document.getElementById('finish');
      hideFinish.style.display = 'none';
      var hideBoard = document.getElementById('board');
      hideBoard.style.display = 'none';
    },

    start: function() {
      var clickStartButton = document.getElementById('start-button');
      clickStartButton.addEventListener("click", function (){
        var hideBoard = document.getElementById('board');
        hideBoard.style.display = 'block';
        var hideStart = document.getElementById('start');
        hideStart.style.display = 'none';


        //console.log("currentValue", currentValue);
        // var player1Val = document.querySelector('input[name=player][checked]').value;
        console.log("player1Val  ", player1Val);
        var playerNameGet1 = document.getElementById("player1Name").value;
        var playerNameGet2 = document.getElementById("player2Name").value;
        if (player1Val === "x") {
          document.getElementById("play1").innerHTML = playerNameGet2;
          document.getElementById("play2").innerHTML = playerNameGet1;
        } else {
          document.getElementById("play1").innerHTML = playerNameGet1;
          document.getElementById("play2").innerHTML = playerNameGet2;
          player1Val = "o";
          console.log("player1Val  ", player1Val);
        }
      });
    }
  };

  var rad = document.myForm.player;
  var prev = null;
  for(var i = 0; i < rad.length; i++) {
      rad[i].onclick = function() {
          (prev)? console.log("prev.value  ", prev.value):null;
          if(this !== prev) {
              prev = this;
          }
          console.log("this.value  ",this.value);
          player1Val = this.value;
          return player1Val;
      };

  }

  game.init();
  game.start();
}());
