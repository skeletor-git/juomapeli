var players = ['Jere','Kati'];
var number_of_rounds = 50;
var max_difference_between_players_amount = 5;
var max_amount_of_drinks_at_once = 5;
var play = 0;
var players_amount = Array.apply(null, new Array(players.length)).map(Number.prototype.valueOf,0);
var empty = [0]; 

  function updatelist()
  {
    $('#pelaajat').html('');
    for(var i = 0;i < players.length;i++)
    {
      var pelaaja_teksti = "<a>" + players[i] +" "+ players_amount[i]+ " " + "</a>";
      $("#pelaajat").append(pelaaja_teksti);
    }
  }
    //Uusi pelaaja
    function newplayer()
    {
      document.getElementById('id01').style.display='none'
      var nameValue = document.getElementById("uuspelaaja").value;
      if (nameValue != '')
      {
        players.push(nameValue);
        players_amount.push(0);
        updatelist();
      }
    }
    $(document).keypress(
      function(event){
       if (event.which == '13') {
        newplayer();
        event.preventDefault();
      }
    });

    //Puhe
    function speak(teksti)
    {
      responsiveVoice.speak(teksti,'Finnish Female');
      $("#text_line").text(teksti);
    }

    //juomafunktiot
    function drink(player)
    {
      var amount = Math.floor((Math.random() * max_amount_of_drinks_at_once) + 1);
      players_amount[player] = players_amount[player] + amount;
      line = players[player] + " juo " + amount.toString();
      speak(line);
      
    }

    function all_drink()
    {
    	var amount = Math.floor((Math.random() * max_amount_of_drinks_at_once) + 1);
    	for(var i = 0;i < players_amount;i++)
      {
        players_amount[i] = players_amount[i] + amount;
      }
      line = 'Kaikki juo ' + amount.toString();
      speak(line);
    }
    //Kuka juo vai kaikki juo
    function round()
    {
      var jackpot = Math.floor((Math.random() * 15) + 1);
      //all drink
      if (jackpot == 1){all_drink();}
      //one drink
      else
      {
        if (Math.max.apply(Math, players_amount) - Math.min.apply(Math, players_amount) > max_difference_between_players_amount)
        {
          player = players_amount.indexOf(Math.min.apply(Math, players_amount));
          
        }
        else
        {
         player = Math.floor((Math.random() * players.length) + 0);
         
       }
       drink(player);
     }
     updatelist();
   }

   function playGame()
   {
    speak("Juomapeli alkaa");

    
    var time_between_drinks = 5;

    for(var rounds = 0;rounds < number_of_rounds;rounds++)
    {
        empty.push(setTimeout(round, time_between_drinks*1000));
        time_between_drinks += Math.floor((Math.random() * 20) + 20);
    }

  }
  function stopGame(){
    for(var rounds = 0;rounds < number_of_rounds;rounds++)
    {
      clearTimeout(empty[rounds]);
    } 
    speak('Peli päättyi');
    players_amount = Array.apply(null, new Array(players.length)).map(Number.prototype.valueOf,0);
  }



  $(document).ready(function(){
    updatelist();
    $("#text_line").text("Kivoja tupareita <3");
  });

