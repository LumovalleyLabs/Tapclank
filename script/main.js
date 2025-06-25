/* Jun/9/2025 - Jun/14/2025 - Lumovalley Labs
 * !This is the original source code for the game Tapclank!
 * 
 */
const cvs = document.getElementById("canvas");
const screen = cvs.getContext("2d");

const imageBuffer1 = document.createElement("canvas"); // This buffer is for the blocks
const imageBuffer2 = document.createElement("canvas"); // This buffer is for the UI elements

const screenBuffer1 = imageBuffer1.getContext("2d");
const screenBuffer2 = imageBuffer2.getContext("2d");
 
imageBuffer1.width = canvas.width;
imageBuffer1.height = canvas.height; 
imageBuffer2.width = canvas.width;
imageBuffer2.height = canvas.height; 

screen.imageSmoothingEnabled = false;
screen.mozImageSmoothingEnabled = false;
screen.webkitImageSmoothingEnabled = false;

screenBuffer2.imageSmoothingEnabled = false;
screenBuffer2.mozImageSmoothingEnabled = false;
screenBuffer2.webkitImageSmoothingEnabled = false;

// Initializing important variables below
let applicationRunning = false;

let worldChunkCount = 4;

let i = 0;
let s = 0;
let g = 0;
let t = 0;
let shade = 0;

let playerX_size = 30;
let playerY_size = 42;
let playerX = canvas.width/2 - playerX_size/2-3;
let playerY = 0;
let playerIsFalling = true;
let playerIsJumping = false;
let playerJumpVelocity = 0;
let playerJumpingTime = 0;
let playerSpeed = 3;
let playerInBlocks = false;
let playerMovingDirection = 0; // 1 is left, 2 is right
let blocksAbovePlayer = false;

let playerShade = Math.floor((Math.random()* 4) + 1);
let playerHairType = Math.floor((Math.random()* 7) + 1);

let playerClicked = false;
let mouseDown = false;

let placeMode = 2; // 1 = build, 2 = erase

let playerName = "default";

let blockSize = 6;
let blockShade = 1;
let blockShadeTime = 0;
let currentBlockX = 0;
let blockX = 0; 
let blockPreX = 0;
let blockPreY = 0;
let blockY = canvas.height-blockSize;

let materialSelected = 1;

let whichChunk = 1; // Which chunk to draw
let whichChunkRow = 1; // Which row on said chunk to draw
let whichBlockOnChunk = 1; //which block on said row to draw
let timeUntilNextChunkRow = 0;
let timeUntilNextChunk = 0;

let updateFrame = false;
let updateUI = true;
let breakLoop = false;

let scrollX = 0;
let scrollX_inverse = 0;
const worldXStart = 0;

let cursorX = 0;
let cursorY = 0;
let cursorOverWorld = true;

let inWorld = false;
let onMenu = true;
let gamePaused = false;
let showingEditorMenu = false;

let placeAudioTime = 10;

// Load in images below


const defaultPlayer = new Image();
const defaultBackdrop = new Image(); 
const dayBackdrop1 = new Image();
const black = new Image();
const defaultFontSheet = new Image();
const transparentCursor = new Image();
const buttonFrame1 = new Image();
const buttonFrame1Highlighted = new Image();
const transparentBlack = new Image();
const playerShade1 = new Image();
const playerShade2 = new Image();
const playerShade3 = new Image();
const playerShade4 = new Image();
defaultPlayer.src = "gfx/player_default.png";  
defaultBackdrop.src = "gfx/defaultBackground.png";
dayBackdrop1.src = "gfx/backdrop_day1.png";
black.src = "gfx/black_0.png";
defaultFontSheet.src = "gfx/font_sheet1.png";
transparentCursor.src = "gfx/transparent_01.png";
buttonFrame1.src = "gfx/ui/ui_buttonFrame1.png";
buttonFrame1Highlighted.src = "gfx/ui/ui_buttonFrame1_highlighted.png";	
transparentBlack.src = "gfx/black_transparent1.png";
playerShade1.src = "gfx/player_shade1.png";
playerShade2.src = "gfx/player_shade2.png";
playerShade3.src = "gfx/player_shade3.png";
playerShade4.src = "gfx/player_shade4.png";

