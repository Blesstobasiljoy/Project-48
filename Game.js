class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();

      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }

   
    player1 = createSprite(680, 190);
    player1.addImage("player1", red_img);
    player1.scale = 0.2;

    player2 = createSprite(680,470);
    player2.addImage("player2",blue_img);
    player2.scale = 0.2;

    players = [player1,player2];

    ball = createSprite(680,325);
    ball.addImage("ball",ball_img);
    ball.velocityX = 5;
    ball.scale = 0.2;
   
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined)
    {
      background(ground_img);

      var x = 0;
      var y = 0;
      var index = 0;
      var yPosition = displayHeight / 2 - 200;

      drawSprites();

      for(var plr in allPlayers){

        // console.log(yPosition);

        index = index + 1 ;

        x = 680 - allPlayers[plr].xDistance;
        y = yPosition - allPlayers[plr].yDistance;

        
        players[index-1].x = x;
        players[index-1].y = y;

        if(index === player.index)
        {   
            fill("black");
            textSize(25);
            text(allPlayers[plr].name , x-25, y+25);
        }
         
        
        textSize(25); 
        fill("white");

        text("Player 1: " + allPlayers.player1.score, 50, 60);
        text("Player 2: " + allPlayers.player2.score, 50, 100);

        yPosition = yPosition + 300;
       
      }

      if(keyIsDown(UP_ARROW) && player.index !== null)
      {
          player.xDistance;
          player.yDistance +=10
          player.update();
      }

      if(keyIsDown(DOWN_ARROW) && player.index !== null)
      {
         player.xDistance;
         player.yDistance -=10
         player.update();
      }
     
      if (keyIsDown(RIGHT_ARROW) && player.index !== null) 
      {
          player.xDistance -= 10
          player.yDistance;
          player.update();
      }

      if (keyIsDown(LEFT_ARROW) && player.index !== null) 
      {
        player.xDistance += 10
        player.yDistance;
        player.update();
      }

      // if(position !== undefined){

      //   if(keyDown(LEFT_ARROW)){
      //       writePosition(-1,0);
      //   }
      //    else if(keyDown(RIGHT_ARROW)){
      //       writePosition(1,0);
      //   }
      //   else if(keyDown(UP_ARROW)){
      //       writePosition(0,-1);
      //   }    
      //   else if(keyDown(DOWN_ARROW)){
      //       writePosition(0,1);
      //   } 

      // }

      // if(ball.isTouching(players)){
      //   player.bounceOff(ball);
      //   player.update();
      // }  

     edges = createEdgeSprites();
     ball.bounceOff(edges[0]);
     ball.bounceOff(edges[1]);
     ball.bounceOff(edges[2]);
     ball.bounceOff(edges[3]);
      //  ball.bounceOff(player.index !== null);

      player1.bounceOff(edges[0]);
      player1.bounceOff(edges[1]);
      player1.bounceOff(edges[2]);
      player1.bounceOff(edges[3]);


      var location = database.ref('ball/position');
      location.on("value",readPosition, showError);


      function writePosition(x,y){
        database.ref('ball/position').set({
            'x': position.x + x,
            'y': position.y + y
  
        })
      }

      function readPosition(data){
        position = data.val();
  
        ball.x = position.x;
        ball.y = position.y;
      }

      function showError()
      {
          console.log("ERROR");
      }
    }
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
