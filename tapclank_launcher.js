let cvs = document.getElementById("canvas");let ctx = cvs.getContext("2d");
let cvs2 = document.createElement("canvas");let ctx2 = cvs2.getContext("2d");
cvs2.height = canvas.height;cvs2.width = canvas.width;let mousex = 0;let mousey = 0; let mol=false;
ctx.imageSmoothingEnabled = false;ctx2.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;ctx2.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;ctx2.webkitImageSmoothingEnabled = false;
const launcherBackground = new Image();const launcherTitle = new Image();const launcherText = new Image();
const transparentBlack = new Image();const launchButton = new Image();
launcherBackground.src = "launcher_background.png";launcherTitle.src = "launcher_title.png";
launcherText.src = "launcher_text.png";transparentBlack.src = "launcher_transparentBlack.png";launchButton.src = "launcher_button.png";
window.onload = function() { ctx.drawImage(launcherBackground, 0, 0, canvas.width, canvas.height);
ctx.drawImage(transparentBlack, 100, 0, canvas.width-200, canvas.height);ctx.drawImage(launcherTitle, 180, 25, canvas.width-370, canvas.height-278);
ctx.drawImage(launcherText, 150, 200, Math.floor(canvas.width-301), Math.floor(canvas.height-424));
ctx2.drawImage(launchButton, Math.floor(canvas.width/2)-150/2, 240, 150, 35);ctx.drawImage(cvs2, 0, 0, canvas.width, canvas.height);
}
let wx_size = 1000;let wy_size = 680;let wx = (window.outerWidth/2) - (wx_size/2);let wy = (window.outerHeight/2) - (wy_size/4);
document.addEventListener("mousemove", function(event) {
	mouseX = event.offsetX;mouseY = event.offsetY;mol=false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);ctx.drawImage(launcherBackground, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(transparentBlack, 100, 0, canvas.width-200, canvas.height);ctx.drawImage(launcherTitle, 180, 25, canvas.width-370, canvas.height-278);
	ctx.drawImage(launcherText, 150, 200, Math.floor(canvas.width-301), Math.floor(canvas.height-424));
	ctx2.clearRect(Math.floor(canvas.width/2)-150/2, 240, 150, 35);
	if (mouseX > Math.floor(canvas.width/2)-150/2 && mouseX < Math.floor(canvas.width/2)-150/2+150 && mouseY > 240 && mouseY < 275) {
		ctx2.drawImage(transparentBlack, Math.floor(canvas.width/2)-150/2, 240, 150, 35);mol=true; 
	}
	ctx2.drawImage(launchButton, Math.floor(canvas.width/2)-150/2, 240, 150, 35);ctx.drawImage(cvs2, 0, 0, canvas.width, canvas.height);
});
document.addEventListener("mousedown", function(event) {
	if (event) {if (mol) {window.open("game/Tapclank/index.html", 'Tapclank', 'width='+wx_size+',height='+wy_size+',left='+wx+', top='+wy+''); mol=false; }}
});
