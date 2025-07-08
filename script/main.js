/* Jun/9/2025 - today - Lumovalley Labs
 * !This is the *original source code* for the game Tapclank! 
 * 
 */ 

window.resizeTo(1000, 680); // set window size on start!

const dpr = window.devicePixelRatio;
const cvs = document.getElementById("canvas");
const screen = cvs.getContext("2d");

const imageBuffer1 = document.createElement("canvas"); // This buffer is for the blocks
const imageBuffer2 = document.createElement("canvas"); // This buffer is for the UI elements

const screenBuffer1 = imageBuffer1.getContext("2d");
const screenBuffer2 = imageBuffer2.getContext("2d");

canvas.style.width = 720;
canvas.style.height = 540;
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
let generatingTerrain = false;

let slowFrameTime = 0; 

let i = 0;
let s = 0;
let g = 0;
let t = 0;
let shade = 0;

let playerX_size = 30;
let playerY_size = 42;
let playerX = Math.floor(canvas.width/2 - playerX_size/2-3);
let playerY = 0;
let playerIsFalling = true;
let playerIsJumping = false;
let playerCanMove = true;
let playerJumpVelocity = 0;
let playerJumpingTime = 0;
let playerSpeed = 3;
let playerSprinting = false;
let playerInBlocks = false;
let playerMovingDirection = 0; // 1 is left, 2 is right
let blocksAbovePlayer = false;
let blocksBelowPlayer = false;
let blockTypeBelowPlayer = 0;

let playerShade = Math.floor((Math.random()* 4) + 1);
let playerHairType = Math.floor((Math.random()* 7) + 1);
let playerWalkCycleTime = 0;

let playerFacingDirection = Math.floor((Math.random()* 2) + 1);

let playerWalkFrame = 1;
let playerWalkCycleTimeMaximumTime = 15; // 15 is normal walking, 10 is sprinting
let doWalkCycle = false;

let playerClicked = false;

let playerName = "default";

let mouseDown = false;

let placeMode = 2; // 1 = build, 2 = erase


let blockSize = 6;
let blockShade = 1;
let blockShadeTime = 0;
let currentBlockX = 0;
let blockX = 0; 
let blockPreX = 0;
let blockPreY = 0;
let blockY = canvas.height-blockSize;

let materialSelected = 1;

let wc = 1; // Which chunk to draw
let whichChunkRow = 1; // Which row on said chunk to draw
let whichBlockOnChunk = 1; //which block on said row to draw
let timeUntilNextChunkRow = 0;
let timeUntilNextChunk = 0;

let updateFrame = false;
let updateUI = true;
let breakLoop = false;

let xscroll = 0;
let xscroll_inverse = 0;
const worldXStart = 0;

let mx = 0;
let my = 0;
let cursorOverWorld = true;

let inWorld = false;
let onMenu = true;
let gamePaused = false;
let showingInventory = false;

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
const playerShade1Left = new Image(); const playerShade1Right = new Image();
const playerShade2Left = new Image(); const playerShade2Right = new Image();
const playerShade3Left = new Image(); const playerShade3Right = new Image();
const playerShade4Left = new Image(); const playerShade4Right = new Image();
const playerShade1Leg = new Image();
const playerShade2Leg = new Image();
const playerShade3Leg = new Image();
const playerShade4Leg = new Image();
defaultPlayer.src = "gfx/player_default.png";  
defaultBackdrop.src = "gfx/defaultBackground.png";
dayBackdrop1.src = "gfx/backdrop_day1.png";
black.src = "gfx/black_0.png";
defaultFontSheet.src = "gfx/font_sheet1.png";
transparentCursor.src = "gfx/transparent_01.png";
buttonFrame1.src = "gfx/ui/ui_buttonFrame1.png";
buttonFrame1Highlighted.src = "gfx/ui/ui_buttonFrame1_highlighted.png";	
transparentBlack.src = "gfx/black_transparent1.png";
playerShade1Left.src = "gfx/player/playerShade1_left.png"; playerShade1Right.src = "gfx/player/playerShade1_right.png";
playerShade2Left.src = "gfx/player/playerShade2_left.png"; playerShade2Right.src = "gfx/player/playerShade2_right.png";
playerShade3Left.src = "gfx/player/playerShade3_left.png"; playerShade3Right.src = "gfx/player/playerShade3_right.png";
playerShade4Left.src = "gfx/player/playerShade4_left.png"; playerShade4Right.src = "gfx/player/playerShade4_right.png";
playerShade1Leg.src = "gfx/player/playerShade1_leg.png";
playerShade2Leg.src = "gfx/player/playerShade2_leg.png";
playerShade3Leg.src = "gfx/player/playerShade3_leg.png";
playerShade4Leg.src = "gfx/player/playerShade4_leg.png";

