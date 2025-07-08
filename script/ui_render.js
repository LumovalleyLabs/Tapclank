// Load UI-related images
const f1_a = new Image(); const f1_b = new Image(); const f1_c = new Image(); const f1_d = new Image();
const f1_e = new Image(); const f1_f = new Image(); const f1_g = new Image(); const f1_h = new Image();
const f1_i = new Image(); const f1_j = new Image(); const f1_k = new Image(); const f1_l = new Image();
const f1_m = new Image(); const f1_n = new Image(); const f1_o = new Image(); const f1_p = new Image();
const f1_q = new Image(); const f1_r = new Image(); const f1_s = new Image(); const f1_t = new Image();
const f1_u = new Image(); const f1_v = new Image(); const f1_w = new Image(); const f1_x = new Image();
const f1_y = new Image(); const f1_z = new Image(); 
const f1_0 = new Image(); const f1_1 = new Image(); const f1_2 = new Image();const f1_3 = new Image();
const f1_4 = new Image(); const f1_5 = new Image(); const f1_6 = new Image(); const f1_7 = new Image();
const f1_8 = new Image(); const f1_9 = new Image(); 
const f1_dot = new Image(); const f1_slash = new Image(); const f1_backslash = new Image();
const itemMenuSlotFrame = new Image();
const editIconFrame = new Image();
const eraseIconFrame = new Image();
const stoneIcon = new Image();
const dirtIcon = new Image();
const sandIcon = new Image();
const woodIcon = new Image();
f1_a.src = "gfx/font_1/letter_a.png"; f1_b.src = "gfx/font_1/letter_b.png"; f1_c.src = "gfx/font_1/letter_c.png";
f1_d.src = "gfx/font_1/letter_d.png"; f1_e.src = "gfx/font_1/letter_e.png"; f1_f.src = "gfx/font_1/letter_f.png";
f1_g.src = "gfx/font_1/letter_g.png"; f1_h.src = "gfx/font_1/letter_h.png"; f1_i.src = "gfx/font_1/letter_i.png";
f1_j.src = "gfx/font_1/letter_j.png"; f1_k.src = "gfx/font_1/letter_k.png"; f1_l.src = "gfx/font_1/letter_l.png";
f1_m.src = "gfx/font_1/letter_m.png"; f1_n.src = "gfx/font_1/letter_n.png"; f1_o.src = "gfx/font_1/letter_o.png";
f1_p.src = "gfx/font_1/letter_p.png"; f1_q.src = "gfx/font_1/letter_q.png"; f1_r.src = "gfx/font_1/letter_r.png";
f1_s.src = "gfx/font_1/letter_s.png"; f1_t.src = "gfx/font_1/letter_t.png"; f1_u.src = "gfx/font_1/letter_u.png";
f1_v.src = "gfx/font_1/letter_v.png"; f1_w.src = "gfx/font_1/letter_w.png"; f1_x.src = "gfx/font_1/letter_x.png";
f1_y.src = "gfx/font_1/letter_y.png"; f1_z.src = "gfx/font_1/letter_z.png";
f1_0.src = "gfx/font_1/number_0.png"; f1_1.src = "gfx/font_1/number_1.png"; f1_2.src = "gfx/font_1/number_2.png";
f1_3.src = "gfx/font_1/number_3.png"; f1_4.src = "gfx/font_1/number_4.png"; f1_5.src = "gfx/font_1/number_5.png";
f1_6.src = "gfx/font_1/number_6.png"; f1_7.src = "gfx/font_1/number_7.png"; f1_8.src = "gfx/font_1/number_8.png";
f1_9.src = "gfx/font_1/number_9.png";
f1_dot.src = "gfx/font_1/dot.png"; f1_slash.src = "gfx/font_1/slash.png"; f1_backslash.src = "gfx/font_1/backslash.png";
itemMenuSlotFrame.src = "gfx/ui/itemMenu_slotFrame.png";
editIconFrame.src = "gfx/ui/edit_iconFrame.png";
eraseIconFrame.src = "gfx/ui/erase_iconFrame.png";
stoneIcon.src = "gfx/ui/stone_ico.png";
dirtIcon.src = "gfx/ui/dirt_ico.png";
sandIcon.src = "gfx/ui/sand_ico.png";
woodIcon.src = "gfx/ui/wood_ico.png";

let o = 0;
let tx = 0; // text X position
let ty = 0; // text Y position 
let tx_size = 0; // text X size
let ty_size = 0; // text Y size
let textSpacingSize = 0;

