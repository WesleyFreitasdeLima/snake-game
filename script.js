const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

const block = 32;

const backdrop = {
  position: {
    x: 0,
    y: 0,
  },
  dimension: {
    width: 16 * block,
    height: 16 * block,
  },
  color: "#89c4ff",
  render() {
    context.fillStyle = this.color;
    context.fillRect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  },
};

const snake = {
  direction: "right",
  chunks: [{ x: 8 * block, y: 8 * block }],
  color: {
    head: "#001e3b",
    body: "#004589",
  },
  render() {
    document.addEventListener("keydown", this.changeDirection);

    for (let index = 0; index < this.chunks.length; index++) {
      context.fillStyle = index === 0 ? this.color.head : this.color.body;
      context.fillRect(
        this.chunks[index].x,
        this.chunks[index].y,
        block,
        block
      );
    }
  },
  autoMove() {
    let currentPosX = this.chunks[0].x;
    let currentPosY = this.chunks[0].y;

    if (this.direction === "right") currentPosX += block;
    if (this.direction === "left") currentPosX -= block;
    if (this.direction === "up") currentPosY -= block;
    if (this.direction === "down") currentPosY += block;

    const newSnakeChunk = { x: currentPosX, y: currentPosY };

    this.chunks.pop();
    this.chunks.unshift(newSnakeChunk);

    // Fix position on borders
    if (this.chunks[0].x >= 16 * block) this.chunks[0].x = 0;
    if (this.chunks[0].x < 0) this.chunks[0].x = 16 * block;
    if (this.chunks[0].y >= 16 * block) this.chunks[0].y = 0;
    if (this.chunks[0].y < 0) this.chunks[0].y = 16 * block;
  },
  changeDirection(event) {
    if (event.keyCode === 37 && snake.direction !== "right")
      snake.direction = "left";
    if (event.keyCode === 38 && snake.direction !== "down")
      snake.direction = "up";
    if (event.keyCode === 39 && snake.direction !== "left")
      snake.direction = "right";
    if (event.keyCode === 40 && snake.direction !== "up")
      snake.direction = "down";
  },
};

const prey = {
  color: "#50bd47",
  randomPosition() {
    return Math.floor(Math.random() * 16) * block;
  },
  render() {
    context.fillStyle = this.color;
    context.fillRect(this.randomPosition(), this.randomPosition(), block, block);
  },
};

function startGame() {
  return setInterval(() => {
    backdrop.render();
    snake.render();
    snake.autoMove();
    prey.render();
  }, 300);
}

startGame();
