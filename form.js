let pause = false;
var number = 0;

document.getElementById("pause").onclick = function () {
  if (pause) {
    pause = false;
  } else {
    pause = true;
  }
};

document.getElementById("next").onclick = function () {
  number += 1;
  if (number > balls.length) {
    number = 1;
  }
  document.getElementById("ballNum").innerHTML = "Ball " + String(number);
  clearForm();
};
document.getElementById("back").onclick = function () {
    number -= 1;
    if (number <= 0) {
      number = balls.length;
    }
    document.getElementById("ballNum").innerHTML = "Ball " + String(number);
    clearForm();
  };
  document.getElementById("reset").onclick = function () {
    balls.length = 0;
  };

function formDisplay() {
  if (pause == false) {
    if (number != 0) {
      document.getElementById("x").value = balls[number - 1].xpos;
      document.getElementById("y").value = balls[number - 1].ypos;
      document.getElementById("xv").value = balls[number - 1].xvel;
      document.getElementById("yv").value = balls[number - 1].yvel;
      document.getElementById("m").value = balls[number - 1].mass;
      document.getElementById("k").value = balls[number - 1].k;
      document.getElementById("r").value = balls[number - 1].rad;
    }
  } else {
    if (number==0){number=1;}
    balls[number-1].xpos = parseInt(document.getElementById('x').value);
    balls[number-1].ypos = parseInt(document.getElementById('y').value);
    balls[number-1].xvel = parseInt(document.getElementById('xv').value);
    balls[number-1].yvel = parseInt(document.getElementById('yv').value);
    balls[number-1].k = parseInt(document.getElementById('k').value);
    balls[number-1].mass = parseInt(document.getElementById('m').value);
    balls[number-1].rad = parseInt(document.getElementById('r').value);
  }
}

function clearForm() {
    document.getElementById("x").value = balls[number - 1].xpos;
    document.getElementById("y").value = balls[number - 1].ypos;
    document.getElementById("xv").value = balls[number - 1].xvel;
    document.getElementById("yv").value = balls[number - 1].yvel;
    document.getElementById("m").value = balls[number - 1].mass;
    document.getElementById("k").value = balls[number - 1].k;
    document.getElementById("r").value = balls[number - 1].rad;
  }
  