let stringToRender = "";
let characterToRender = "";

let defaultString_1 = "tapclank pre alpha v1.01.2 2025 by lumovalley labs";
let defaultString_2 = "press e to open or close inventory";

let menuTitle = "tapclank";

let highlightBackOfText = false;

let menuTitle2 = "lands";
let playButtonString = "play";
let settingsButtonString = "settings";

let continueGameString = "continue"
let exitGameString = "exit";

// All of the possible characters of font1
let font1_characters = {
	46: f1_dot,
	47: f1_slash,
	48: f1_0,
	49: f1_1,
	50: f1_2,
	51: f1_3,
	52: f1_4,
	53: f1_5,
	54: f1_6,
	55: f1_7,
	56: f1_8,
	57: f1_9,
	97: f1_a,
	98: f1_b,
	99: f1_c,
	100: f1_d,
	101: f1_e,
	102: f1_f,
	103: f1_g,
	104: f1_h,
	105: f1_i,
	106: f1_j,
	107: f1_k,
	108: f1_l,
	109: f1_m,
	110: f1_n,
	111: f1_o,
	112: f1_p,
	113: f1_q,
	114: f1_r,
	115: f1_s,
	116: f1_t,
	117: f1_u,
	118: f1_v,
	119: f1_w,
	120: f1_x,
	121: f1_y,
	122: f1_z,
}

// The function below is for the text-rendering engine
// The text generated is drawn to the UI buffer (screenBuffer 2)
function renderText() {
	for (o = 0; o < stringToRender.length; o++) {
		characterToRender = (stringToRender[o].charCodeAt(0));
		//console.log("h: ", characterToRender);
		if (characterToRender == 32) { tx+=13; continue; } // space
		if (highlightBackOfText) { 
			screenBuffer2.drawImage(transparentBlack, tx-4, ty-2, stringToRender.length * (tx_size+4), ty_size+4); 
			highlightBackOfText = false;
		}
		screenBuffer2.drawImage(font1_characters[characterToRender], tx, ty, tx_size, ty_size);
		tx+=textSpacingSize;
	}
}

// Draw text for the inworld game
function versionTextDraw() {
	tx = Math.floor(canvas.width/2 - 5.6*defaultString_1.length);
	ty = 5;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = defaultString_1;
	highlightBackOfText = false;
	screenBuffer2.clearRect(0, 0, canvas.width, 22);
	screenBuffer2.drawImage(transparentBlack, 0, 0, canvas.width, 22);
	renderText();
}

function usefulTextDraw() {
	tx = 10;
	ty = 90;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = defaultString_2;
	highlightBackOfText = false;
	renderText();
}

// Draw text for the pause menu
function drawContinueGameText() {
	tx = Math.floor(canvas.width/2 - 42);
	ty = 185;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = continueGameString;
	highlightBackOfText = false;
	renderText();
}

function drawExitGameText() {
	tx = Math.floor(canvas.width/2 - 22);
	ty = 255;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = exitGameString;
	highlightBackOfText = false;
	renderText();
}

// Draw text for the main menu
function drawMenuElements() {
	tx = Math.floor(canvas.width/2 - 165);
	ty = 120;
	tx_size = 30;
	ty_size = 40;
	textSpacingSize = 40;
	stringToRender = menuTitle;
	highlightBackOfText = false;
	renderText();
	
	tx = Math.floor(canvas.width/2 - 23);
	ty = 305;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = playButtonString;
	renderText();
	
	tx = Math.floor(canvas.width/2 - 42);
	ty = 375;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = settingsButtonString;
	renderText();
}


// Draw the UI of the item menu bar on the left 
let cursorOverMenuItemBar = false;
let cursorOverWhichMenuBarSlot = 0;
let cursorJustLeftMenuItemBar = false;
let whichMenuBarIconSelected = 0;

let itemMenuBarIcons = {
	1: stoneIcon, 
	2: woodIcon, 
	3: dirtIcon,
	4: sandIcon
}

// Determines the contents contained within each menu bar slot
// 1 = stone, 2 = wood, 3 = dirt, 4 = sand, etc
let itemMenuBarContents = { 
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5, // draw
	6: 6, // erase
}

// Below is the list of all possible texts when hovering over a specific material to select
let itemMenuBarHoverText = {
	1: "stone",
	2: "wood",
	3: "dirt",
	4: "sand",
	5: "draw",
	6: "erase"
}

