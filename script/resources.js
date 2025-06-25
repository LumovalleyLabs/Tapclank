/**
 * 
 */
// Stone
const stoneShade1 = new Image();
const stoneShade2 = new Image();
const stoneShade3 = new Image();
const stoneShade4 = new Image();
stoneShade1.src = "gfx/materials/stone_shade1.png";
stoneShade2.src = "gfx/materials/stone_shade2.png";
stoneShade3.src = "gfx/materials/stone_shade3.png";
stoneShade4.src = "gfx/materials/stone_shade4.png";

let stoneDraw = new Audio();
stoneDraw.src = "sfx/stone_draw01.wav";
let woodDraw = new Audio("sfx/wood_draw01.wav");
let dirtDraw = new Audio("sfx/dirt_draw01.wav");
let sandDraw = new Audio("sfx/sand_draw01.wav");
stoneDraw.volume = 0.5;
woodDraw.volume = 0.5;
dirtDraw.volume = 0.5;
sandDraw.volume = 0.5;
stoneDraw.autoplay = true;

// Wood
const woodShade1 = new Image();
const woodShade2 = new Image();
const woodShade3 = new Image();
woodShade1.src = "gfx/materials/wood_shade1.png";
woodShade2.src = "gfx/materials/wood_shade2.png";
woodShade3.src = "gfx/materials/wood_shade3.png";

// Dirt
const dirtShade1 = new Image();
const dirtShade2 = new Image();
const dirtShade3 = new Image();
dirtShade1.src = "gfx/materials/dirt_shade1.png";
dirtShade2.src = "gfx/materials/dirt_shade2.png";
dirtShade3.src = "gfx/materials/dirt_shade3.png";

// Sand
const sandShade1 = new Image();
const sandShade2 = new Image();
const sandShade3 = new Image();
sandShade1.src = "gfx/materials/sand_shade1.png";
sandShade2.src = "gfx/materials/sand_shade2.png";
sandShade3.src = "gfx/materials/sand_shade3.png";

let renderWhichMaterials = 0;

let stoneSprites = {
	1: stoneShade2,
	2: stoneShade4,
	3: stoneShade1,
	4: stoneShade3	
}

let woodSprites = {
	1: woodShade1,
	2: woodShade2,
	3: woodShade3,
	4: woodShade1,
}

let dirtSprites = {
	1: dirtShade3, 
	2: dirtShade3, 
	3: dirtShade1,
	4: dirtShade3,
}

let sandSprites = {
	1: sandShade1, 
	2: sandShade3,
	3: sandShade2, 
	4: sandShade2
}

let Materials = {
	1: stoneSprites,
	2: woodSprites,
	3: dirtSprites,
	4: sandSprites,
}

let materialSounds = {
	1: stoneDraw,
	2: woodDraw,
	3: dirtDraw,
	4: sandDraw
}

function playFootstepSounds() {
	
}