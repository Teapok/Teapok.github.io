var degrees = 60; 
var degrees2 = -60; 
var timesRun = 0; 
document.querySelector('.ball').onclick = function start(){ 
runner = setInterval(function(){ 
degrees--; 
degrees2++; 
document.querySelector('.last').style.webkitTransform = 'rotate(' + degrees2 + 'deg)'; 
document.querySelector('.first').style.webkitTransform = 'rotate(' + degrees + 'deg)'; 
timesRun += 1; 
if(timesRun === 60){ 
clearInterval(runner); 
 degrees = 60; 
 degrees2 = -60; 
 timesRun = 0; 
} 
},180) 
}