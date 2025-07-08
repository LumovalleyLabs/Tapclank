/*
 * Contains the code for calculating physics and collisions */


// Detecting player collision! 

let playerXCollisionIntersectionValue = 0; // How much the player is intersecting a block on the X axis
let playerCollidingLeft = false; 
let playerCollidingRight = false;

function detectPlayerCollision() {

			
	// Vertical collision detection for the player (top+bottom)
	if (playerX+playerX_size > blockX && playerX < blockX+blockSize) {
		if (playerY < blockY+blockSize+blockSize && playerY+blockSize > blockY) {
			blocksAbovePlayer = true;
			playerIsJumping = false;
		} else if (playerY+playerY_size >= blockY && playerY < blockY+blockSize) {
			playerIsFalling = false;
			blocksBelowPlayer = true;
			blockTypeBelowPlayer = chunks[whichChunk][whichBlockOnChunk];
			//console.log("type: ", blockTypeBelowPlayer);
		}
	}
				
	// Horizontal collision detection for the player (movement controls)

	if (blockY < playerY+playerY_size - (2*blockSize) && blockY+blockSize > playerY) { // Vertical - (2*6) for being able to traverse less than three blocks
		if (blockX+blockSize >= playerX && blockX <= playerX+playerX_size+2) {
			if (playerMovingDirection == 1 && blockX+blockSize < playerX+(playerX_size/2)) { // left movement collision
				playerXCollisionIntersectionValue = ((blockX+blockSize) - playerX);
				playerCollidingLeft = true;
				playerSpeed = 0;
				playerInBlocks = false;
								
			} else if (playerMovingDirection == 2 && blockX > playerX+(playerX_size/2)) { // right movement collision
				playerXCollisionIntersectionValue = ((playerX+playerX_size) - blockX);
				playerCollidingRight = true;
				playerSpeed = 0;
			} 
		}
	}
			
	// Make it so that we can walk up stairs

	if (blockX+blockSize > playerX && blockX < playerX+playerX_size) {
		if (blockY > playerY+playerY_size - (2*blockSize) && blockY < playerY+playerY_size) {
			if (!blocksAbovePlayer) {
				playerInBlocks = true;
				//console.log("working: ", playerInBlocks);
			}
		}
	}
					
}

// For blocks that will fall with gravity
// This is the algorithm for the physics of falling blocks
// For the physics of powders, liquids, and gasses

// These variables are to be used for optimization purposes
let checkingForFallableBlock = true; 
let howManyFallableBlocksNotDetected = 0; 

let updateFallableBlocks = false;
let blockFell = false;
let blockFalls = false;
let rowIteration = 1;

function detectFallableBlock() {
	
	if (howManyFallableBlocksNotDetected >= 10800) {
		checkingForFallableBlock = false;
	}

	if (chunks[whichChunk][whichBlockOnChunk] > 2) { // If sand, dirt, or water 
		if (chunks[whichChunk][whichBlockOnChunk - 1] == 0) { //If no blocks below block 
			blockFell = true;
			howManyFallableBlocksNotDetected = 0;
			updateFrame = true;
			chunks[whichChunk][whichBlockOnChunk - 1] = chunks[whichChunk][whichBlockOnChunk];
			chunks[whichChunk][whichBlockOnChunk] = 0;
		} else if (chunks[whichChunk][whichBlockOnChunk + (90 - rowIteration) + (rowIteration)] == 0){ // If no block on bottom right
			blockFell = true;
			howManyFallableBlocksNotDetected = 0;
			updateFrame = true;
			chunks[whichChunk][whichBlockOnChunk + (90 - rowIteration + (rowIteration))] = chunks[whichChunk][whichBlockOnChunk];
			chunks[whichChunk][whichBlockOnChunk] = 0;
		} else if (chunks[whichChunk][whichBlockOnChunk - (90 - rowIteration + (rowIteration) + 2)] == 0) { // If no blocks on bottom left
			blockFell = true;
			howManyFallableBlocksNotDetected = 0;
			updateFrame = true;
			chunks[whichChunk][whichBlockOnChunk - (90 - rowIteration + (rowIteration) + 2)] = chunks[whichChunk][whichBlockOnChunk];
			chunks[whichChunk][whichBlockOnChunk] = 0;
		} else {
			howManyFallableBlocksNotDetected++;
		}
	} 
}