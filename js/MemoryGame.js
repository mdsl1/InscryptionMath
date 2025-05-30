//Arrays com os nomes das cartas e as cartas embaralhadas
let flippedCardsArray = ["A1","A2","D1","D2","E1","E2","F1","F2","M1","M2","S1","S2",];
let shuffledArray = flippedCardsArray.sort(()=>Math.random()-0.5);

let completeShuffledArray = [];
for(let i=0;i<6;i++) {
    completeShuffledArray.push(shuffledArray[i]);
}
for(let i=0;i<6;i++) {
    completeShuffledArray.push("R" + shuffledArray[i]);
}

//Variaveis para funcionamento do jogo
let firstCard = "";
let secondCard = "";
let numPlays = 12;
let timeLeft = 45; //45 segundos
let timerInterval;
let deaths = 0;
let wins = 0;
let result = 0;
let gameStarted = 0;
let btnStartGame = document.getElementById("startGame");

//Variavel para funcionalidade dos olhos que seguem o jogador
let pupils = document.querySelectorAll(".pupil");

//Variaveis para funcionamento do jumpscare
let jumpscareContainer = document.getElementById("jumpscareContainer");
let jumpscareImage = document.getElementById("jumpscareImg");
let jumpscareSound = document.getElementById("jumpscareSound");
let volumeJumpscare = document.getElementById("volumeJumpscare");
//Variavel para transição

let transition = document.getElementById("transition");

function startGame(){

    if(gameStarted == 0){
        contPlays();
        createCards();
        startTimer();
        contDeaths();
        contWins();
    }
    else{
        return;
    }
    gameStarted++;
}

