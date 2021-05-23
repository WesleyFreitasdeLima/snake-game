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

    this.autoMove();
  },

  autoMove() {
    this.move();
    this.checkBorderCollision();
    this.checkAutoCollision();
    this.checkPreyCollision();
  },

  move() {
    let currentPosX = this.chunks[0].x;
    let currentPosY = this.chunks[0].y;

    if (this.direction === "right") currentPosX += block;
    if (this.direction === "left") currentPosX -= block;
    if (this.direction === "up") currentPosY -= block;
    if (this.direction === "down") currentPosY += block;

    const newSnakeChunk = { x: currentPosX, y: currentPosY };
    this.chunks.unshift(newSnakeChunk);
  },

  checkBorderCollision() {
    if (this.chunks[0].x >= 16 * block) this.chunks[0].x = 0;
    if (this.chunks[0].x < 0) this.chunks[0].x = 16 * block;
    if (this.chunks[0].y >= 16 * block) this.chunks[0].y = 0;
    if (this.chunks[0].y < 0) this.chunks[0].y = 16 * block;
  },

  checkPreyCollision() {
    if (
      this.chunks[0].x === prey.position.x &&
      this.chunks[0].y === prey.position.y
    ) {
      this.eat();
    } else {
      this.chunks.pop();
    }
  },

  checkAutoCollision() {
    for (let index = 1; index < this.chunks.length; index++) {
      if (
        this.chunks[0].x === this.chunks[index].x &&
        this.chunks[0].y === this.chunks[index].y
      ) {
        this.die();
      }
    }
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

  eat() {
    prey.alive = false;

    game.score += 1;
    document.getElementById("score").innerHTML = game.score;

    this.chunks.unshift();
  },

  die() {
    alert("YOU DIE!");

    game.lives -= 1;
    document.getElementById("lives").innerHTML = game.lives;

    if (game.lives > 0) {
      this.respawn();
    } else {
      game.gameOver();
    }
  },

  respawn() {
    while (this.chunks.length > 2) {
      this.chunks.pop();
    }
    this.chunks[0] = { x: 8 * block, y: 8 * block };
    game.score = 0;
    document.getElementById("score").innerHTML = game.score;
  },
};

const prey = {
  color: "#50bd47",
  position: {
    x: 0,
    y: 0,
  },
  alive: false,
  randomPosition() {
    return Math.floor(Math.random() * 16) * block;
  },
  render() {
    if (this.alive === false) {
      this.position.x = this.randomPosition();
      this.position.y = this.randomPosition();
      this.alive = true;
    }

    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, block, block);
  },
};

const game = {
  score: 0,
  lives: 3,
  session: null,
  start() {
    return setInterval(() => {
      backdrop.render();
      snake.render();
      prey.render();
    }, 100);
  },
  gameOver() {
    alert("GAME OVER!");
    clearInterval(this.session);
  },
  saveScore(score){
    this.score.push(score);
    localStorage.setItem('bestScores', JSON.parse(this.bestScores));
  }
};

game.session = game.start();
