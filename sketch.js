
var database;
var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var score = 0;
var xDistance = 0;
var yDistance = 0;

var form, player, game;
var player1, player2, players; 
var form_img;
var ball, ball_img;
var reset;
var ground_img, red_img, blue_img;
var player1score =0;
var player2score =0;
var edges;
var position;



function preload(){
  

  form_img = loadImage("images/background.jpg");
  ground_img = loadImage("images/ground_2.png"); 
  red_img = loadImage("images/red-player.png");
  blue_img = loadImage("images/blue-player.png");
  ball_img = loadImage("images/ball.png");

}

function setup(){

  canvas = createCanvas(displayWidth - 21, displayHeight - 115);

  database = firebase.database();
  
  game = new Game(); 
  game.getState()
  game.start();
}


function draw(){
  background(form_img);

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
