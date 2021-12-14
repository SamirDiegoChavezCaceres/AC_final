const scoreDisplay = document.getElementById('score')
const startButton = document.getElementById('start-button')
const width = 28
//datos del juego
let score = 0 //puntaje
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
const layout = [ //grid del mapa
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
function createBoard() { //creacion de la tabla
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    //add layout to the board
    if(layout[i] === 0) {
      squares[i].classList.add('pac-dot') //imagen de bolita
      squares[i].innerHTML = '.'
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall') //imagen de pared
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair') //imagen de guarida de fantasmas
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet') //imagen de bolita especial
    }
  }
}
createBoard()

//startGameMulti
function startGame() {
  
  document.addEventListener('keyup',moveGhostE) 
  checkWinId = setInterval(checkForWin, 100) //ciclos para las funciones
  gameOverId = setInterval(checkForGameOver, 100)

  // recocimiento en español
  let rec;
  if (!("webkitSpeechRecognition" in window)) { //para pedir permiso de voz
    alert("disculpas, no puedes usar la API");
  } 
  else {
    rec = new webkitSpeechRecognition();
    rec.lang = "es-AR";
    rec.continuous = true;
    rec.interim = true;
    vozID = setInterval(rec.addEventListener("result",iniciar),500);
  }
  rec.start();
}
startButton.addEventListener('click', startGame)

//create Characters
//draw pacman onto the board
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pac-man')
squares[pacmanCurrentIndex].classList.add('pac-man-right')

function removePacman() { //Quitar la imagen del pacman
  squares[pacmanCurrentIndex].classList.remove('pac-man')
  squares[pacmanCurrentIndex].classList.remove('pac-man-right')
  squares[pacmanCurrentIndex].classList.remove('pac-man-left')
  squares[pacmanCurrentIndex].classList.remove('pac-man-down')
  squares[pacmanCurrentIndex].classList.remove('pac-man-up')
}

function goLeft() { //Movimiento izquierda pacman
  if(leftId!= null){ //En caso de repetir el mismo comando
    clearInterval(leftId)
  }
  clearInterval(rightId)
  clearInterval(upId)     //Se cancela el comando que se encuentra ejecutando
  clearInterval(downId)   
  leftId = setInterval(function () { //Se repite la funcion siguiente:
    if (
    squares[pacmanCurrentIndex -1].classList.contains('wall') ||
    squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
    ) { //Si a donde el pacman quiera moverse es una pared o la guarida de los fantasmas
      clearInterval(leftId) 
    } else { //movimiento del pacman
      removePacman() //Se borra la posicion actual
      pacmanCurrentIndex -= 1 //actualizacion de la posicion del pacman
      if (squares[pacmanCurrentIndex -1] === squares[363]) { //por si se llega al limite horizontal del mapa
        pacmanCurrentIndex = 391
      }
      pacDotEaten() //Comer bolitas
      powerPelletEaten() //Comer bolitas especiales
    }
    squares[pacmanCurrentIndex].classList.add('pac-man') // actualizacion de imagen 
    squares[pacmanCurrentIndex].classList.add('pac-man-left')
  }, 500)
}

function goRight() { //Movimiento derecha pacman == mpviento de izquierda
  if(rightId!= null){
    clearInterval(rightId)
  }
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

function goUp() { //Movimiento arriba pacman 
  if(upId!= null){ //En caso de repetir el mismo comando
    clearInterval(upId) 
  }
  clearInterval(rightId)
  clearInterval(leftId) //Se cancela el comando que se encuentra ejecutando
  clearInterval(downId)
  upId = setInterval(function () {//Se repite la funcion siguiente:
  if(
    squares[pacmanCurrentIndex -width].classList.contains('wall') ||
    squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
    ) { //Si a donde el pacman quiera moverse es una pared o la guarida de los fantasmas
      clearInterval(upId)
    } else { //movimiento del pacman
      removePacman() //Se borra la posicion actual
      pacmanCurrentIndex -= width //actualizacion de la posicion del pacman
      squares[pacmanCurrentIndex].classList.add('pac-man') //actualizacion de imagen 
      squares[pacmanCurrentIndex].classList.add('pac-man-up')
      pacDotEaten() //Comer bolitas
      powerPelletEaten() //Comer bolitas especiales
    }
  }, 500)
}

function goDown() { //Movimiento abajo pacman
  if(downId!= null){
    clearInterval(downId)
  }
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


// what happens when you eat a pac-dot
// lo que pasa cuando comes una bolita normal
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    scoreDisplay.innerHTML = score //se actualiza el puntaje
    squares[pacmanCurrentIndex].classList.remove('pac-dot') //se quita la imagen
    squares[pacmanCurrentIndex].innerHTML = ''
  }
}