// The different possible shades and directions of the player
// There are currently 4 shades in total and 2 possible directions
let playerLegShades = {
	1: playerShade1Leg,
	2: playerShade2Leg,
	3: playerShade3Leg,
	4: playerShade4Leg,
}
let playerLeftShades = {
	1: playerShade1Left,
	2: playerShade2Left,
	3: playerShade3Left,
	4: playerShade4Left
}
let playerRightShades = {
	1: playerShade1Right,
	2: playerShade2Right,
	3: playerShade3Right,
	4: playerShade4Right
}

let possiblePlayerDirection = {
	1: playerLeftShades, 
	2: playerRightShades
}

// Load in various sounds
const click1 = new Audio("sfx/bubble_01.wav");
const stoneFootstep1 = new Audio("sfx/footsteps/dirt_footstep1.wav"); stoneFootstep1.volume = 0;
const stoneFootstep2 = new Audio("sfx/footsteps/dirt_footstep2.wav"); stoneFootstep2.volume = 0;
const stoneFootstep3 = new Audio("sfx/footsteps/dirt_footstep3.wav"); stoneFootstep3.volume = 0;
const stoneFootstep4 = new Audio("sfx/footsteps/dirt_footstep4.wav"); stoneFootstep4.volume = 0;
const stoneFootstep5 = new Audio("sfx/footsteps/dirt_footstep5.wav"); stoneFootstep5.volume = 0;
const dirtFootstep1 = new Audio("sfx/footsteps/dirt_footstep1.wav"); dirtFootstep1.volume = 0.7;
const dirtFootstep2 = new Audio("sfx/footsteps/dirt_footstep2.wav"); dirtFootstep2.volume = 0.7;
const dirtFootstep3 = new Audio("sfx/footsteps/dirt_footstep3.wav"); dirtFootstep3.volume = 0.7;
const dirtFootstep4 = new Audio("sfx/footsteps/dirt_footstep4.wav"); dirtFootstep4.volume = 0.7;
const dirtFootstep5 = new Audio("sfx/footsteps/dirt_footstep5.wav"); dirtFootstep5.volume = 0.7;  
const dirtFootstep6 = new Audio("sfx/footsteps/dirt_footstep6.wav"); dirtFootstep6.volume = 0.7;
const sandFootstep1 = new Audio("sfx/footsteps/sand_footstep1.wav"); sandFootstep1.volume = 0.3;
const sandFootstep2 = new Audio("sfx/footsteps/sand_footstep2.wav"); sandFootstep2.volume = 0.3;
const sandFootstep3 = new Audio("sfx/footsteps/sand_footstep3.wav"); sandFootstep3.volume = 0.3;
const sandFootstep4 = new Audio("sfx/footsteps/sand_footstep4.wav"); sandFootstep4.volume = 0.3;
const sandFootstep5 = new Audio("sfx/footsteps/sand_footstep5.wav"); sandFootstep5.volume = 0.3;
const sandFootstep6 = new Audio("sfx/footsteps/sand_footstep6.wav"); sandFootstep6.volume = 0.3;
const woodFootstep1 = new Audio("sfx/footsteps/wood_footstep3.wav"); woodFootstep1.volume = 0.6;
const woodFootstep2 = new Audio("sfx/footsteps/wood_footstep2.wav"); woodFootstep2.volume = 0.5;
const woodFootstep3 = new Audio("sfx/footsteps/wood_footstep3.wav"); woodFootstep3.volume = 0.5;
const woodFootstep4 = new Audio("sfx/footsteps/wood_footstep4.wav"); woodFootstep4.volume = 0.5;
const woodFootstep5 = new Audio("sfx/footsteps/wood_footstep5.wav"); woodFootstep5.volume = 0.5;
const woodFootstep6 = new Audio("sfx/footsteps/wood_footstep3.wav"); woodFootstep6.volume = 0.5;

