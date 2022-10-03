// 29.

const GRID_SIZE = 21

// we export the randomGridPosition here and import it where we need it ie. in food.js
export function randomGridPosition() {
    // what this does is return a random x and y values
    // x is going to be based on a formulae for calculating a random number between 1 and the size of our grid which is 21
    return {
        // math.random gives us a number between 0 and .999999 thus were multiplying it by 21 thus it is going to essentially give us  number between 0 and 20.9999 and were getting the floor of that thus were getting the  number between 0 and 20
        // in order to get a number between 0 and 21 we just need to add 1 to the end
        x: Math.floor(Math.random()* GRID_SIZE) + 1,
        y:Math.floor(Math.random() * GRID_SIZE) + 1
    }
}
// upto here our game is functioning really good since the snake can move eating food while growing at the rate we wnt and food is being randomly generated
// the problem now is that there is no way to lose in the game thus we need to create a losing condition
// to do that we go back to our game,js nd in update function we check for failure


// 32.

// all we need to do here is check if the position we passed into it is greater than our grid or less ie >21 or 1<
export function outsideGrid(position) {

    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y <1 || position.y > GRID_SIZE
    )

    // thus if we are anywhere outside our grid this will return true otherwise false
}
// next we need to work on getSnakeHead.We go to snake.js