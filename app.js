document.querySelector("canvas").height = innerHeight;
document.querySelector("canvas").width = innerWidth;
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
// const objectTest = [
//   (x - 5, y),
//   (x + 5, y),
//   (x, y - 5),
//   (x, y + 5),
//   (x - 5, y + 5),
//   (x - 5, y - 5),
//   (x + 5, y + 5),
//   (x + 5, y - 5),
// ];
let objectArray = [];
let objectTest = [];

function createBoard() {
  let height = c.height;
  let width = c.width;
  let x = 0;
  let y = 0;
  let cells = Math.floor((height * width) / 5); // each cell is 5px
  console.log(height, width);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let alive = Math.floor(Math.random() * 2);
      objectArray.push(new Cell(x, y, 0, alive));
      square(x, y, alive);
      y += 5;
      console.log(alive);
    }
    x += 5;
  }
}
createBoard();

function square(x, y, alive) {
  ctx.fillRect(x, y, 5, 5);
  ctx.fillStyle = alive === 1 ? "black" : "white";
  ctx.stroke();
}

function test() {
  for (let x = 0; x < objectArray.length; x++) {
    const object = objectArray[x];
    for (let i = 0; i < objectTest.length; i++) {
      const objectTest = object[i];
      //test the 8 objects surrounding
    }
  }
}

function Cell(x, y, neibors, alive) {
  this.x = x;
  this.y = y;
  this.neibors = neibors;
  this.alive = alive;
}