let whichFootstepSound = 1;

let stoneFootstepSounds = {
	1: stoneFootstep1,
	2: stoneFootstep2,
	3: stoneFootstep3,
	4: stoneFootstep4,
	5: stoneFootstep1, 
	6: stoneFootstep2,
};

let woodFootstepSounds =  {
	1: woodFootstep1, 
	2: woodFootstep2, 
	3: woodFootstep3,
	4: woodFootstep4,
	5: woodFootstep5,
	6: woodFootstep6,
};

let dirtFootstepSounds = {
	1: dirtFootstep1,
	2: dirtFootstep2,
	3: dirtFootstep3,
	4: dirtFootstep4,
	5: dirtFootstep5,
	6: dirtFootstep6 
};

let sandFootstepSounds = {
	1: sandFootstep1, 
	2: sandFootstep2, 
	3: sandFootstep3, 
	4: sandFootstep4, 
	5: sandFootstep5, 
	6: sandFootstep6, 
}

let totalFootstepSounds = {
	1: stoneFootstepSounds, //stone
	2: woodFootstepSounds, // wood
	3: dirtFootstepSounds, // dirt
	4: sandFootstepSounds // sand
};


/* The code below was added because there was a bug which caused the menu to not fully load
   This was because images were being drawn before they were fully loaded */
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
	drawMenuItemBar();
	usefulTextDraw();
	placeMode = true;
	playerClicked = false;
}

// Function for resizing the screen
function resizeScreen() {
	canvas.style.height = window.innerHeight; // new height
	canvas.style.width = window.innerWidth; // new width
	imageBuffer1.style.height = window.innerHeight;
	imageBuffer1.style.width = window.innerWidth;
	imageBuffer2.style.height = window.innerHeight;
	imageBuffer2.style.width = window.innerWidth;
	
	canvas.height = window.innerHeight; // new height
	canvas.width = window.innerWidth; // new width
	imageBuffer1.height = window.innerHeight;
	imageBuffer1.width = window.innerWidth;
	imageBuffer2.height = window.innerHeight;
	imageBuffer2.width = window.innerWidth;
	
	//window.innerWidth = 1200;
	//window.innerHeight = 624;
	
	blockSize = 7;
	blockX = 0;
	playerX_size = 5*blockSize;
	playerY_size = 7*blockSize;
	playerY = blockY - 10*blockSize;
	playerSpeed = blockSize/2;
	playerX = Math.floor(canvas.width/2 - (playerX_size/2) - (blockSize/2)-3);
	//xscroll = 0;
	//xscroll_inverse = 0;
	
	resizeScreenButtonX = canvas.width - (37+8);
	resizeScreenButtonY = canvas.height - (37+8);
	
	checkingForFallableBlock = true; 
	howManyFallableBlocksNotDetected = 0;
	
	updateUI = true;
	updateFrame = true;
	updateFallableBlock = true;
	
	screen.imageSmoothingEnabled = false;
	screen.mozImageSmoothingEnabled = false;
	screen.webkitImageSmoothingEnabled = false;

	screenBuffer2.imageSmoothingEnabled = false;
	screenBuffer2.mozImageSmoothingEnabled = false;
	screenBuffer2.webkitImageSmoothingEnabled = false;
}