// The different possible shades of the player
// There are currently 4 in total
let playerShades = {
	1: playerShade1,
	2: playerShade2,
	3: playerShade3,
	4: playerShade4,
}

// Load in various sounds
const click1 = new Audio("sfx/bubble_01.wav");
const stoneFootstep1 = new Audio("sfx/stone_footstep1.wav");
stoneFootstep1.volume = 0.5;

// The code below was added because there was a bug which caused the menu to not fully load
// This was because images were being drawn before they were fully loaded

window.onload = function() {
	applicationRunning = true;
}


// The function below loads the world when the player presses play
function loadWorld() {
	screenBuffer1.clearRect(0, 0, imageBuffer1.width, imageBuffer1.height);
	screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
	itemMenuBarSlotsAdditionalPositions[1] = 8;
	itemMenuBarSlotsAdditionalPositions[5] = 8;
	updateUI = true;
	updateFrame = true;
	onMenu = false;
	inWorld = true;
	versionTextDraw();
	drawMenuItemBar();
	usefulTextDraw();
	placeMode = true;
	playerClicked = false;
}

// The code BELOW NEEDS SERIOUS WORK... actually, no it doesn't.
// BUT THE SOUNDS BELOW IN THE CODE NEED SERIOUS REFINING!!
function playFootstepSounds() {
	stoneFootstep1.play();
	if (stoneFootstep1.currentTime > 0.18) {
		//whichFootstepSound = Math.floor((Math.random()* 3) + 1);
		
		stoneFootstep1.playbackRate = Math.random() * (1.1 - 1) + 1;
		stoneFootstep1.preservesPitch = false;
		stoneFootstep1.currentTime = 0;
	}
}


// Function for full screen mode
// *This is highly experimental*
// There are some problems with collsions, etc, when going full screen
function goFullScreen() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	imageBuffer1.height = window.innerHeight;
	imageBuffer1.width = window.innerWidth;
	imageBuffer2.height = window.innerHeight;
	imageBuffer2.width = window.innerWidth;
	
	blockSize = 7;
	blockX = 0;
	playerX_size = 5*blockSize;
	playerY_size = 7*blockSize;
	//playerSpeed = blockSize/2;
	playerX = canvas.width/2 - (playerX_size/2) - (blockSize/2)-3;
	scrollX = 0;
	scrollX_inverse = 0;
	
	screen.imageSmoothingEnabled = false;
	screen.mozImageSmoothingEnabled = false;
	screen.webkitImageSmoothingEnabled = false;

	screenBuffer2.imageSmoothingEnabled = false;
	screenBuffer2.mozImageSmoothingEnabled = false;
	screenBuffer2.webkitImageSmoothingEnabled = false;
}


// Function for detecting player collision

function detectPlayerCollision() {
	
	// Vertical collision detection for the player (gravity)
	if (playerX+playerX_size > blockX && playerX < blockX+blockSize) {
		if (playerY < blockY+blockSize+blockSize && playerY+blockSize > blockY) {
			blocksAbovePlayer = true;
			playerIsJumping = false;
		} 
		if (playerY+playerY_size >= blockY && playerY < blockY+blockSize) {
			playerIsFalling = false;

		}	
	}
		
	// Horizontal collision detection for the player (movement controls)

	if (blockY < playerY+playerY_size - (2*blockSize) && blockY+blockSize > playerY) { // Vertical - (2*6) for being able to traverse less than three blocks
		if (blockX+blockSize >= playerX && blockX <= playerX+playerX_size) {
				
			if (playerMovingDirection == 1 && blockX+blockSize < playerX+(playerX_size/2)) {
				playerSpeed = 0;
			} else if (playerMovingDirection == 2 && blockX > playerX+(playerX_size/2)) {
				playerSpeed = 0;
			} 
		} 
	}
		
	// Make it so that we can walk up stairs
		
	if (blockX+blockSize > playerX && blockX < playerX+playerX_size) {
		if (blockY > playerY+playerY_size - (2*blockSize) && blockY < playerY+playerY_size) {
			if (!blocksAbovePlayer) {
				playerInBlocks = true;
			}
		} 
	}
}

