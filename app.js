const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

let resolution = 10;
let height = (c.height = 800);
let width = (c.width = 800);

let objectArray = [];

function Cell(x, y, alive) {
  this.x = x;
  this.y = y;
  this.alive = alive === 1 ? true : false;
  this.nextAlive = alive;
}

function createBoard() {
  //   let width = c.width;
  //   let height = c.height;
  let x = 0;
  let y = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let alive = Math.floor(Math.random() * 2);
      objectArray.push(new Cell(x, y, alive));
      square(x, y, alive);
      y += resolution - 1;
    }
    x += resolution - 1;
  }
}

if (objectArray.length <= 1) {
  createBoard();
}

function square(x, y, alive) {
  ctx.fillRect(x, y, resolution, resolution);
  ctx.fillStyle = alive ? "black" : "white";
  ctx.stroke();
}

function checkSurrounding(object1) {
  let numAlive = 0;
  objectArray.forEach((object2) => {
    //check surrounding 8 cells around object1
    //upper left cell
    if (
      object1.x - resolution === object2.x &&
      object1.y - resolution === object2.y
    ) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //upper middle cell
    if (object1.x === object2.x && object1.y - resolution === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //upper right cell
    if (
      object1.x + resolution === object2.x &&
      object1.y - resolution === object2.y
    ) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //left of object cell
    if (object1.x - resolution === object2.x && object1.y === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //right of object cell
    if (object1.x + resolution === object2.x && object1.y === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //lower left cell
    if (
      object1.x - resolution === object2.x &&
      object1.y + resolution === object2.y
    ) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //lower middle cell
    if (object1.x === object2.x && object1.y + resolution === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //lower right cell
    if (
      object1.x + resolution === object2.x &&
      object1.y + resolution === object2.y
    ) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
  });
  return numAlive;
}

function gameLoop() {
  let count = 0;
  //loop through objectArray to test for Neibours apply rules
  objectArray.forEach((object) => {
    let numAlive = checkSurrounding(object);

    if (numAlive === 2) {
      //keeps current state
      object.nextAlive = object.alive
    } else if (numAlive === 3) {
      //becomes alive
      object.nextAlive = true;
    } else {
      //all else die from under or over population
      object.nextAlive = false;
    }
  });
  //clear Canvas
  ctx.clearRect(0, 0, width, height);

  //update objectArray with nextAlive for next generation.
  objectArray.forEach((object) => {
    object.alive = object.nextAlive;
    //and redraw
    square(object.x, object.y, object.alive);
  });

  //recall gameLoop function with setTimeout + Conditional 80% DEAD CELLS
  if (count < objectArray.length * 0.8) {
    setTimeout(() => {
      window.requestAnimationFrame(gameLoop);
    }, 100);
  }
}
document.querySelector("canvas").addEventListener("click", () => {
  window.requestAnimationFrame(gameLoop);
});
