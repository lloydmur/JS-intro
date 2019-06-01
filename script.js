var NSJam = NSJam || {}; //namespace
/*GAME */
 window.addEventListener('load', function(){

   var enemies = [
         {
          x: 600, //x coordinate
          y: randInt(0,260), //y coordinate
          speedX: -randInt(5,10), //speed in X
          w: randInt(20,40), //width
          h: randInt(20,40), //heght
          ready: true
         }
       ];
   var player = function() {
     this.x = 100;
     this.y = 150;
     this.speedX = 2;
     this.speedY = 0;
     this.maxSpeedY = 6;
     this.jumpSpeed = 10;
     this.gravity = 0.5;
     this.w = 40;
     this.h = 40;
     this.isMoving = false;
   };
   var goal = {
     x: 500,
     y: 150,
     w: 50,
     h: 40
   };
   var gameOver = false;
   var sprites = {};
   var score = 0;

   var GAME_WIDTH = 600;
   var GAME_HEIGHT = 300;
   var canvas = document.getElementById("mycanvas");
   var ctx = canvas.getContext("2d");
   ctx.font = "30px Arial";

   var boxo = new player();
   canvas.addEventListener("mousedown", boxoJump);
   canvas.addEventListener("touchstart", boxoJump);




   enemies[0].ready = true;
   var updatePositions = function(){
    updatePlayer();
    for(var i = 0; i < enemies.length; i++){
      if(enemies[i].ready){
        enemies[i].x += enemies[i].speedX;
      }
    }
  };
   /*Functions*/
   function load(){
     sprites.player = new Image();
     sprites.player.src = 'images/hero.png';
     sprites.bg = new Image();
     sprites.bg.src = 'images/floor.png';
     sprites.en = new Image();
     sprites.en.src = 'images/enemy.png';
     sprites.g = new Image();
     sprites.g.src = 'images/chest.png';
   };
   function boxoJump(){
    boxo.speedY = -boxo.jumpSpeed;
    delete boxo;
   }
   function updatePlayer(){
     if(boxo.speedY < boxo.maxSpeedY){
       boxo.speedY += boxo.gravity;
      }
      else{
        boxo.speedY = boxo.maxSpeedY;
      }
     if(boxo.y >= 260){
       boxo.y = 260;
       boxo.y += boxo.speedY;
     }
     else{
       boxo.y += boxo.speedY;
     }
     if(boxo.y <= 0){
       boxo.y = 0;
       boxo.speedY = 0;
       boxo.y += boxo.speedY;
     }
   }
   function checkCollision(obj1, obj2){
   var w = Math.abs(obj1.x - obj2.x) <= Math.max(obj1.w, obj2.w);
   var h = Math.abs(obj1.y - obj2.y) <= Math.max(obj1.h, obj2.h);
   return w && h;
   }
   function checkPass(obj){
     if((obj.x + obj.w) <= 0){
       score++;
       obj.x = 600;
       obj.y = randInt(0,260);
       obj.speedX = -randInt(5,10) - (0.5*score);
       obj.w = randInt(20,50); //width
       obj.h = randInt(20,50); //heght
       obj.ready = true;

     }
   }
   function randInt(min, max){
     min = Math.ceil(min);
     max = Math.floor(max);
     var pos = (Math.floor(Math.random() * (max - min)) + min)
     return pos;
   };

   var draw = function(){
     ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
     //Draw  BG:
     //ctx.drawImage(sprites.bg, 0, 0);

      /*Draw Goal*/
     //ctx.drawImage(sprites.g,goal.x, goal.y);
     /* Draw player*/
     //ctx.drawImage(sprites.player,player.x, player.y);
     ctx.fillStyle = "#884422";
     ctx.fillRect(boxo.x, boxo.y, boxo.w, boxo.h);
     /*enemy movement*/
     for(var i = 0; i < enemies.length; i++){
       //ctx.drawImage(sprites.en, enemies[i].x, enemies[i].y);
       ctx.fillStyle = "red";
       ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h)
     }
     /*Draw score label*/
     ctx.fillStyle = "white";
     ctx.fillText("Score: "+ score, 10, 30);
   //  });
   };
   var step = function(){
     updatePositions();
     draw();
     for(var i = 0; i < enemies.length; i++){
       checkPass(enemies[i]);
       if(checkCollision(boxo, enemies[i])){
         gameOver = true;
         alert("Game Over!\n" + "Score: "+score);
         window.location = "";
       }
     }
     if(!gameOver){
      window.requestAnimationFrame(step);
     }

   };
   load();
   step();
 });
 /*
 //Arrays
 var shoppingList = new Array();
 var shoppingList2 = ['bread', 'corn', 'more corn'];

 console.log(shoppingList2);
 shoppingList2[0] = 'even more corn';
 console.log(shoppingList2);
 var enemies = [
   {x:10, y: 10, color: 'red'},
   {x:20, y:20, color: 'blue'}
 ];
 var junk = [1, 'stuff', 22.22, {name: 'hi'}, {hp: 12}];
 console.log(junk.length);
 junk.push("knife", "laser");
 console.log(junk);
 junk.pop();
 console.log(junk);
 junk.splice(1, 3, "bow", "Sword"); //index 1, remove 3 elements add bow and sword
 console.log(junk);

 var enemies = [
   {x: 10, y: 50, hp: 100},
   {x: 20, y: 50, hp: 50},
   {x: 30, y: 50, hp: 1000},
   {x: 40, y: 50, hp: 10},
 ];

 var player = {
   name: "Rozen",
   hp: 1000,
   weapons: ["katana", "gun"],
   addWeapon: function(newWeapon){
     this.weapons.push(newWeapon);
     console.log(player.weapons);
   }
 };
 player.addWeapon("Dual Blades");
 console.log(player);
 function convert(num){
   var c = num * 100;
   return c;
 }
 var a = 2;
 console.log(convert(a));

 var fun = function(){
   console.log('This is fun');
 }
 player.addWeapon = fun; //function assignemnt expression
 player.addWeapon();   // function call

 player.addWeapon = function(newWeapon){
   this.weapons.push(newWeapon);
 }
 player.addWeapon("Spade");

 */