// Function for texturing the blocks on screen

function textureBlocks() {
	blockShadeTime++;
	if (blockShadeTime > 1) {
		blockShade++;
		blockShadeTime = 0;
	}
	if (blockShade > 4) {
		blockShade = 1;
	}
}

// Snaps the cursor to the grid
function setCursor() {
	if (cursorX > blockX && cursorX < blockX+blockSize && cursorY > blockPreY && cursorY < blockPreY+blockSize) 
	{
		cursorX = blockX;
		cursorY = blockPreY;
	}
}

// CODE FOR CHANGING THE PITCH OF AUDIO, USE LATER: materialSounds[materialSelected].playbackRate = 0.8;
// materialSounds[materialSelected].preservesPitch = false;

// For drawing or deleting blocks
function editBlocks() {
	if (cursorOverWorld) {
		if (cursorX >= blockX && cursorX < blockX+blockSize && cursorY >= blockPreY && cursorY < blockPreY+blockSize) 
		{
			if (placeMode && chunks[whichChunk][whichBlockOnChunk] == 0) {
				chunks[whichChunk][whichBlockOnChunk] = materialSelected;
				materialSounds[materialSelected].volume = 1;
				placeAudioTime = 0;
				materialSounds[materialSelected].play();
			} else if (!placeMode) {
				//if (chunks[whichChunk][whichBlockOnChunk] == "1") { placeAudioTime = 0; stoneDraw.volume = 1; stoneDraw.play(); }
				chunks[whichChunk][whichBlockOnChunk] = 0;
			}
		}
	}
}


// For blocks that will fall with gravity
// This is the algorithm for the physics of falling blocks
let blockFell = false;
let blockFalls = false;
let rowIteration = 1;

function detectFallableBlock() {
	if (chunks[whichChunk][whichBlockOnChunk] == 4 || chunks[whichChunk][whichBlockOnChunk] == 3) { // If sand, dirt, or water 
		if (chunks[whichChunk][whichBlockOnChunk - 1] == 0) { //If no blocks below block 
			blockFell = true;
			updateFrame = true;
			chunks[whichChunk][whichBlockOnChunk - 1] = chunks[whichChunk][whichBlockOnChunk];
			chunks[whichChunk][whichBlockOnChunk] = 0;
		} else if (chunks[whichChunk][whichBlockOnChunk + (90 - rowIteration) + (rowIteration)] == 0){ // If no block on right
			blockFell = true;
			updateFrame = true;
			chunks[whichChunk][whichBlockOnChunk + (90 - rowIteration + (rowIteration))] = chunks[whichChunk][whichBlockOnChunk];
			chunks[whichChunk][whichBlockOnChunk] = 0;
		} else if (chunks[whichChunk][whichBlockOnChunk - (90 - rowIteration + (rowIteration) + 2)] == 0) {
			blockFell = true;
			updateFrame = true;
			chunks[whichChunk][whichBlockOnChunk - (90 - rowIteration + (rowIteration) + 2)] = chunks[whichChunk][whichBlockOnChunk];
			chunks[whichChunk][whichBlockOnChunk] = 0;
		}
	}
}
	

function explode() {
	
}


// The main game-loop below

