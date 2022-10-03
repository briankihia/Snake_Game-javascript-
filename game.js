// this is where our base javascript is going to go
// the code in here is going to be exported thus in our index.html we should refer to it as a module
// we are going to divide our javascript to enable re-usability of our code and to make it easily understandable

// the first thing we need to do is set up a game loop
// this is a function that is going to repeat itself over and over at a set interval that way u can constantly update your render
// ie here we update position length of the snake and also positioning of the food

// to do this we first create  a function main that takes in the current time ie the exact timestamp when this function runs


import {update as updateSnake,draw as drawSnake, SNAKE_SPEED,getSnakeHead, SnakeIntersection} from './snake.js'
// we initially set it to 2.This is going to be how many times the snake moves per second.It is going to move 2 times per second


import {update as updateFood, draw as drawFood} from './food.js'

import {outsideGrid} from './grid.js'

let lastRenderTime = 0
// we have set it by default to zero

let gameOver = false




// 7. 

const gameBoard = document.getElementById('game-board')
// upto this 7th step our snake has popped up.Now we focus on how to get our snake moving
// go to snake.js step 8

function main(currentTime) {
    // inside this function we are going to have that current time and then we are going to recall this main function essentially immediately so that way we can set up another loop that is going to happen after this
    // essentially our main function is going to loop over and over again forever ie that is the purpose of a game loop

    // 31.

    // in this if we use return to avoid the rest of our code from running after losing

    if(gameOver) {
      return alert('you lose')
    }

    // after here we go to grid.js and we implement the function outsideGrid




    // we are getting current time from this window.requestAnimationFrame
    window.requestAnimationFrame(main)
    // what this does is that it asks the browser when it can actually render its next frame
    // requesting a frame to animate the game

    // this function is going to tell what the current time is when we actually go to render that frame
    // it is going to say okay...I want to render a frame and it's going to wait till it can render a frame then it is going to call our main function with the currentTime stamp of when that frame is going to render
    // it prints out the time from when we initially decided to run our window.requestAnimationFrame
    // it is just constantly counting up in milliseconds

    // in order to take advantage of that we want to know how long it's been since the last time we rendered so we create variable lastRenderTime



    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    // we have 67 milliseconds of delay btw each one of our rendered frames
    // with our game we don't need to run that fast, we don't need to update the snakes position every millisecond
    //so in order to update the snakes position,instead of running this every millisecond or every 6 millisecond,we are going to essentially not do anything in our main function unless we hit a certain threshHold.We are going to call that our snake speed

    // in order to calculate if we actually need to move,all we need to do is check if the secondsSineLastRender is essentially less than the time between our renders
    
    if(secondsSinceLastRender < 1/SNAKE_SPEED) return 
    // since our snake moves 2times per second ie this is half a second between each move
    // if the time Since last Render is less than 1/2 second,we don't need to move our snake

    // NB. upto here something is rendered twice after every second
    
    // now here we update our lastRenderTime which will store the currentTime thus we will always be having a new lastRenderTime


    // we only update our last render time if our if statement above happens
    lastRenderTime = currentTime

    // here now we get the time in seconds since our lastRender

    
    // we divide by a 1000 because it is initially in milliseconds and we want the result to be in seconds
    // we position this before requestAnimationFrame for it to work  effectively
    // NB. positioning of the code matters


    // now that we have all this render code set up,now we concentrate on our game logic
    // NB. every game you work on is always going to be broken down into two different steps ie  update() which will update all the logic for your game and draw() or render.This is the one that is going to draw everything on the screen based on update()

    // update loop will move the snake to the correct position but not actually draw it
    // it is going to update if we ate the food or not so it is going to make the snake longer or shorter
    // it is also going to determine if we lost the game if we ran into our own tail or ran into our own tail or edge of screen.
    update()

    // with draw what we will do is take all the logic from update and determine the position of our snake then it actually draws him in the correct position
    // also draws where the food needs to go
    draw()

}

window.requestAnimationFrame(main)

// with each one of this all we need to do is update our food and then draw our food
// before we add this to our functions,lets create a new file and call it snake.js
// inside our update and draw function we include updateSnake and drawSnake functions which are for updating and drawing the snake not food
function update() {
  updateSnake()

  updateFood()

  // 29.
  checkDeath()
  // now we go below page and create that function
}


function draw() {
  // 13.
  // here we are going to take our gameBoard and set the innerHtml to nothing so that it stops showing where our snake last been

  gameBoard.innerHTML = ''

  // upto here the snake moves without showing last where it been
  // upto this part the snake is moving perfectly how we want it to even if you go to our 12th step and change it to move in the y axis you will be able to see that
  // from here we create an input.js file

    // 6. we pass in parameter gameBoard
    drawSnake(gameBoard)
    // now go to top of page

    drawFood(gameBoard)
}


// 30.

function checkDeath() {
  // in this function we create a gameOver variable that checks if snake is outsideGrid or snake ran over its Intersection
  // in outsideGrid we want to check if the head of our snake is outside thus we add getSnakeHead as an argument
  gameOver = outsideGrid(getSnakeHead()) || SnakeIntersection()
  // from here we declare this gameOver variable at the top of our page as false
  // after that we go to our main function and work on gameOver
}
