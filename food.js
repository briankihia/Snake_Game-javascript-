// inside of here we are going to the same thing we've done to snake
// we will have an update and a draw function
// 20.

// we create  a food position which will be initially at 0 position for both x and y 
// after here we go to our game.js and import this functions


import {onSnake, expandSnake } from './snake.js'

import {randomGridPosition } from './grid.js'


// NB. css grid starts at 1 not 0
let food = getRandomFoodPosition()


// 21.
// now we work on what need to happen when the snake eats the food
// what we need to do is set up some form of expansion rate(this will show how much the snake grows when it eats the food)

const EXPANSION_RATE = 1
// here we have set it to one for now meaning it grows with only on segment when it eats a each piece of food
// now we go inside our update down here


export function update() {
    // our update function here will be a lot different from our snake

    // 22.
    // inside our update we want to check if this snake is currently over top of our food because that means that they can eat it
    // we are going to create a function onSnake which checks if our snake is on top of our food

    if (onSnake(food)) {
        // if the snake is on the food it returns true
        // if it is on top of our food then we want to execute some code to eat the food
        // so firstly we want to expand our snake (increase it's size by 1 ) thus we call a function expandSnake
        //we are going to expand it by the expansion rate which we have set it to 1

        expandSnake(EXPANSION_RATE)
        // after this we want to set our food to a new position

        // 23.
        // at first we are going to hard code this to 20 x and y of 10
        //after this we are going to create the onSnake and expandSnake functions below

        food = getRandomFoodPosition()
    }


}




export function draw(gameBoard) {
    


        const foodElement = document.createElement('div')
       
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x

    

        foodElement.classList.add('food')


        gameBoard.appendChild(foodElement)

}

// 28.
// create a function getRandomFood which will randomize the positions of our food

function getRandomFoodPosition() {
    // this is going to return to us a new position for our food every single time it get's eaten and is going to return a position that is not already on the snake 
// that is the most important characteristic of this

let newFoodPosition
// in order to create food that is not on the snake we are going to create a while loop
// whenever our newFoodPosition i equal to null and whenever our food is on the snake already,what we want to do is get a new food position
// we do that by creating a randomGridPosition function which gives us a random x and y position inside our grid.It continuously gives us random positions until it finds one not on the snake
// after here we set our food to our getRandomFoodPosition
while(newFoodPosition == null || onSnake(newFoodPosition)) {
   newFoodPosition = randomGridPosition()
//    this randomGridPosition is going to give us a random x,y value inside the grid
}
return newFoodPosition
// every time this function executes it is going to get us a new food position and if that new food position is already on the snake it is going to get another one and another one.It loops like that forever and it finds a value that is not already on the snake
// after here we set our food variables  to getRandomFoodPosition
// afterwards we now create the randomGridPosition function
// we create grid.js for that
} 


