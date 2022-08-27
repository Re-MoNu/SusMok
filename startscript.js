let isRed=false;
function changeColor(tag) {
  let letter = document.getElementById(tag)
  if(isRed){
    letter.style.color = "red";
    letter.style.webkitTextStroke = "2px yellow";
    isRed=false;
  } else {
    letter.style.color = "yellow";
    letter.style.webkitTextStroke = "3px red";
    isRed=true;
  }
}