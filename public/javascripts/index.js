document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("start-game-btn");
  startGameButton.addEventListener("click", (event) => {
    document.getElementById("welcome").style.display = "none";
    startGame();
    document.getElementById("board").style.display = "flex";
    document.getElementById("score-board").style.display = "block";
  });

  const endGame = document.getElementById("end-game");
  endGame.addEventListener("click", (e) => {
    document.getElementById("welcome").style.display = "block";
    document.getElementById("board").style.display = "none";
    document.getElementById("score-board").style.display = "none";
    document.getElementById("pop-up").style.display = "none";
    document.getElementById("countdown").style.display = "none";
  });

  function startGame() {
    const board = document.getElementById("board");
    const displayScore = document.getElementById("score");
    const dimension = 8;
    const squares = [];
    let score = 0;
    const staringtime = 1;
    let time = staringtime * 60;
    const countDown = document.getElementById("countdown");
    const popUp = document.getElementById("pop-up-content");

    const Colors = ["red", "yellow", "orange", "purple", "green", "blue"];

    // Reset state
    countDown.innerHTML = "";
    popUp.innerHTML = "";
    board.innerHTML = "";
    displayScore.innerHTML = "";

    let gridIdtoColor = {
      0: 0,
      1: 1,
      2: 1,
      3: 0,
    };

    let updateTimeId = setInterval(updateTime, 1000);
    function updateTime() {
      time--;
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      countDown.innerHTML = `${minutes}: ${seconds}`;
      if (time === 0) {
        clearInterval(updateTimeId);
        document.getElementById("pop-up").style.display = "block";
        popUp.innerHTML = `You failed Score: ${score}`;
      }
    }

    function createBoard() {
      for (let i = 0; i < dimension * dimension; i++) {
        const square = document.createElement("div");
        square.setAttribute("id", i);
        let randomColor = Math.floor(Math.random() * Colors.length);
        gridIdtoColor[i] = randomColor;
        square.style.backgroundColor = Colors[randomColor];
        board.appendChild(square);
        squares.push(square);
      }
    }

    createBoard();

    squares.forEach((square) => square.addEventListener("click", matchPrev));
    let prev = null;
    function matchPrev(e) {
      e.preventDefault();
      let id = e.target.id;
      if (prev !== null) {
        if (prev[0] === gridIdtoColor[id]) {
          let prevPostion = [
            Math.floor(prev[1] / dimension),
            prev[1] % dimension,
          ];
          let currentPosition = [Math.floor(id / dimension), id % dimension];
          let node =
            (prevPostion[0] + 1) * (dimension + 2) + (prevPostion[1] + 1);
          let target =
            (currentPosition[0] + 1) * (dimension + 2) +
            (currentPosition[1] + 1);
          let newBoard = Array(dimension + 2)
            .fill(null)
            .map(() => Array(dimension + 2).fill(0));
          for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
              let square = squares[i * dimension + j];
              if (square.style.backgroundColor !== "") {
                newBoard[i + 1][j + 1] = 1;
              }
            }
          }
          if (node !== target && dfs(node, target, newBoard)) {
            score += 4;
            displayScore.innerHTML = score;
            squares[prev[1]].style.backgroundColor = "";
            e.target.style.backgroundColor = "";
            if (squares.every((e) => e.style.backgroundColor === "")) {
              document.getElementById("pop-up").style.display = "block";
              popUp.innerHTML = `You won the game! Score: ${score}`;
            }
          }
        }
        prev = null;
      } else {
        prev = [gridIdtoColor[id], id];
      }
    }
  }
});

function dfs(node, target, board, visited = []) {
  if (visited.includes(node)) {
    return false;
  }
  if (node === target) {
    return true;
  }
  visited.push(node);

  let position = [Math.floor(node / board.length), node % board.length];
  let neighbors = [
    [position[0] + 1, position[1]],
    [position[0], position[1] + 1],
    [position[0] - 1, position[1]],
    [position[0], position[1] - 1],
  ];

  for (let i = 0; i < neighbors.length; i++) {
    let x = neighbors[i][0];
    let y = neighbors[i][1];
    let neighborId = x * board.length + y;
    if (
      x < board.length &&
      x >= 0 &&
      y < board.length &&
      y >= 0 &&
      (board[x][y] === 0 || neighborId === target)
    ) {
      if (dfs(neighborId, target, board, visited)) {
        return true;
      }
    }
  }
  return false;
}