// The function below describes the X position (offset) of each menu item slot
// The menu item slot that is selected should have an X offset of +8
let itemMenuBarSlotsAdditionalPositions = { // We clear all and add 8 to whichever one is selected on click
	1: 0,
	2: 0, 
	3: 0,
	4: 0,
	5: 0, // edit/draw
	6: 0  // erase
}

// The function below draws the text that shows when our mouse is over one of the menu item slots
function drawItemMenuBarSlotHoverText() {
	tx = mx + 15;
	ty = my + 15;
	tx_size = 8;
	ty_size = 12;
	textSpacingSize = 11;
	stringToRender = itemMenuBarHoverText[itemMenuBarContents[cursorOverWhichMenuBarSlot]];
	highlightBackOfText = true;
	renderText();
}

// To draw the menu item bar on the left ( the 4 materials ) and the draw + erase buttons
function drawMenuItemBar() {
	
	// First, we clear the UI buffer
	screenBuffer2.clearRect(4, 150, 180, 270);
	
	// Draw the item icons in the item menu bar slots
	screenBuffer2.drawImage(itemMenuBarIcons[itemMenuBarContents[1]], 10+itemMenuBarSlotsAdditionalPositions[1], 150, 34, 34); // 1
	screenBuffer2.drawImage(itemMenuBarIcons[itemMenuBarContents[2]], 10+itemMenuBarSlotsAdditionalPositions[2], 190, 34, 34); // 2
	screenBuffer2.drawImage(itemMenuBarIcons[itemMenuBarContents[3]], 10+itemMenuBarSlotsAdditionalPositions[3], 230, 34, 34); // 3
	screenBuffer2.drawImage(itemMenuBarIcons[itemMenuBarContents[4]], 10+itemMenuBarSlotsAdditionalPositions[4], 270, 34, 34); // 4
	// Draw below the item menu slot-frames to the UI buffer
	screenBuffer2.drawImage(itemMenuSlotFrame, 4+itemMenuBarSlotsAdditionalPositions[1], 150, 50, 36); // 1

	screenBuffer2.drawImage(itemMenuSlotFrame, 4+itemMenuBarSlotsAdditionalPositions[2], 190, 50, 36); // 2

	screenBuffer2.drawImage(itemMenuSlotFrame, 4+itemMenuBarSlotsAdditionalPositions[3], 230, 50, 36); // 3

	screenBuffer2.drawImage(itemMenuSlotFrame, 4+itemMenuBarSlotsAdditionalPositions[4], 270, 50, 36); // 4

	screenBuffer2.drawImage(editIconFrame, 4+itemMenuBarSlotsAdditionalPositions[5], 320, 50, 36); // Draw
	screenBuffer2.drawImage(eraseIconFrame, 4+itemMenuBarSlotsAdditionalPositions[6], 360, 50, 36); // Erase
	
	// Then we highlight the slot that the mouse is over with a light transparent square 
	// We draw the highlight directly to the screen
	if (cursorOverMenuItemBar) {
		if (cursorOverWhichMenuBarSlot == 1) {
			screenBuffer2.drawImage(transparentCursor, 10+itemMenuBarSlotsAdditionalPositions[1], 150, 34, 34);
			drawItemMenuBarSlotHoverText();
		} else if (cursorOverWhichMenuBarSlot == 2) {
			screenBuffer2.drawImage(transparentCursor, 10+itemMenuBarSlotsAdditionalPositions[2], 190, 34, 34);
			drawItemMenuBarSlotHoverText();
		} else if (cursorOverWhichMenuBarSlot == 3) {
			screenBuffer2.drawImage(transparentCursor, 10+itemMenuBarSlotsAdditionalPositions[3], 230, 34, 34);
			drawItemMenuBarSlotHoverText();
		} else if (cursorOverWhichMenuBarSlot == 4) {
			screenBuffer2.drawImage(transparentCursor, 10+itemMenuBarSlotsAdditionalPositions[4], 270, 34, 34);
			drawItemMenuBarSlotHoverText();
		} else if (cursorOverWhichMenuBarSlot == 5) {
			screenBuffer2.drawImage(transparentCursor, 10+itemMenuBarSlotsAdditionalPositions[5], 320, 34, 34);
			drawItemMenuBarSlotHoverText();
		} else if (cursorOverWhichMenuBarSlot == 6) {
			screenBuffer2.drawImage(transparentCursor, 10+itemMenuBarSlotsAdditionalPositions[6], 360, 34, 34);
			drawItemMenuBarSlotHoverText();
		} 	
	}
	
}