function movePupils(event) {
    
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    pupils.forEach(pupil => {
        let eye = pupil.parentElement;
        let eyeRect = eye.getBoundingClientRect();
        let eyeCenterX = eyeRect.left + eyeRect.width / 2;
        let eyeCenterY = eyeRect.top + eyeRect.height / 2;

        let angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        let maxDistance = 5;

        let pupilX = maxDistance * Math.cos(angle);
        let pupilY = maxDistance * Math.sin(angle);

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
}

function createCards(){
    let cardcontainer = document.getElementsByClassName("card");
    
    let i = 0;
    while (i < cardcontainer.length){
        // Cria os elementos back e flipped para cada card
        let back = document.createElement("div");
        let flipped = document.createElement("div");
        
        // Define as classes dos novos elementos
        back.className = "face back";
        flipped.className = "face flipped";

        back.style.backgroundImage = `url("Midias/Cards/${completeShuffledArray[i]}.png")`        

        // Adiciona os elementos back e flipped dentro do card atual
        cardcontainer[i].appendChild(back);
        cardcontainer[i].appendChild(flipped);
        cardcontainer[i].setAttribute("data-count", completeShuffledArray[i]);

        cardcontainer[i].addEventListener("click", revealCard);

        i++;
    }
}

//Aplica o valor ao html
function contDeaths(){
    let deathsElement = document.getElementById("deaths");
    deathsElement.textContent = deaths;
}
//Aplica o valor ao html
function contWins(){
    let winsElement = document.getElementById("wins");
    winsElement.textContent = wins;
}
//Aplica o valor ao html
function contPlays(){
    let playsElementShow = document.getElementById("contPlaysMainWindow");
    let playsElement = document.getElementById("numPlays");
    playsElement.textContent = numPlays;
    playsElementShow.textContent = numPlays;
}

//Inicia o timer e aplica o valor ao html
function startTimer(){
    let timerElement = document.getElementById("timer");
    let timerElementShow = document.getElementById("timerMainWindow");
    timerInterval = setInterval(() => {
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            endGame();
        } else {
            //Atualiza o tempo restante e exibe no elemento timer
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerElementShow.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}

function revealCard({target}){
    if(target.parentNode.className.includes("revealCard")){
        return;
    }
    if (firstCard === "") {

        target.parentNode.classList.add("revealCard");
        firstCard = target.parentNode;
    
    } else if (secondCard === "") {

        target.parentNode.classList.add("revealCard");
        secondCard = target.parentNode;
        numPlays--;
        contPlays();
        checkEndGame();
        checkCards();
    }
}

function checkCards(){
    firstAnimal = firstCard.getAttribute("data-count");
    secondAnimal = secondCard.getAttribute("data-count");

    if (("R" + firstAnimal == secondAnimal) || (firstAnimal == "R" + secondAnimal)) {

        firstCard.firstChild.classList.add('disabledCard');
        secondCard.firstChild.classList.add('disabledCard');

        firstCard = "";
        secondCard = "";

        checkEndGame();
    }
    else {
        setTimeout(() => {
            
            firstCard.classList.remove("revealCard");
            secondCard.classList.remove("revealCard");
            
            firstCard = "";
            secondCard = "";

        }, 2000);
    }
}

function checkEndGame(){
    let disabledCards = document.getElementsByClassName("disabledCard");

    if (numPlays == 0){
        endGame();
    }
    else if (disabledCards.length == 12){
        result++;
        endGame();
    }
}

function endGame(){
    clearInterval(timerInterval); // Para o timer
    if(result == 1){
        transition.style.visibility = "visible";
        transition.style.opacity = "1";

        setTimeout(() => {
            transition.style.opacity = '0';
            transition.style.visibility = 'hidden';
        }, 4000); // 4 segundos para o efeito total

        //Contabiliza a vitória
        wins++;
        contWins();
    }
    else{
        //Exibe o container e inicia a animação
        jumpscareContainer.style.visibility = 'visible';
        jumpscareContainer.style.opacity = '1';

        // Inicia a animação da imagem (crescendo e ficando brilhante)
        setTimeout(() => {
            jumpscareImage.style.transform = 'scale(30)'; // Aumenta até "pular na tela"
            jumpscareImage.style.filter = 'brightness(1)'; // Deixa a imagem visível
            jumpscareSound.currentTime = 1;
            jumpscareSound.paused = false;
            jumpscareSound.play();
            thunderSound.paused = true;
        }, 500); // Pequeno atraso para suavidade

        // Oculta o jumpscare após um tempo
        setTimeout(() => {
            jumpscareSound.paused = true;
            jumpscareContainer.style.opacity = '0';
            jumpscareContainer.style.visibility = 'hidden';
            jumpscareImage.style.transform = 'scale(0.1)'; // Reseta a imagem
            jumpscareImage.style.filter = 'brightness(0)'; // Reseta a imagem
        }, 5000); // 5 segundos para o efeito total
        
        transition.style.visibility = "visible";
        transition.style.opacity = "1";

        setTimeout(() => {
            transition.style.opacity = '0';
            transition.style.visibility = 'hidden';
        }, 5000); // 7 segundos para o efeito total

        //Contabiliza a morte
        deaths++;
        contDeaths();
    }

    //Remove todas as cartas na mesa e oculta todas novamente
    let cardcontainer = document.getElementsByClassName("card");
    let i = 0;
    while (i < cardcontainer.length) {
        cardcontainer[i].innerHTML = ""; // Remove todos os elementos filhos do card
        cardcontainer[i].classList.remove("revealCard");
        i++;
    }
    //Volta para as configurações padrão
    result = 0;
    gameStarted = 0;
    numPlays = 12;
    timeLeft = 45;
    firstCard = "";
    secondCard = "";
    //Embaralha as cartas novamente
    shuffledArray = flippedCardsArray.sort(()=>Math.random()-0.5);
}

volumeJumpscare.addEventListener('input', (event) => {
    jumpscareSound.volume = event.target.value;
  });

document.addEventListener("mousemove", movePupils);
btnStartGame.addEventListener("click", startGame);
