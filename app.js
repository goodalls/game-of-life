//x is horizontal y is vertical

// let height = (document.querySelector("canvas").height = innerHeight);
// let width = (document.querySelector("canvas").width = innerWidth);
let height = 500;
let width = 500;

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
let objectArray = [];

function Cell(x, y, alive) {
  this.x = x;
  this.y = y;
  this.alive = alive === 1 ? true : false;
  this.nextAlive = false;
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
      y += 4;
    }
    x += 4;
  }
}

if (objectArray.length <= 1) {
  createBoard();
}

function square(x, y, alive) {
  ctx.fillRect(x, y, 5, 5);
  ctx.fillStyle = alive ? "black" : "white";
  ctx.stroke();
}

function checkSurrounding(object1) {
  let numAlive = 0;
  objectArray.forEach((object2) => {
    //check surrounding 8 cells around object1
    //upper left cell
    if (object1.x - 5 === object2.x && object1.y - 5 === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //upper middle cell
    if (object1.x === object2.x && object1.y - 5 === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //upper right cell
    if (object1.x + 5 === object2.x && object1.y - 5 === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //left of object cell
    if (object1.x - 5 === object2.x && object1.y === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //right of object cell
    if (object1.x + 5 === object2.x && object1.y === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //lower left cell
    if (object1.x - 5 === object2.x && object1.y + 5 === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //lower middle cell
    if (object1.x === object2.x && object1.y + 5 === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //lower right cell
    if (object1.x + 5 === object2.x && object1.y + 5 === object2.y) {
      if (object2.alive === true) {
        numAlive++;
      }
    }
    //check that the cell is not the cell we are testing
    if (object1.x === object2.x && object1.y === object2.y) {
      if (object2.alive === true) {
        //do nothing, dont count this cell
      }
    }
  });
  if (numAlive === 2 || numAlive === 3) {
    object1.alive = true;
  }  else {
    object1.alive = false;
  }
}

function recreateBoard() {
  objectArray.forEach((object) => {
    square(object.x, object.y, object.alive);
  });
}
function gameLoop() {
  //loop through objectArray to test for Neibours
  objectArray.forEach((object) => {
    checkSurrounding(object);
  });

  // update objectArray
  // let count = 0;
  // for (let i = 0; i < objectArray.length; i++) {
  //   objectArray[i].alive = objectArray[i].nextAlive;
  //   if (objectArray[i].nextAlive) {
  //     count++;
  //   }
  // }

  //clear Canvas
  ctx.clearRect(0, 0, width, height);

  //and redraw
  recreateBoard();

  //recall gameLoop function with setTimeout + Conditional 50% DEAD CELLS
  setTimeout(() => {
    window.requestAnimationFrame(gameLoop);
}, 50);
console.log('tick');
}
document.querySelector("canvas").addEventListener("click", ()=>{window.requestAnimationFrame(gameLoop)});