//what happens when you eat a power-pellet
//Lo que ocurre cuando comes una bolita de poder
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    score +=10
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhosts, 10000)
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
  }
}

//make the ghosts stop flashing
//para que ya no se assuten los fantasmas
function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
}

//create ghosts using Constructors
//Creacion del constructor de los fantasmas
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
//los fantasmas fueron reducidos y solo se dejo al de color blaco
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


//ghost event
//Movimiento del fantasma mediante teclas
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

// funciones para el movimiento del fantasma mediante teclas 
function goUpG() {// movimiento hacia arriba
  //En caso se repita la misma instruccion
  if(upIdG != null){
    clearInterval(upIdG)
  }
  clearInterval(rightIdG)
  clearInterval(leftIdG)// cancelacion de los comandos ejercutados con anteridad
  clearInterval(downIdG)
  upIdG = setInterval(function () {
    if (!squares[ghosts[0].currentIndex - width].classList.contains('wall') ||
        squares[ghosts[0].currentIndex - width].classList.contains('ghost-lair') ) {// si no tenmos cerca una pared o a otro fantasma
        //remove the ghosts classes
        squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
        squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')
        //move into that space
        ghosts[0].currentIndex -= width // actaualizacion del indice
        squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost') // actualizamos la imagen
    } else {
      clearInterval(upIdG)
    }
  }, 500)
}

function goRightG() { // movimiento hacia derecha
  //En caso se repita la misma instruccion
  if(rightIdG != null){
    clearInterval(rightIdG)
  }
  clearInterval(leftIdG)
  clearInterval(upIdG)// cancelacion de los comandos ejercutados con anteridad
  clearInterval(downIdG)
  rightIdG = setInterval(function () {
    //Si a donde el fantasma vaya a moverse no es una pared o su guarida
    if(!squares[ghosts[0].currentIndex +1].classList.contains('wall') ||
    squares[ghosts[0].currentIndex +1].classList.contains('ghost-lair') 
    ) {// si no tenmos cerca una pared o a otro fantasma
      //se movera
      //remove the ghosts classes
      squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
      squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')
      //move into that space
      ghosts[0].currentIndex += 1
      if (squares[ghosts[0].currentIndex +1] === squares[392]) {// verificamos los limites
        ghosts[0].currentIndex = 364
      }
      squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost') // actualizamos su imagen en la tabla
      
    } else {
      //en caso contrario dejara de moverse
      clearInterval(rightIdG)
    }
  }, 500)
}

function goDownG() {// movimiento hacia abajo fanatasma
  //En caso se repita la misma instruccion
  if(downIdG != null){
    clearInterval(downIdG)
  }
  clearInterval(rightIdG)
  clearInterval(upIdG)// cancelacion de los comandos ejercutados con anteridad
  clearInterval(leftIdG)
  downIdG = setInterval(function () {
    if (!squares[ghosts[0].currentIndex + width].classList.contains('wall') ||
        squares[ghosts[0].currentIndex + width].classList.contains('ghost-lair')
    ) {// si no tenmos cerca una pared o a otro fantasma
      squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className)
      squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost')

      ghosts[0].currentIndex += width// actualizaremos el valor de su indice
      squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost')// actualizaremos su posicon en la tabla
      
    } else {
      clearInterval(downIdG)// en caso no se cumplan las condiciones cancelaremos el movimiento
    }
  }, 500)
}