function applicationLoop() {
	
	requestAnimationFrame(applicationLoop);
	
	if (applicationRunning) {
		
		// Draw the background and the player
		screen.drawImage(dayBackdrop1, 0, 0, canvas.width, canvas.height);
		
		if (inWorld) {
				screen.drawImage(playerShades[playerShade], playerX, playerY, playerX_size, playerY_size);
				
				// Clear game buffer
				if (updateFrame) { screenBuffer1.clearRect(0, 0, imageBuffer1.width, imageBuffer1.height); }
				
				// Draw the text to the UI buffer
				if (updateUI) {
					usefulTextDraw();
					drawMenuItemBar();
				}
				
				// Initialize these variables every frame
				blocksAbovePlayer = false;
				playerInBlocks = false;
				if (!playerIsJumping) playerIsFalling = true;
				playerSpeed = 3;
				
				blockShadeTime = 0;
				blockShade = 1;
				blockX = scrollX;
				blockPreY = canvas.height - blockSize;
				blockY = blockPreY;
				timeUntilNextChunk = 0;
				timeUntilNextChunkRow = 0;
				whichChunk = 1;
				whichBlockOnChunk = 1;
				//whichChunkRow = 1; 
				breakLoop = false;

				// The for loops below are what renders the pixels
				// The pixels are drawn to the game buffer first rather than the main canvas for optimization!
				
				if (!gamePaused) {
					for (i = 0; i < worldChunkCount; i++) { 		
						for (s = 0; s < 120; s++) { // width	
							for (g = 0; g < 90; g++) { // height
								if (blockX > (0 - blockSize)) {
									if (chunks[whichChunk][whichBlockOnChunk] > 0) {
										blockY = blockPreY;
										if (updateFrame) { 
											renderWhichMaterials = chunks[whichChunk][whichBlockOnChunk];
											screenBuffer1.drawImage(Materials[renderWhichMaterials][blockShade], blockX, blockY, blockSize, blockSize); 
										}
										
										detectPlayerCollision();
									}	
									detectFallableBlock();
									if (playerClicked) { editBlocks(); updateFrame = true; }
									setCursor();
								}
								if (blockX+blockSize < 0) { // Skip the row if there are blocks off to the left (< 0)
									textureBlocks(); 
									textureBlocks();
									whichBlockOnChunk+=90;
									break;
								}
								textureBlocks(); 
								blockPreY -= blockSize;
								whichBlockOnChunk++;
								rowIteration++;
							}
							if (blockX > canvas.width) {
								breakLoop = true;
								break;
							}
							if (breakLoop) { break; }
							textureBlocks();
							blockPreY = canvas.height - blockSize;
							blockY = blockPreY;
							blockX += blockSize;
							whichBlockOnChunk += 1;
							rowIteration = 1;
						}
						if (breakLoop) { break; }
						blockPreY = canvas.height - blockSize;
						blockY = blockPreY;
						whichBlockOnChunk = 1;
						whichChunk++;
					}

					if (!playerClicked) {
						updateFrame = false;
					}

					// Draw the game buffer to the screen
					screen.drawImage(imageBuffer1, 0, 0, canvas.width, canvas.height);

					// Draw the cursor
					if (cursorOverWorld) { screen.drawImage(transparentCursor, cursorX, cursorY, blockSize, blockSize); }

					// So when we fall off the map we fall back onto it
					if (playerY > canvas.height) {
						playerY = 0 - (4 * playerY_size);
					} 

					// Make our player fall naturally due to gravity
					if (playerIsFalling) {
						playerY += blockSize;
					}

					// If our player jumps
					if (playerIsJumping) {
						playerY -= playerJumpVelocity;
						playerJumpingTime++;
						if (playerJumpingTime > 10) {
							playerIsJumping = false;
							playerIsFalling = true;
							playerJumpingTime = 0;
						}
						if (playerJumpingTime > 4) {
							playerJumpVelocity--;	
						}
						
					}

					// If our player is inside of blocks, move our player out of them
					if (playerInBlocks) {
						playerY -= 1;
					}

					// Movement code (for the player's movement) 1 = left, 2 = right
					if (playerMovingDirection == 1) { // left
						scrollX += playerSpeed;
						scrollX_inverse -= playerSpeed;
						updateFrame = true;
					} else if (playerMovingDirection == 2) { // right
						scrollX -= playerSpeed;
						scrollX_inverse += playerSpeed; 
						updateFrame = true;
						//playFootstepSounds();
					}
					
					// Draw the item icons in the item menu bar slots
					screen.drawImage(itemMenuBarIcons[itemMenuBarContents[1]], 10+itemMenuBarSlotsAdditionalPositions[1], 150, 34, 34); // 1
					screen.drawImage(itemMenuBarIcons[itemMenuBarContents[2]], 10+itemMenuBarSlotsAdditionalPositions[2], 190, 34, 34); // 2
					screen.drawImage(itemMenuBarIcons[itemMenuBarContents[3]], 10+itemMenuBarSlotsAdditionalPositions[3], 230, 34, 34); // 3
					screen.drawImage(itemMenuBarIcons[itemMenuBarContents[4]], 10+itemMenuBarSlotsAdditionalPositions[4], 270, 34, 34); // 4
					
					//screen.drawImage(itemMenuBarIcons[itemMenuBarContents[4]], 10+itemMenuBarSlotsAdditionalPositions[4], 270, 34, 34); // ERASE
					
					// Detect if mouse is over the item menu bar slots
					if (cursorX < 54 && cursorX > 4 && cursorY > 150 && cursorY < 396) {
						drawMenuItemBar();
						updateUI = true;
						cursorOverWorld = false;
						if (cursorY < 186) {
							cursorOverWhichMenuBarSlot = 1;
						} else if (cursorY > 190 && cursorY < 226) {
							cursorOverWhichMenuBarSlot = 2;
						} else if (cursorY > 230 && cursorY < 266) {
							cursorOverWhichMenuBarSlot = 3;
						} else if (cursorY > 270 && cursorY < 306) {
							cursorOverWhichMenuBarSlot = 4;
						} 
						
						if (cursorY > 320 && cursorY < 356) {
							cursorOverWhichMenuBarSlot = 5; // draw
						} else if (cursorY > 360 && cursorY < 396) {
							cursorOverWhichMenuBarSlot = 6; // erase
						}
						if (playerClicked) {
							if (cursorY < 306) {
								materialSelected = itemMenuBarContents[cursorOverWhichMenuBarSlot];
								itemMenuBarSlotsAdditionalPositions[1] = 0;
								itemMenuBarSlotsAdditionalPositions[2] = 0;
								itemMenuBarSlotsAdditionalPositions[3] = 0;
								itemMenuBarSlotsAdditionalPositions[4] = 0;
							} 
							if (cursorOverWhichMenuBarSlot == 5) {
								itemMenuBarSlotsAdditionalPositions[6] = 0;
								placeMode = true;	
							} else if (cursorOverWhichMenuBarSlot == 6) {
								itemMenuBarSlotsAdditionalPositions[5] = 0;
								placeMode = false;	
							}
							itemMenuBarSlotsAdditionalPositions[cursorOverWhichMenuBarSlot] = 8;
							click1.currentTime = 0;
							click1.play();
						}
					} else{
						cursorOverWorld = true;
					}
					
					// For showing the editor menu
					if (showingEditorMenu) {
						screen.drawImage(transparentBlack, canvas.width/4, canvas.height/4, 350, 200);
					}	
					
				} else if (gamePaused) {
					
					// If the game is paused, draw the UI elements
					
					screen.drawImage(imageBuffer1, 0, 0, canvas.width, canvas.height);
					screen.drawImage(transparentBlack, 0, 0, canvas.width, canvas.height);
					screen.drawImage(buttonFrame1, canvas.width/2-(75), 170, 150, 45); // Continue
					screen.drawImage(buttonFrame1, canvas.width/2-(75), 240, 150, 45); // Exit
					
					// Draw the continue button highlight when mouse over
					if (cursorX > canvas.width/2-(75) && cursorX < canvas.width/2-(75)+150) {
						if (cursorY > 170 && cursorY < 170+45) {
							screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 170, 150, 45);
							
							// If we click the continue button while mouse over, continue the game
							if (playerClicked) {
								screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
								drawMenuItemBar();
								usefulTextDraw();
								updateUI = true;
								updateFrame = true;
								gamePaused = false;
								playerClicked = false;
							}
						}
					} 
					
					// Draw the exit button highlight when mouse over
					if (cursorX > canvas.width/2-(75) && cursorX < canvas.width/2-(75)+150) {
						if (cursorY > 240 && cursorY < 240+45) {
							screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 240, 150, 45);
							
							// If we click the EXIT button while mouse over, return to the menu
							if (playerClicked) {
								screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
								screenBuffer1.clearRect(0, 0, imageBuffer1.width, imageBuffer1.height);
								drawMenuElements();
								onMenu = true;
								inWorld = false;
								updateUI = true;
								updateFrame = true;
								gamePaused = false;
								playerClicked = false;
							}
						}
					} 
				}
				
			} else if (onMenu) { 
				
				// If we are on the main menu of the game
				// Draw the menu's UI elements to the UI buffer!
				
				if (updateUI) {
					drawMenuElements();
				}
				
				// Draw the buttons (play and settings)
				screen.drawImage(buttonFrame1, canvas.width/2-(75), 290, 150, 45);
				screen.drawImage(buttonFrame1, canvas.width/2-(75), 360, 150, 45);
				
				// Draw the settings button highlight when mouse over
				if (cursorX > canvas.width/2-(75) && cursorX < canvas.width/2-(75)+150) {
					if (cursorY > 360 && cursorY < 360+45) {
						screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 360, 150, 45);
					}
				} 
				
				// Draw the play button	highlight when mouse over
				if (cursorX > canvas.width/2-(75) && cursorX < canvas.width/2-(75)+150) {
					if (cursorY > 290 && cursorY < 290+45) {
						screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 290, 150, 45);
						
						// Detect if we click the play button while mouse over
						if (playerClicked) {
							loadWorld();
						}
					}
				} 
			}
			
			if (blockFell) { updateFrame = true;}
			
			placeAudioTime++;
			if (placeAudioTime > 11) {
				materialSounds[materialSelected].volume -= 0.1;
				//woodDraw.volume = stoneDraw.volume;
				
				if (materialSounds[materialSelected].volume < 0.1) {
					materialSounds[materialSelected].pause();
					materialSounds[materialSelected].volume = 0.1;
					//materialSounds[materialSelected].volume = materialSounds[materialSelected];
				}
				//stoneDraw.volume = volume;
			
			}
			if (placeAudioTime > 12) {
				placeAudioTime = 12;
			}
			
			// Draw the UI buffer to the screen and wait to update UI
			if (updateUI) {
				versionTextDraw();
			}
			screen.drawImage(imageBuffer2, 0, 0, canvas.width, canvas.height);
			updateUI = false;
		}
}

