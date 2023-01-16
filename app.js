const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resolution = 5;
canvas.width = 800;
canvas.height = 800;

const columns = canvas.width / resolution;
const rows = canvas.height / resolution;

function buildGrid() {
  return new Array(columns)
    .fill(null)
    .map(() =>
      new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
    );
}

let grid = buildGrid();

requestAnimationFrame(update);

function update() {
  grid = nextGen(grid);
  render(grid);
  setTimeout(() => {
    requestAnimationFrame(update);
  }, 100);
}
function nextGen(grid) {
  //makes exact copy of grid array
  const nextGen = grid.map((arr) => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x = col + i;
          const y = row + j;
          if (x >= 0 && y >= 0 && x < columns && y < rows) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }
      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
    }
  }
}
