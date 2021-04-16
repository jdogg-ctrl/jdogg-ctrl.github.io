var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "enemy", "x": 600, "y": groundY },
                { "type": "award", "x": 900, "y": groundY },
            ]
        };
        
        /*for(var i = 0 ; i < levelData.gameItems.length ; i++){
                var obj = levelData.gameItems[i];
                var objX = obj.x;
                var objY = obj.y;
                var objType = obj.type;
                if(obj.type === "sawblade"){
                    createSawBlade(objX, objY);
                }
                else if(obj.type === "enemy"){
                    createEnemy(objX, objY);
                }
                else(obj,type === "award"){
                    createAward(objX, objY);
                };
        
        }
        */

       

       
        
    
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        

        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        createSawBlade(600, groundY - 101); //1st sawblade
        createSawBlade(950, groundY - 101); //2nd
        createSawBlade(1350, groundY - 101); //3rd
        createSawBlade(2050, groundY - 101); //4th
        
    
        

        function createEnemy(x,y){
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -redSquare.width / 2;
        redSquare.y = -redSquare.width / 2;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            enemy.fadeOut();
        };
        enemy.onProjectileCollision = function(){
            console.log('Hallie has hit the enemy');
            game.increaseScore(10);
            enemy.shrink();
        };
        game.addGameItem(enemy);
     }
        createEnemy(600, groundY - 15);
          
        function createAward(x, y){
            var award = game.createGameItem('game', 25);
            var blueSquare = draw.rect(50,50,'blue');
            blueSquare.x = -blueSquare.width / 2;
            blueSquare.y = -blueSquare.width / 2;
            award.addChild(blueSquare);
            award.x = x;
            award.y = y;
            award.velocityX = -1;
            award.rotationalVelocity = 10;
            award.onPlayerCollision = function(){
                console.log('The reward has hit Halle');
                game.changeIntegrity(20);
                award.fadeOut();
            };
            game.addGameItem(award);
        }
           createAward(615, groundY - 25);
        // DO NOT EDIT CODE BELOW HERE
    }
}


// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
