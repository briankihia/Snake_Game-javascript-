// this is where we are going to get all our input information from

// 13.
// by default we don't want our snake to be moving anywhere thus we set the inputDirection  x and y both to 0


let inputDirection = { x: 0, y:0}
let lastInputDIrection= {x:0, y:0}

// 17.
// we set up a code to modify this input direction whenever we click a key
// we do this by adding an event listener to our window for keyDown(means click of a key)
// from here we go to our getInputDirection function and we sort out the issue of that currently our snake can reverse movement which should not be possible in an actual game

window.addEventListener('keydown', e => {
    // we add a switch statement to listen up on which key is being clicked and what to do
    
    switch(e.key) {
        case 'ArrowUp' :
            // 19.
            // we create an if statement to check if we were moving in the y axis or not and if we were moving ie y>0
            // ie if we are currently moving up or down we ignore the next part thus we don't make a move
            // we do the same for our arrowDown
            // after here we create a file called food.js


            if(lastInputDIrection.y !== 0) break 

            inputDirection = {x:0, y:-1}
            // this means that since we indicated in our snake.js in draw function that -1 in y is moving up thus ..
            break

        case 'ArrowDown' :

            if(lastInputDIrection.y !== 0) break 

            inputDirection = {x:0, y:1}
                // this means that since we indicated in our snake.js in draw function that +1 in y is moving down thus ..
            break

        case 'ArrowLeft' :

            if(lastInputDIrection.x !== 0) break 


            inputDirection = {x:-1, y:0}
            // this means that since we indicated in our snake.js in draw function that -1 in x is moving left thus ..
            break

        case 'ArrowRight' :

            if(lastInputDIrection.x !== 0) break 

            inputDirection = {x:1, y:0}
            // this means that since we indicated in our snake.js in draw function that 1 in x is moving right thus ..
            break
    }
})




// 14.
// we now create a function that is going to get our input and return the inputDirection
// after here we go and call this function in our update function in snake.js

export function getInputDirection() {

    // 18.
    // your snake should not be able to reverse onto itself thus we need to set up some checks to make sure that we cant move from up to down or left to right and vice versa 
    // thus we need to store our previous input direction based on the last time we got our input
    // after here we go to our switch case for arrowUp and

    lastInputDIrection = inputDirection

    return inputDirection
}