requestAnimationFrame(applicationLoop);

// Handling keyboard inputs
document.addEventListener("keydown", function(event) {
	if (cursorOverWorld) {
		if (event.key === "a" || event.key === "ArrowLeft") {
			if (!gamePaused && !onMenu) { playerMovingDirection = 1; updateFrame = true; }
		} 
		if (event.key === "d" || event.key === "ArrowRight") {
			if (!gamePaused && !onMenu) { playerMovingDirection = 2; updateFrame = true; }
		}
	}
	if (event.key === " ") {
		if (!playerIsJumping && !playerIsFalling && !gamePaused && !onMenu) {
			playerIsFalling = false;
			playerIsJumping = true;	
			playerJumpVelocity = 6;
			playerJumpingTime = 0;
		}
		event.preventDefault();
	}
});

document.addEventListener("keyup", function(event) {
	if (event.key === "a" || event.key === "ArrowLeft") {
		if (!gamePaused && !onMenu) { playerMovingDirection = 0; }		
	} 
	if (event.key === "d" || event.key === "ArrowRight") {
		if (!gamePaused && !onMenu) { playerMovingDirection = 0; }	
	}
	if (event.key === "g") {
		if (!gamePaused && !onMenu) {
			if (showingEditorMenu) {
				showingEditorMenu = false;
				cursorOverWorld = true;
			} else if (!showingEditorMenu) {
				showingEditorMenu = true;
				cursorOverWorld = false;
			}
		}
	}
	if (event.key === "Escape") {
		if (!onMenu && inWorld) {
			if (!gamePaused) {
				gamePaused = true;
				screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
				versionTextDraw();
				drawContinueGameText();
				drawExitGameText();
			} else if (gamePaused) {
				gamePaused = false;
				screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
				updateFrame = true;
				updateUI = true;
			}
		}
	}
});

// Handling mouse inputs
document.addEventListener("mousemove", function (event) {
	cursorX = event.offsetX;
	cursorY = event.offsetY;
	
});

document.addEventListener("mousedown", function (event) {
	if (event) {  
		playerClicked = true;
		mouseDown = true;
	}
});

document.addEventListener("mouseup", function (event) {
	if (event) {
		playerClicked = false;
		console.log("shade: ", playerShade);
		console.log("hair: ", playerHairType);
		mouseDown = false;
	}
});
