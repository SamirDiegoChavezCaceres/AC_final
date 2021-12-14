const scoreDisplay = document.getElementById('score')
const startButton = document.getElementById('start-button')
const width = 28
let score = 0
let gameOverId
let checkWinId
//pacman
let leftId
let rightId
let upId
let downId
//ghost
let leftIdG
let rightIdG
let upIdG
let downIdG

const grid = document.querySelector('.grid')
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const squares = []

//create your board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    //add layout to the board
    if(layout[i] === 0) {
      squares[i].classList.add('pac-dot')
      squares[i].innerHTML = '.'
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    }
  }
}
createBoard()

//startGameMulti
function startGame() {
  //move the Ghosts randomly
  //ghosts.forEach(ghost => moveGhost(ghost))
  //ghosts.forEach(ghost => {moveGhostT(ghost),document.addEventListener('keyup',moveGhostT)})
  
  document.addEventListener('keyup',moveGhostE)
  
  //document.addEventListener('keyUp',movePacman)
  checkWinId = setInterval(checkForWin, 100)
  gameOverId = setInterval(checkForGameOver, 100)
}
startButton.addEventListener('click', startGame)

//create Characters
//draw pacman onto the board
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pac-man')
squares[pacmanCurrentIndex].classList.add('pac-man-right')

function removePacman() {
  squares[pacmanCurrentIndex].classList.remove('pac-man')
  squares[pacmanCurrentIndex].classList.remove('pac-man-right')
  squares[pacmanCurrentIndex].classList.remove('pac-man-left')
  squares[pacmanCurrentIndex].classList.remove('pac-man-down')
  squares[pacmanCurrentIndex].classList.remove('pac-man-up')
}

function goLeft() {
  clearInterval(rightId)
  clearInterval(upId)
  clearInterval(downId)
  leftId = setInterval(function () {
    if (
    squares[pacmanCurrentIndex -1].classList.contains('wall') ||
    squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
    ) {
      clearInterval(leftId)
    } else {
      removePacman()
      pacmanCurrentIndex -= 1
      if (squares[pacmanCurrentIndex -1] === squares[363]) {
        pacmanCurrentIndex = 391
      }
      pacDotEaten()
      powerPelletEaten()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    squares[pacmanCurrentIndex].classList.add('pac-man-left')
  }, 500)
}

function goRight() {
  clearInterval(leftId)
  clearInterval(upId)
  clearInterval(downId)
  rightId = setInterval(function () {
    if(
      squares[pacmanCurrentIndex +1].classList.contains('wall') ||
      squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
    ) {
      clearInterval(rightId)
    } else {
      removePacman()
      pacmanCurrentIndex += 1
      if (squares[pacmanCurrentIndex +1] === squares[392]) {
        pacmanCurrentIndex = 364
      }
      pacDotEaten()
      powerPelletEaten()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    squares[pacmanCurrentIndex].classList.add('pac-man-right')
  }, 500)
}

function goUp() {
  clearInterval(rightId)
  clearInterval(leftId)
  clearInterval(downId)
  upId = setInterval(function () {
  if(
    squares[pacmanCurrentIndex -width].classList.contains('wall') ||
    squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
    ) {
      clearInterval(upId)
    } else {
      removePacman()
      pacmanCurrentIndex -= width
      squares[pacmanCurrentIndex].classList.add('pac-man')
      squares[pacmanCurrentIndex].classList.add('pac-man-up')
      pacDotEaten()
      powerPelletEaten()
    }
  }, 500)
}

function goDown() {
  clearInterval(rightId)
  clearInterval(upId)
  clearInterval(leftId)
  downId = setInterval(function () {
    if (
      squares[pacmanCurrentIndex +width].classList.contains('wall') ||
      squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
    ) {
      clearInterval(downId)
    } else {
      removePacman()
      pacmanCurrentIndex += width
      squares[pacmanCurrentIndex].classList.add('pac-man')
      squares[pacmanCurrentIndex].classList.add('pac-man-down')
      pacDotEaten()
      powerPelletEaten()
    }
  }, 500)
}

//move pacman
function movePacman(e) {
  switch(e.keyCode) {
    case 37:
       goLeft()
      break
    case 38:
        goUp()
      break
    case 39:
        goRight()
      break
    case 40:
        goDown()
      break
  }
}

// what happens when you eat a pac-dot
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    squares[pacmanCurrentIndex].innerHTML = ''
  }
}

//what happens when you eat a power-pellet
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    score +=10
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhosts, 10000)
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
  }
}

//make the ghosts stop flashing
function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
}

//create ghosts using Constructors
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

//all my ghosts
ghosts = [
  new Ghost('blinky', 350, 250),
  ]
  
singleGhosts = [
  //mas fantasmas
  new Ghost('blinky', 350, 250),
  ]
