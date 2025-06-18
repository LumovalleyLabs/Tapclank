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

let o = 0;
let textX = 0;
let textY = 0;
let textX_size = 0;
let textY_size = 0;
let textSpacingSize = 0;

let stringToRender = "";
let characterToRender = "";

let defaultString_1 = "tapclank pre alpha v1.01 2025 by lumovalley labs";
let defaultString_2 = "press g to switch between build/erase mode";

let menuTitle = "tapclank";



let menuTitle2 = "lands";
let playButtonString = "play";
let settingsButtonString = "settings";

let continueGameString = "continue"
let exitGameString = "exit";

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

function renderText() {
	for (o = 0; o < stringToRender.length; o++) {
		characterToRender = (stringToRender[o].charCodeAt(0));
		//console.log("h: ", characterToRender);
		if (characterToRender == 32) { textX+=13; continue; }
		screenBuffer2.drawImage(font1_characters[characterToRender], textX, textY, textX_size, textY_size);
		textX+=textSpacingSize;
	}
}

function versionTextDraw() {
	textX = 10;
	textY = 5;
	textX_size = 8;
	textY_size = 12;
	textSpacingSize = 11;
	stringToRender = defaultString_1;
	renderText();
}

function usefulTextDraw() {
	textX = 10;
	textY = 90;
	textX_size = 8;
	textY_size = 12;
	textSpacingSize = 11;
	stringToRender = defaultString_2;
	renderText();
}

function drawContinueGameText() {
	textX = canvas.width/2 - 42;
	textY = 185;
	textX_size = 8;
	textY_size = 12;
	textSpacingSize = 11;
	stringToRender = continueGameString;
	renderText();
}

function drawExitGameText() {
	textX = canvas.width/2 - 22;
	textY = 255;
	textX_size = 8;
	textY_size = 12;
	textSpacingSize = 11;
	stringToRender = exitGameString;
	renderText();
}

function drawMenuElements() {
	textX = canvas.width/2 - 165;
	textY = 120;
	textX_size = 30;
	textY_size = 40;
	textSpacingSize = 40;
	stringToRender = menuTitle;
	renderText();
	
	textX = canvas.width/2 - 23;
	textY = 305;
	textX_size = 8;
	textY_size = 12;
	textSpacingSize = 11;
	stringToRender = playButtonString;
	renderText();
	
	textX = canvas.width/2 - 42;
	textY = 375;
	textX_size = 8;
	textY_size = 12;
	textSpacingSize = 11;
	stringToRender = settingsButtonString;
	renderText();
}
