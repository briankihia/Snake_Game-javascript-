// inside here is where all the code for our snake goes

import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5

let newSegments = 0
// we default the newSegment to zero because by default our snake is not growing



// 1.we create a snake variable  which will be an array of x,y positions because our snake is essentially a bunch of different segments and this segments all are in a particular x,y position on the grid
// the very center of our grid will be at x 11 and y 11.This is where we draw our snake.At the middle of the screen to begin with

const snakeBody = [
    {x: 10, y: 11}
   
   
]
// 8. to move the snake we first need to think of how we can move a 3 segment snake thus inside our snake variable we add two other x, y segments
// we have put x as 10,11,12 thus it is going to be a straight line snake

// 9. if the snake moves up one position  means that it is going to have it's new head right above it's current head ie every of it's body part should move up one step which is an easy step to do
// but what if the snake head moves to the right ie we don't want to move all the body pieces to the right because if we did that the snake is going to move as a whole piece while in reality it is supposed to follow it's head around
// an easy way to get around this problem is that we move its head to the right one and then we move the body piece right behind the head to where the head used to be ,and then we move the body piece behind that one to where the old piece used to be
// so essentially we are just shifting our array up one and then making the head the correct position where we want it to be
// thus inside our update function that is exactly what we are going to do
// we take the position of the given segment and the segment after that is now going to move into that new position


// now inside our snake.js we want update() and draw() functions to update and draw our snake

export function update() {

    addSegments()

    // this happens because our main function is being called per second

    // 15.
    // here we call our getInputDirection Function which gives the snake direction
    // after this we go below this function and update our snake position based on our inputDirection

   const inputDirection = getInputDirection()
   
    

    // 10. here we are going to need a for loop because we want to loop through every segment except for our last segment cause the last segment of our snake is going to essentially disappear
    // the position where the bottom of our snake is ,is never going to have a snake ever so we don't need to worry about that position
    // snakeBody-2 gives us the second to last element in our snake
    // we start from the bottom and work our way up
    for(let i= snakeBody.length-2;i>=0; i--) {
        // 11. inside this loop we are going to take our snakeBody of our i+1 element
        // this is going to be the element before the one we selected
        // so on the very first iteration i is going to equal the second to last element and i + 1 is going to be our last element
        // we take our previous element then set it to our current element.
        // we need to make sure that we set this as a  brand new object.So we are going to spread out this object into a new object so that we don't have reference problems
        // this is going to create a duplicate of our snake at position i and set that snake to our position i+1
        // we are essentially shifting our entire snake so that everything moves forward in position.Moves to where it's parent essentially is in the snakes body

        snakeBody[i+1] = {...snakeBody[i]}
    }

    // 12.
    // now we update the head based on where we are moving
    // we are going to update the head by adding some kind of movement
    // for now we just move to the right thus change in x but no change in y
    // here -1 for y will move up and +1 will move the snake down

    // snakeBody[0].x += 0
    // snakeBody[0].y += 1
    // upto here we can see the snake move but it shows us where it last been and we don't want that thus we go to game.js draw function


    // 16.
    // here we update the snake position based on our inputDirection Function
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
    // after here we now go to out inputDirection function and modify the code to create movement.Go to input.js
} 

export function draw(gameBoard) {
    

    // 2. we take our snake body then loop through each one of our different segments
    // each piece of the snake we want to loop through

    snakeBody.forEach(segment => {
        // we are going to draw this snake to our gameBoard thus we pass in gameBoard parameter in our draw function

        // 3. create a snake element

        const snakeElement = document.createElement('div')
        // this div is going to go inside our gameBoard at a particular x. y coordinate

        // 4. since we are using grid it is easier to set that x,y coordinate
        // this part describes how our x and y are arranged.Rows take the y and columns take the x axis
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x

        // in order to make sure we can see this we st snakeElement classes

        snakeElement.classList.add('snake')
        
        // 5. now we append this  snake to our board

        gameBoard.appendChild(snakeElement)

        // up to here nothing will show because we have to pass that gameBoard in so let us go to  game.js and do that step 6.


    })
}


// 24.

export function expandSnake(amount) {

    // in here we are going to take a variable newSegment then add in the amount
    // we then declare the variable at the top of our page
    // now we create function onSnake

    newSegments += amount

}




// 25.
// this function is going to take in a position and is going to determine if this position is on our snake
export function onSnake(position, {ignoreHead = false}= {}) {

    // here we are going to use array.prototype.some() which is a method that tests whether at least one element in the array passes the test implemented by the provided function

    return snakeBody.some((segment, index) => {

        // for each one of our segments we want to check if it's on our snake so we are going to compare our position with our segment position to see if they are equal
        // to do that we are going to create a function equalPositions where we are going to pss in a segment and position

        if(ignoreHead && index === 0) return false

        return equalPositions(segment, position)
        // we go below and create this equal position function

    })

}

// 26.

// it will have parameters pos1 and pos2
// upto here  the snake can consume the food but the snake is not growing thus on our update we need to do that.But before that at the bottom we create another function addSegments


function equalPositions(pos1, pos2) {

    // what we want to do is return if some criteria is met

    return (
        pos1.x == pos2.x && pos1.y == pos2.y
        // so here if our two positions are exactly the same the call we made on equalPositions is going to return true 
    )
}


// 27.

// what this function is going to do is that it is going to take our new segments and add them to the bottom of our snake and we are going to call this every time we update thus go to our update function and call it

function addSegments() {

    // in here we first loop through over all newSegments

    for (let i=0; i< newSegments; i++) {
        // for all our new segment all we want to do is take the last segment of our snake and duplicate that
        // so if our snake is in 1 position it expands that and adds another segment becoming 2 positioned
        // upto here the snake is adding onto itself but we are not getting rid of our new segments thus what we need to do inside our here is take our new segments and equate that to 0
        snakeBody.push({...snakeBody[snakeBody.length-1]})

    }

    newSegments = 0

    // upto here it is going to work really well since our snake is moving as we expected and after eating a piece of food it increases by the growth rate we wanted
    // what we now need to work on is randomizing the position of our food thus we go to food.js and we create a function getRandomFood

}


// 33. 

export function getSnakeHead() {
    return snakeBody[0]
}


// 34. 

export function SnakeIntersection() {
    // the way to determine if the snake intersected itself is to determine if the head of the snake is touching any of the other body parts on the snake
    // at first we were looping over the head of the snake when using onSnake thus now we need to ignore it \
    // it is going to compare if the head of the snake is the head of the snake and that is always going to return true
    return onSnake(snakeBody[0], {ignoreHead: true })
}






// STEPS
// 1. drawing our snake
// but before drawing our snake we need to figure out to represent our snake
// the best thing about using our grid base system is that we can represent our snake as an x and a y position 