function goLeftG() { // movimiento a la izquierda fanatasma
  //En caso se repita la misma instruccion
  if(leftIdG != null){
    clearInterval(leftIdG)
  }
  clearInterval(rightIdG)
  clearInterval(upIdG) // cancelacion de los comandos ejercutados con anteridad
  clearInterval(downIdG)
  leftIdG = setInterval(function () { // se realiza la siguiente
    if (
      !squares[ghosts[0].currentIndex - 1].classList.contains('wall') ||
      squares[ghosts[0].currentIndex - 1].classList.contains('ghost-lair')
    ) { // si no tenmos cerca una pared o a otro fantasma 
      squares[ghosts[0].currentIndex].classList.remove(ghosts[0].className) // removeremos al fantasma de su posicion actual
      squares[ghosts[0].currentIndex].classList.remove('ghost', 'scared-ghost') // este en caos este asustado

      ghosts[0].currentIndex -= 1 // actualizaremos el valor de su indice
      if (squares[ghosts[0].currentIndex - 1] === squares[363]) { // verificamos los limites
        ghosts[0].currentIndex = 391
      }
      squares[ghosts[0].currentIndex].classList.add(ghosts[0].className, 'ghost')// actualizaremos su posicon en la tabla
    } else {
      clearInterval(leftIdG) // en caso no se cumplan las condiciones cancelaremos el movimiento
    }
  }, 500)
}

//check for a game over
//Verificando el fin del juego
function checkForGameOver() {
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) { // si el indice de pacman tiene encima aun fantasma y este no esta 
    //asustado entonces habremos perdido
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', moveGhostE)
    // limpianos los ids de las distintas posiciones
    // fantasma
    clearInterval(rightIdG) // finalizacion del rightId 
    clearInterval(leftIdG)// finalizacion del leftIdG 
    clearInterval(downIdG)// finalizacion del downIdG
    clearInterval(upIdG)// finalizacion del upIdG
    // pacman
    clearInterval(rightId)// finalizacion del rightId
    clearInterval(leftId) // finalizacion del leftId
    clearInterval(downId)// finalizacion del downId
    clearInterval(upId)// finalizacion del upId

    removePacman() // eliminamos a pacman
    scoreDisplay.innerHTML = 'YOU LOSE!' // camiamos el mensaje
    clearInterval(gameOverId)
    clearInterval(checkWinId)
    clearInterval(vozID);
  }
}

//check for a win - more is when this score is reached
//Verifcando el ganar
function checkForWin() {
  if (score > 274) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'YOU WIN!' // cambio del mensaje de la parte superior
    clearInterval(gameOverId) // finalizacion de gameOverId
    clearInterval(checkWinId) // termina checkWinId
    clearInterval(vozID); // temina la voz ID
  }
}

// comandos de voz
function iniciar(event){
  console.time("medicion"); // estas lineas nos serviran para medir la latencia del personaje
  for (let i = event.resultIndex; i < event.results.length; i++){
    console.log(event.results[i][0].transcript);
    let resultado = event.results[i][0].transcript;
    if(resultado.includes("izquierda")){ // si la palabra que hemos dicho es igual a izquierda
      goLeft(); // haremos uso de la funcion de goLeft
    }
    if(resultado.includes("derecha")){// si la palabra que hemos dicho es igual a derecha
      goRight();// heremos uso dela funcion de goRight
    }
    if(resultado.includes("arriba")){// si la palabra que hemos dicho es igual a arriba
      goUp();// heremos uso dela funcion de goUp
    }
    if(resultado.includes("abajo")){// si la palabra que hemos dicho es igual a abajo
      goDown();// heremos uso dela funcion de goDown
    }
    // funicon para iniciar el juego
    if(resultado.includes("empezar")){
      startGame()
    }
    console.timeEnd("medicion"); // termina de medir la latencia y la muestra por consolo
    
  }
}