//draw my ghosts onto the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
  })

//1 solo jugador
function moveGhost(ghost) {
  const directions =  [-1, +1, width, -width]

  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function() {
    //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
    if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
        //remove the ghosts classes
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        //move into that space
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    //else find a new random direction ot go in
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is currently scared and pacman is on it
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score +=100
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
  }, ghost.speed)
}


//pacman event
function moveGhostE(e){
  switch(e.keyCode) {
    case 37:
        goLeftG() // listo
      break
    case 38:
        goUpG() // listo
      break
    case 39:
        goRightG() // listo
      break
    case 40:
        goDownG() // listo
      break
  }
}

function goUpG() {
  clearInterval(rightIdG)
  clearInterval(leftIdG)
  clearInterval(downIdG)
  upIdG = setInterval(function () {
    if (!squares[ghosts[0].currentIndex - width].classList.contains('wall') ||
        squares[ghosts[0].currentIndex - width].classList.contains('ghost-lair') ) {
        //remove the ghosts classes
        squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
        squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')
        //move into that space
        ghosts[0].currentIndex -= width
        squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost')
    } else {
      clearInterval(upIdG)
    }
  }, 500)
}

function goRightG() {
  clearInterval(leftIdG)
  clearInterval(upIdG)
  clearInterval(downIdG)
  rightIdG = setInterval(function () {
    //Si a donde el fantasma vaya a moverse no es una pared o su guarida
    if(!squares[ghosts[0].currentIndex +1].classList.contains('wall') ||
    squares[ghosts[0].currentIndex +1].classList.contains('ghost-lair') 
    ) {
      //se movera
      //remove the ghosts classes
      squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
      squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')
      //move into that space
      ghosts[0].currentIndex += 1
      if (squares[ghosts[0].currentIndex +1] === squares[392]) {
        ghosts[0].currentIndex = 364
      }
      squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost')
      
    } else {
      //en caso contrario dejara de moverse
      clearInterval(rightIdG)
    }
  }, 500)
}

function goDownG() {
  clearInterval(rightIdG)
  clearInterval(upIdG)
  clearInterval(leftIdG)
  downIdG = setInterval(function () {
    if (!squares[ghosts[0].currentIndex + width].classList.contains('wall') ||
        squares[ghosts[0].currentIndex + width].classList.contains('ghost-lair')
    ) {
      squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
      squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')

      ghosts[0].currentIndex += width
      squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost')
      
    } else {
      clearInterval(downIdG)
    }
  }, 500)
}

function goLeftG() {
  clearInterval(rightIdG)
  clearInterval(upIdG)
  clearInterval(downIdG)
  leftIdG = setInterval(function () {
    if (
      !squares[ghosts[0].currentIndex - 1].classList.contains('wall') ||
      squares[ghosts[0].currentIndex - 1].classList.contains('ghost-lair')
    ) {
      squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
      squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')

      ghosts[0].currentIndex -= 1
      if (squares[ghosts[0].currentIndex - 1] === squares[363]) {
        ghosts[0].currentIndex = 391
      }
      squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost')
    } else {
      clearInterval(leftIdG)
    }
  }, 500)
}

//check for a game over
function checkForGameOver() {
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //document.removeEventListener('keyup', movePacman)
    document.removeEventListener('keyup', moveGhostE)
    clearInterval(rightIdG)
    clearInterval(leftIdG)
    clearInterval(downIdG)
    clearInterval(upIdG)
    removePacman()
    scoreDisplay.innerHTML = 'YOU LOSE!'
    clearInterval(gameOverId)
    clearInterval(checkWinId)
  }
}

//check for a win - more is when this score is reached
function checkForWin() {
  if (score > 274) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'YOU WIN!'
    clearInterval(gameOverId)
    clearInterval(checkWinId)
  }
}

// recocimiento en español
let rec;
if (!("webkitSpeechRecognition" in window)) {
  alert("disculpas, no puedes usar la API");

} 
else {
  rec = new webkitSpeechRecognition();
  rec.lang = "es-AR";
  rec.continuous = true;
  rec.interim = true;
  rec.addEventListener("result",iniciar);
}

function iniciar(event){
  for (let i = event.resultIndex; i < event.results.length; i++){
    console.log(event.results[i][0].transcript);
    let resultado = event.results[i][0].transcript;
    if(resultado.includes("izquierda")){
      goLeft();
    }
    if(resultado.includes("derecha")){
      goRight();
    }
    if(resultado.includes("arriba")){
      goUp();
    }
    if(resultado.includes("abajo")){
      goDown();
    }
    if(resultado.includes("empezar")){
      startGame()
    }
    //document.getElementById('texto').innerHTML = event.results[i][0].transcript;
  }
}

rec.start();

