function Circle(xpos_, ypos_, mass_, rad_, xvel_, yvel_, kval_, color_, number_) {
  this.xpos = xpos_;
  this.ypos = ypos_;
  this.mass = mass_;
  this.rad = rad_;
  this.xvel = xvel_;
  this.yvel = yvel_;
  this.k = kval_;
  this.color = color_;
  this.number = number_;

  this.accelX = 0;
  this.accelY = 0;
  this.fnetX = 0;
  this.fnetY = 0;
  this.fspringX = 0;
  this.fspringY = 0;

  this.updatePos = function (dt) {
    this.xpos += this.xvel * dt;
    this.ypos += this.yvel * dt;
  };

  this.updateVel = function (dt) {
    this.xvel += this.accelX * dt;
    this.yvel += this.accelY * dt;
  };

  this.updateAccel = function () {
    this.accelX = this.fnetX / this.mass;
    this.accelY = this.fnetY / this.mass;
  };

  this.updateAccel = function () {
    this.accelX = this.fnetX / this.mass;
    this.accelY = this.fnetY / this.mass;
  };

  this.springForce = function (overlapX, overlapY) {
    this.fspringX = this.k * overlapX;
    this.fspringY = this.k * overlapY;
  };

  this.netForce = function () {
    this.fnetX = this.fspringX;
    this.fnetY = this.fspringY;
  };
}

function findOverlap(A, B) {
  var dx = A.xpos - B.xpos;
  var dy = A.ypos - B.ypos;
  var R = A.rad + B.rad;
  var d = Math.sqrt(dx * dx + dy * dy);
  var overlapMag = R - d;

  var thetaA = Math.atan2(dy, dx);
  var thetaB = Math.atan2(-dy, -dx);
  var ret = new Array(4);
  ret[0] = overlapMag * Math.cos(thetaA);
  ret[1] = overlapMag * Math.sin(thetaA);
  ret[2] = overlapMag * Math.cos(thetaB);
  ret[3] = overlapMag * Math.sin(thetaB);

  return ret;
}

function didCollide(A, B) {
  var dx = A.xpos - B.xpos;
  var dy = A.ypos - B.ypos;
  var R = A.rad + B.rad;
  if (Math.sqrt(dx * dx + dy * dy) <= R) {
    return true;
  }
  return false;
}

function ballCollision(dt) {
  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < balls.length; j++) {
      if (j != i && didCollide(balls[i], balls[j])) {
        var o = findOverlap(balls[i], balls[j]);

        balls[i].springForce(o[0], o[1]);
        balls[j].springForce(o[2], o[3]);

        balls[i].netForce();
        balls[j].netForce();

        balls[i].updateAccel();
        balls[j].updateAccel();

        balls[i].updateVel(dt);
        balls[j].updateVel(dt);
      }
    }
    balls[i].updatePos(dt);
  }
}

function wallCollision(dt) {
  for (var i = 0; i < balls.length; i++) {
    dx = balls[i].xvel * dt;
    dy = balls[i].yvel * dt;
    if (
      balls[i].xpos - balls[i].rad + dx < 0 ||
      balls[i].xpos + balls[i].rad + dx > bgd.width
    ) {
      balls[i].xvel *= -1;
    }
    if (
      balls[i].ypos - balls[i].rad + dy < 0 ||
      balls[i].ypos + balls[i].rad + dy > bgd.height
    ) {
      balls[i].yvel *= -1;
    }
    if (balls[i].ypos + balls[i].rad > bgd.height) {
      balls[i].ypos = bgd.height - balls[i].rad;
    }
    if (balls[i].ypos - balls[i].rad < 0) {
      balls[i].ypos = balls[i].rad;
    }
    if (balls[i].xpos + balls[i].rad > bgd.width) {
      balls[i].xpos = bgd.width - balls[i].rad;
    }
    if (balls[i].xpos - balls[i].rad < 0) {
      balls[i].xpos = balls[i].rad;
    }
  }
}