resizeScreen();

// For texturing the blocks on screen
let textureBlocksTimes = 0;
function textureBlocks() {
	while (textureBlocksTimes < 2) 
	{
		blockShadeTime++;
		if (blockShadeTime > 1) {
			blockShade++;
			blockShadeTime = 0;
		}
		if (blockShade > 4) {
			blockShade = 1;
		}
		textureBlocksTimes++; 	
	}
}

// Snaps the cursor to the world grid


// CODE FOR CHANGING THE PITCH OF AUDIO, USE LATER: materialSounds[materialSelected].playbackRate = 0.8;
// materialSounds[materialSelected].preservesPitch = false;

// For drawing or erasing (editing) blocks
function editBlocks() {
	if (cursorOverWorld) {
		if (mx >= blockX && mx < blockX+blockSize && my >= blockPreY && my < blockPreY+blockSize) 
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
			checkingForFallableBlock = true; 
			howManyFallableBlocksNotDetected = 0;
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
				//console.log("FPS: ", performance.now);
				
				// Draw the player's body
				screen.drawImage(possiblePlayerDirection[playerFacingDirection][playerShade], playerX, playerY, playerX_size, playerY_size);
				
				// Draw the player's legs
				if (playerWalkFrame == 1) {
					screen.drawImage(playerLegShades[playerShade], playerX, playerY+(playerY_size - blockSize), 2*blockSize, blockSize);
					screen.drawImage(playerLegShades[playerShade], playerX + (3*blockSize), playerY+(playerY_size - blockSize), 2*blockSize, blockSize);	
				} else if (playerWalkFrame == 2) {
					screen.drawImage(playerLegShades[playerShade], playerX + 2*blockSize, playerY+(playerY_size - blockSize), 3*blockSize, blockSize);
				} else if (playerWalkFrame == 3) {
					screen.drawImage(playerLegShades[playerShade], playerX, playerY+(playerY_size - blockSize), 3*blockSize, blockSize);
				}
				
				// Clear game buffer
				if (updateFrame) { screenBuffer1.clearRect(0, 0, imageBuffer1.width, imageBuffer1.height); }
				
				// Draw the text to the UI buffer
				if (updateUI) {
					usefulTextDraw();
					drawMenuItemBar();
				}
				
				// Initialize these variables every frame
				blocksAbovePlayer = false;
				blocksBelowPlayer = false;
				playerInBlocks = false;
				if (!playerIsJumping) playerIsFalling = true;
				blockShadeTime = 0;
				blockShade = 1;
				blockX = xscroll;
				blockPreY = canvas.height - blockSize;
				blockY = blockPreY;
				timeUntilNextChunk = 0;
				timeUntilNextChunkRow = 0;
				whichChunk = 1;
				whichBlockOnChunk = 1;
				breakLoop = false;
				if (playerSprinting) { playerSpeed = 3; } else { playerSpeed = 2; }
				playerXCollisionIntersectionValue = 0;
				playerCollidingLeft = false;
				playerCollidingRight = false;

				/* The for loops below are what renders the pixels
				 * The pixels are drawn to the game buffer first, then the game buffer is drawn to the 
				 main canvas - for optimization! */
				
				if (!gamePaused) {
					for (i = 0; i < worldChunkCount; i++) { 		
						for (s = 0; s < 120; s++) { // width
							for (g = 0; g < 90; g++) { // height
								if (generatingTerrain) { generateTerrain(); }
								if (blockX > (0 - blockSize)) { // If blocks are not offscreen to the left
									if (chunks[whichChunk][whichBlockOnChunk] > 0) {
										blockY = blockPreY;
										if (updateFrame) { 
											renderWhichMaterials = chunks[whichChunk][whichBlockOnChunk];
											screenBuffer1.drawImage(Materials[renderWhichMaterials][blockShade], blockX, blockY, blockSize, blockSize); 
										}
										if (blockY+blockSize > playerY - playerY_size && blockY < playerY + (2*playerY_size)) { 
											if (blockX > playerX - playerX_size && blockX < playerX+ (2*playerX_size)) {
												// Only detect collision when a block is in the player's boundary
												detectPlayerCollision();
											}
										}
									}	
									if (checkingForFallableBlock && slowFrameTime >= 1) { detectFallableBlock(); }
									if (playerClicked) { editBlocks(); updateFrame = true; }
			
									// Snaps cursor to the world grid
									if (mx > blockX && mx < blockX+blockSize && my > blockPreY && my < blockPreY+blockSize) 
									{
										mx = blockX;
										my = blockPreY;
									}
								}
								if (blockX+blockSize < 0 && !generatingTerrain) { 
									textureBlocksTimes = 0; textureBlocks(); 
									whichBlockOnChunk+=90;
									break;
								}
								textureBlocksTimes = 1; textureBlocks(); 
								blockPreY -= blockSize;
								whichBlockOnChunk++;
								rowIteration++;
							}
							if (blockX > canvas.width && !generatingTerrain) {
								breakLoop = true;
								break;
							}
							if (breakLoop) { break; }
							textureBlocksTimes = 1; textureBlocks();
							blockPreY = canvas.height - blockSize;
							blockY = blockPreY;
							blockX += blockSize;
							whichBlockOnChunk += 1;
							if (generatingTerrain) { startNewVerticalRow = true; }
							rowIteration = 1;
						}
						if (breakLoop) { break; }
						blockPreY = canvas.height - blockSize;
						blockY = blockPreY;
						whichBlockOnChunk = 1;
						whichChunk++;
					}
					
					
					// stop generating terrain once the loop is done
					if (generatingTerrain) {
						generatingTerrain = false;
					}

					// don't update frame if player didn't click
					if (!playerClicked) { 
						updateFrame = false;
					}
					
					// for optimization, slowFrameTime is intended to only update certain things every 20 frames
					slowFrameTime++;
					if (slowFrameTime >= 20) {
						if (updateFallableBlocks) { 
							checkingForFallableBlock = true; 
							howManyFallableBlocksNotDetected = 0;
							updateFallableBlocks = false;
						 }
						slowFrameTime = 0;
					}

					// Draw the game/world buffer to the screen
					screen.drawImage(imageBuffer1, 0, 0, canvas.width, canvas.height);

					// Draw the cursor
					if (cursorOverWorld) { screen.drawImage(transparentCursor, mx, my, blockSize, blockSize); }

					// So when the player falls off the map they fall back onto it (may change later)
					if (playerY > canvas.height) {
						playerY = 0 - (4 * playerY_size);
					} 

					// Make our player fall naturally (thanks, gravity)
					if (playerIsFalling) {
						playerY += blockSize;
					} else if (playerIsJumping) { // If the player jumps
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
						xscroll += playerSpeed;
						xscroll_inverse -= playerSpeed;
						updateFallableBlocks = true;
						updateFrame = true;
					} else if (playerMovingDirection == 2) { // right
						xscroll -= playerSpeed;
						xscroll_inverse += playerSpeed; 
						updateFallableBlocks = true;
						updateFrame = true;
					}
					
					// Detect if the player is colliding horizontally every frame
					if (playerCollidingLeft) { // For the player's left collision
						xscroll -= playerXCollisionIntersectionValue;
						xscroll_inverse += playerXCollisionIntersectionValue;
					} else if (playerCollidingRight) { // For the player's right collision
						xscroll += playerXCollisionIntersectionValue;
						xscroll_inverse -= playerXCollisionIntersectionValue;
					}
					
					// The players walk cycle (and footstep sounds)
					if (doWalkCycle && blocksBelowPlayer) {
						playerWalkCycleTime++;
						if (playerWalkCycleTime >= playerWalkCycleTimeMaximumTime) {
							if (playerWalkFrame == 1) {
								playerWalkFrame = 2;
								whichFootstepSound = Math.floor((Math.random()* 4) + 3);
								totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].currentTime = 0;
								totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].play();
							} else if (playerWalkFrame == 2) {
								playerWalkFrame = 3;
								whichFootstepSound = Math.floor((Math.random()* 2) + 1);
								//totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].playbackRate = 1;
								totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].currentTime = 0;
								totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].play();
							} else if (playerWalkFrame == 3) {
								playerWalkFrame = 2;
								whichFootstepSound = Math.floor((Math.random()* 4) + 3);
								//totalFootstepSounds[blockTypeBelowPlayer][2].playbackRate = 0.8;
								//totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].preservesPitch = false;
								totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].currentTime = 0;
								totalFootstepSounds[blockTypeBelowPlayer][whichFootstepSound].play();
							}
							playerWalkCycleTime = 0;
						}	
					}
					
					// Detect if mouse cursor is over one of the item menu bar's slots
					cursorOverMenuItemBar = false;
					if (mx < 54 && mx > 4 && my > 149 && my < 396) {
						cursorOverMenuItemBar = true;
						cursorJustLeftMenuItemBar = false;
						drawMenuItemBar();
						updateUI = true;
						cursorOverWorld = false;
						if (my < 186) {
							cursorOverWhichMenuBarSlot = 1;
						} else if (my > 190 && my < 226) {
							cursorOverWhichMenuBarSlot = 2;
						} else if (my > 230 && my < 266) {
							cursorOverWhichMenuBarSlot = 3;
						} else if (my > 270 && my < 306) {
							cursorOverWhichMenuBarSlot = 4;
						} 

						if (my > 320 && my < 356) {
							cursorOverWhichMenuBarSlot = 5; // draw
						} else if (my > 360 && my < 396) {
							cursorOverWhichMenuBarSlot = 6; // erase
						}
						if (playerClicked) {
							if (my < 306) {
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
					} else { 
						if (!cursorJustLeftMenuItemBar) { 
							drawMenuItemBar(); 
							updateUI = true; 
							cursorOverWorld = true;
							console.log("just left the bar");
							cursorJustLeftMenuItemBar = true;
						}
					} 
			
					
					// For showing the inventory
					if (showingInventory) {
						cursorOverWorld = false;
						screen.drawImage(transparentBlack, (canvas.width/2) - (350/2), canvas.height/4, 350, 200);
					}	
					
				} else if (gamePaused) {
					
					// If the game is paused, draw the UI elements
					
					screen.drawImage(imageBuffer1, 0, 0, canvas.width, canvas.height);
					screen.drawImage(transparentBlack, 0, 0, canvas.width, canvas.height);
					screen.drawImage(buttonFrame1, canvas.width/2-(75), 170, 150, 45); // Continue
					screen.drawImage(buttonFrame1, canvas.width/2-(75), 240, 150, 45); // Exit
					
					// Draw the continue button highlight when mouse over
					if (mx > canvas.width/2-(75) && mx < canvas.width/2-(75)+150) {
						if (my > 170 && my < 170+45) {
							screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 170, 150, 45);
							
							// If we click the continue button while mouse over, continue the game
							if (playerClicked) {
								screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
								drawMenuItemBar();
								usefulTextDraw();
								playerCanMove = true;
								updateUI = true;
								updateFrame = true;
								gamePaused = false;
								playerClicked = false;
							}
						}
					} 
					
					// Draw the exit button highlight when mouse over
					if (mx > canvas.width/2-(75) && mx < canvas.width/2-(75)+150) {
						if (my > 240 && my < 240+45) {
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
				screen.drawImage(buttonFrame1, Math.floor(canvas.width/2-(75)), 290, 150, 45);
				screen.drawImage(buttonFrame1, Math.floor(canvas.width/2-(75)), 360, 150, 45);
				
				// Draw the settings button highlight when mouse over
				if (mx > canvas.width/2-(75) && mx < canvas.width/2-(75)+150) {
					if (my > 360 && my < 360+45) {
						screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 360, 150, 45);
					}
				} 
				
				// Draw the play button	highlight when mouse over
				if (mx > canvas.width/2-(75) && mx < canvas.width/2-(75)+150) {
					if (my > 290 && my < 290+45) {
						screen.drawImage(buttonFrame1Highlighted, canvas.width/2-(75), 290, 150, 45);
						
						// Detect if we click the play button while mouse over
						if (playerClicked) {
							generatingTerrain = true;
							terrainType = 1;
							inWorld = true;
							configureNormalTerrain();
							loadWorld();
						}
					}
				} 
			}
			
			
			// If a fallable block is still falling, continue to update frame
			if (blockFell) { updateFrame = true;}
			
			// For the audio that plays when drawing blocks
			placeAudioTime++;
			if (placeAudioTime > 11) {
				materialSounds[materialSelected].volume -= 0.1;
				if (materialSounds[materialSelected].volume < 0.1) {
					materialSounds[materialSelected].pause();
					materialSounds[materialSelected].volume = 0.1;
				}
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

// Section below is strictly for user input
// When keys are pressed
document.addEventListener("keydown", function(event) {
	if (playerCanMove) {
		if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
			if (!gamePaused && !onMenu) { 
				playerMovingDirection = 1; 
				playerFacingDirection = 1; // left
				updateFrame = true; 
				doWalkCycle = true;
			}
		} 
		if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
			if (!gamePaused && !onMenu) { 
				playerMovingDirection = 2; 
				playerFacingDirection = 2; // right
				updateFrame = true; 
				doWalkCycle = true;
			}
		}
	}
	if (event.key === " ") {
		if (!playerIsJumping && !playerIsFalling && !gamePaused && !onMenu && playerCanMove) {
			playerIsFalling = false;
			playerIsJumping = true;	
			playerJumpVelocity = 6;
			playerJumpingTime = 0;
		}
		event.preventDefault();
	}
	if (event.key === "Shift") {
		if (!onMenu && inWorld) {
			playerSprinting = true;
			playerWalkCycleTimeMaximumTime = 10;
		}
	}
});

