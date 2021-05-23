const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

const block = 32;
const snake = [];

function renderBackdrop() {
  const startPosX = 0;
  const startPosY = 0;
  const width = 16 * block;
  const height = 16 * block;

  context.fillStyle = "#004589";
  context.fillRect(startPosX, startPosY, width, height);
}

function renderSnake() {
  snake[0] = {
    x: 8 * block,
    y: 8 * block,
  };

  for (let index = 0; index < snake.length; index++) {
    const width = block;
    const height = block;

    context.fillStyle = "#001e3b";
    context.fillRect(snake[index].x, snake[index].y, width, height);
  }
}

renderBackdrop();
renderSnake();
