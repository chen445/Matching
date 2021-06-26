
class SoundManager {
    constructor() {
        this.clickSound = new Audio("./sounds/clicksound.wav");
        this.connectSuccess = new Audio("./sounds/connect.mp3");
        this.win = new Audio("./sounds/winning.mp3");
        this.fail = new Audio('./sounds/fail.mp3');
        this.background= new Audio("./sounds/backgroundmusic.mp3")
    }
    
    playClick() {
        this.clickSound.currentTime = 0;
        this.clickSound.volume = 0.3;
        this.clickSound.play();
    }

    playConnect(){ 
        this.connectSuccess.currentTime = 0;
        this.connectSuccess.volume = 0.3;
        this.connectSuccess.play();
    }

    playSuccess(){
        this.win.currentTime = 0;
        this.win.volume = 0.3;
        this.win.play()
    }
    playbackground(){
        this.background.loop = true
        this.background.play()
    }
    pauseBackground(){
        this.background.pause();
        this.background.currentTime = 0;
    }

    playfail(){
         this.fail.currentTime = 0;
         this.fail.volume = 0.3;
         this.fail.play()
    }

    toggleMute(){
        this.win.muted = !this.win.muted;
        this.background.muted = !this.background.muted;
        this.fail.muted = !this.fail.muted;
        this.connectSuccess.muted = !this.connectSuccess.muted;
        this.clickSound.muted = !this.clickSound.mutedd;
        if (this.background.muted) {
            document.getElementById("audioButton").innerHTML =
              '<i class="bi bi-volume-mute-fill" style="font-size: 35px"></i>';
        } else {
            document.getElementById("audioButton").innerHTML =
              '<i class="bi bi-volume-up-fill"  style="font-size: 35px"></i>';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let soundManager = new SoundManager();
  const startGameButton = document.getElementById("start-game-btn");

  startGameButton.addEventListener("click", (event) => {
    soundManager.playClick();
    soundManager.playbackground();
    document.getElementById("welcome").style.display = "none";
    startGame();
    document.getElementById("board").style.display = "flex";
    document.getElementById("score-board").style.display = "block";
    document.getElementById("countdown").style.display="block"
    document.getElementById("audioButton").style.display="block";
    document.getElementById("happy-face").style.display = "block";
    document.getElementById("pause").style.display="block";
  });

  document.getElementById("audioButton").addEventListener("click", (event) => {
    soundManager.toggleMute();
  })

  function shuffle(arr){
    for(i=arr.length-1; i> 0; i--){
        let randomNum=Math.floor(Math.random() *(i+1));
        let temp = arr[i];
        arr[i] = arr[randomNum];
        arr[randomNum] = temp; 
    }
    return arr
  }

  const endGame = document.getElementById("end-game");
  endGame.addEventListener("click", (e) => {
    soundManager.playClick();
    soundManager.pauseBackground();
    document.getElementById("welcome").style.display = "block";
    document.getElementById("board").style.display = "none";
    document.getElementById("score-board").style.display = "none";
    document.getElementById("pop-up").style.display = "none";
    document.getElementById("countdown").style.display = "none";
    document.getElementById("audioButton").style.display = "none";
     document.getElementById("happy-face").style.display = "none";
      document.getElementById("sad-face").style.display = "none";
      document.getElementById("pause").style.display = "none";
  });
  function startGame() {
    const board = document.getElementById("board");
    const displayScore = document.getElementById("score");
    const dimension = 8;
    const squares = [];
    let score = 0;
    const staringtime = 1.5;
    let time = staringtime * 60;
    const countDown = document.getElementById("countdown");
    const popUp = document.getElementById("pop-up-content");

    const images = [
      "url(./images/img1.png)",
      "url(./images/img2.png)",
      "url(./images/img3.png)",
      "url(./images/img4.png)",
      "url(./images/img5.png)",
      "url(./images/img6.png)",
      "url(./images/img7.png)",
      "url(./images/img8.png)",
      "url(./images/img9.png)",
      "url(./images/img10.png)",
      "url(./images/img11.png)",
      "url(./images/img12.png)",
      "url(./images/img13.png)",
      "url(./images/img14.png)",
      "url(./images/img15.png)",
      "url(./images/img16.png)",
    ];

    // Reset state
    countDown.innerHTML = "";
    popUp.innerHTML = "";
    board.innerHTML = "";
    displayScore.innerHTML = "Score: 0";
    let gamepause = false;

    let gridIdtoImg = { }

    let updateTimeId = setInterval(updateTime, 1000);
    function updateTime() {
      if (gamepause){
          return 
      }
      time--;
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      countDown.innerHTML = `${minutes}: ${seconds}`;
      if (time === 0) {
        soundManager.playfail();
        clearInterval(updateTimeId);
        document.getElementById("pop-up").style.display = "block";
        popUp.innerHTML = `<h4>You failed</h4> <br><br><br> <h5>Your Score: ${score} </h5>`;
      }
    }

     document.getElementById("pause").addEventListener("click", e=>{
         e.preventDefault();
         gamepause =true;
         document.getElementById("pause-pop-up").style.display = "block";
        soundManager.pauseBackground();
        })
     
        document.getElementById("pop-up-play").addEventListener("click", e=>{
          e.preventDefault();
          gamepause = false;
          document.getElementById("pause-pop-up").style.display = "none";
          soundManager.playbackground();
    })
    function createImg(images){
        let newImages = [];
        while(newImages.length < dimension * dimension){
         let randomImg = Math.floor(Math.random() * images.length);
          newImages.push(images[randomImg])
          newImages.push(images[randomImg]);
        }
        return newImages
    }

    let newImages = shuffle(createImg(images));
    
    function createBoard() {
      for (let i = 0; i < dimension * dimension; i++) {
        const square = document.createElement("div");
        square.setAttribute("id", i);
        gridIdtoImg[i] = newImages[i];
        square.style.backgroundImage = newImages[i];
        board.appendChild(square);
        squares.push(square);
      }
    }

    createBoard();
    squares.forEach((square) => square.addEventListener("click", matchPrev));
    let prev = null;
    function matchPrev(e) {
      e.preventDefault();
      soundManager.playClick();
      let id = e.target.id;
      if (prev !== null) {
        if (prev[0] === gridIdtoImg[id]) {
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
              if (square.style.backgroundImage !== "") {
                newBoard[i + 1][j + 1] = 1;
              }
            }
          }
          if (node !== target && dfs(node, target, newBoard)) {
            score += 4;
            displayScore.innerHTML = `Score: ${score}`;
            squares[prev[1]].style.backgroundImage = "";
            e.target.style.backgroundImage = "";
            soundManager.playConnect();
            // display happy face
            document.getElementById("happy-face").style.display = "block";
            document.getElementById("sad-face").style.display = "none";
            if (squares.every((e) => e.style.backgroundImage === "")) {
              soundManager.playSuccess();
              document.getElementById("pop-up").style.display = "block";
              clearInterval(updateTimeId);
              score += time * 10;
              displayScore.innerHTML = `Score: ${score}`;
              popUp.innerHTML = `<div>You won the game!</div> <br><br><br> <h5> Score: ${score}</h5>`;
            }
          } else {
            // display sad face
            document.getElementById("happy-face").style.display = "none";
            document.getElementById("sad-face").style.display = "block";
          }
        } else {
          // display sad face
          document.getElementById("happy-face").style.display = "none";
          document.getElementById("sad-face").style.display = "block";
        }
        const square = document.getElementById(prev[1]);
        square.classList.remove("square-with-board");
        prev = null;
      } else {
        if (e.target.style.backgroundImage !== "") {
          e.target.classList.add("square-with-board");
          prev = [gridIdtoImg[id], id];
        }
      }
    }
  }
});

function dfs(
  node,
  target,
  board,
  visited = [],
  prevPosition = null,
  counter = 0
) {
  if (visited.includes(node)) {
    return false;
  }

  if (counter >= 3) {
    return false;
  }
  
  if (node === target) {
    return true;
  }

  visited.push(node);

  let position = [Math.floor(node / board.length), node % board.length];
  console.log(position[0] + "," + position[1]);
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
      //determine whether if there is a turn
      if (
        prevPosition !== null &&
        prevPosition[0] - x !== 0 &&
        prevPosition[1] - y !== 0
      ) {
          console.log()
        if (dfs(neighborId, target, board, visited, position, counter + 1)) {
            visited.pop()
          return true;
        }
      } else {
        if (dfs(neighborId, target, board, visited, position, counter)) {
            visited.pop();
          return true;
        }
      }
    }
  }
  visited.pop();
  return false;
}
