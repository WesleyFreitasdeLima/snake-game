const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

const block = 32;
const snake = {
  direction: "right",
  chunks: [{ x: 8 * block, y: 8 * block }],
};

function renderBackdrop() {
  const startPosX = 0;
  const startPosY = 0;
  const width = 16 * block;
  const height = 16 * block;

  context.fillStyle = "#89c4ff";
  context.fillRect(startPosX, startPosY, width, height);
}

function renderSnake() {
  for (let index = 0; index < snake.chunks.length; index++) {
    const width = block;
    const height = block;

    const headColor = "#001e3b";
    const bodyColor = "#004589";

    context.fillStyle = index === 0 ? headColor : bodyColor;
    context.fillRect(
      snake.chunks[index].x,
      snake.chunks[index].y,
      width,
      height
    );
  }
}

function autoMoveSnake() {
  let currentPosX = snake.chunks[0].x;
  let currentPosY = snake.chunks[0].y;

  if (snake.direction === "right") currentPosX += block;
  if (snake.direction === "left") currentPosX -= block;
  if (snake.direction === "up") currentPosY -= block;
  if (snake.direction === "down") currentPosY += block;

  const newSnakeChunck = { x: currentPosX, y: currentPosY };

  snake.chunks.pop();
  snake.chunks.unshift(newSnakeChunck);
}

function startGame() {
  return setInterval(() => {
    renderBackdrop();
    renderSnake();
    autoMoveSnake();
  }, 300);
}

startGame();
