//x is horizontal y is vertical

document.querySelector("canvas").height = innerHeight;
document.querySelector("canvas").width = innerWidth;
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
let objectArray = [];
let testArray = [];

function Cell(x, y, alive) {
  this.x = x;
  this.y = y;
  this.alive = alive === 1 ? true : false;
  this.neighbor = 0;
}

function createBoard() {
  let width = c.width;
  let height = c.height;
  let x = 0;
  let y = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let alive = Math.floor(Math.random() * 2);
      objectArray.push(new Cell(x, y, alive));
      square(x, y, alive);
      y += 5;
    }
    x += 5;
  }
}

if (objectArray.length <= 1) {
  createBoard();
}

function square(x, y, alive) {
  ctx.fillRect(x, y, 5, 5);
  ctx.fillStyle = alive === 1 ? "black" : "white";
  ctx.stroke();
}

// function test(x, y) {
//   const objectTest = [
//     (x - 5, y),
//     (x + 5, y),
//     (x, y - 5),
//     (x, y + 5),
//     (x - 5, y + 5),
//     (x - 5, y - 5),
//     (x + 5, y + 5),
//     (x + 5, y - 5),
//   ];
// };

function checkSurrounding(object1) {
  let numAlive = 0;
  objectArray.forEach((object2) => {
    if (
      object2.x < object1.x + 5 &&
      object2.x > object1.x - 5 ||
      object2.y < object1.y + 5 &&
      object2.y > object1.y - 5 &&
      object1 != object2
    ) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
  });
  console.log(numAlive);
  if (numAlive === 2 || numAlive === 3) {
    object1.alive = true;
  } else {
    object1.alive = false;
  }
}