// When keys are released
document.addEventListener("keyup", function(event) {
	if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
		if (!gamePaused && !onMenu) { playerMovingDirection = 0; }
		doWalkCycle = false;
		playerWalkFrame = 1;
	} 
	if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
		if (!gamePaused && !onMenu) { playerMovingDirection = 0; }
		doWalkCycle = false;
		playerWalkFrame = 1;	
	}
	if (event.key === "e") {
		if (!gamePaused && !onMenu) {
			if (showingInventory) {
				showingInventory = false;
				playerCanMove = true;
				cursorOverWorld = true;
			} else if (!showingInventory) {
				showingInventory = true;
				playerCanMove = false;
				cursorOverWorld = false;
			}
		}
	}
	if (event.key === "Escape") {
		if (!onMenu && inWorld) {
			if (!gamePaused) {
				gamePaused = true;
				playerCanMove = false;
				screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
				versionTextDraw();
				drawContinueGameText();
				drawExitGameText();
			} else if (gamePaused) {
				gamePaused = false;
				playerCanMove = true;
				screenBuffer2.clearRect(0, 0, imageBuffer2.width, imageBuffer2.height);
				updateFrame = true;
				updateUI = true;
			}
		}
	}
	if (event.key === "Shift") {
		if (!onMenu && inWorld) {
			playerSprinting = false;
			playerWalkCycleTimeMaximumTime = 15;
		}
	}
	
});

// Handling mouse inputs
document.addEventListener("mousemove", function (event) {
	mx = event.offsetX;
	my = event.offsetY;
	
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
		//console.log("shade: ", playerShade);
		//console.log("hair: ", playerHairType);
		mouseDown = false;
	}
});

window.onresize = function(event) {
	if (event) {
		console.log("hi");
		resizeScreen();
	}	
};