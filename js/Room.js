//Variaveis para funcionamento das janelas do jogo
let currentIndex = 4;
let items = document.querySelectorAll(".window");
let totalItems = items.length;
let roomInner = document.getElementById("roomInner");
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
//Variaveis para funcionamento do menu inicial
let initialMenu = document.getElementById("initialMenuContainer");
let btnPageGame = document.getElementById("btnPageGame");
let btnGuide = document.getElementById("btnGuide");
let guideContainer = document.getElementById("guide");
let btnMusic = document.getElementById("btnMusic");
//Variaveis para funcionamento do carrossel guia
let guideCurrentIndex = 0;
let guideItems = document.querySelectorAll(".guideItem");
let guideTotalItems = guideItems.length;
let guideInner = document.getElementById("guideInner");
let btnPrevGuide = document.getElementById("prevItemGuide");
let btnNextGuide = document.getElementById("nextItemGuide");
//Variaveis para funcionamento dos raios que caem
let lightningWindow = document.getElementById("lightning");
let thunderSound = document.getElementById("thunderSound");
let volumeThunder = document.getElementById("volumeThunder");
//Variaveis para funcionamento da musica de fundo
let ostSong = document.getElementById("ostSong");
let volumeOst = document.getElementById("volumeOst");
//Variaveis para funcionamento da chuva de fundo
let rainSound = document.getElementById("rainSound");
let volumeRain = document.getElementById("volumeRain");

function moveToGame(){
    initialMenu.style.opacity = '0';
    initialMenu.style.visibility = 'hidden';
    updateWindow();
}
function showGuide(){
  guideContainer.style.visibility = 'visible';
}
function closeGuide(){
  guideContainer.style.visibility = 'hidden';
}

function updateGuide(instant = false) {
  //Move a "faixa" de itens para exibir o item atual 
  let offset = -guideCurrentIndex * 100; // Calcula o deslocamento em %
  guideInner.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
  guideInner.style.transform = `translateX(${offset}%)`;
}

function nextGuideItem(){
  if (guideCurrentIndex == guideTotalItems - 1){
    //Se for o último item, volta ao primeiro instantaneamente
    guideCurrentIndex = 0;
    updateGuide(true); //Atualiza instantaneamente
    setTimeout(() => updateGuide(), 0);// Adiciona animação para as próximas transições
  }
  else{
    guideCurrentIndex++; //Vai para o próximo item
    updateGuide();
  }
}
function prevGuideItem(){
  if (guideCurrentIndex == 0){
    //Se for o último item, volta ao primeiro instantaneamente
    guideCurrentIndex = guideTotalItems - 1;
    updateGuide(true); //Atualiza instantaneamente
    setTimeout(() => updateGuide(), 0);// Adiciona animação para as próximas transições
  }
  else{
    guideCurrentIndex--; //Vai para o próximo item
    updateGuide();
  }
}

//Muda de janela
function updateWindow(instant = false) {
  //Move a "faixa" de itens para exibir o item atual 
  let offset = -currentIndex * 100; // Calcula o deslocamento em %
  roomInner.style.transition = instant ? "none" : "transform 0.5s ease-in-out"; // Remove animação se instant
  roomInner.style.transform = `translateX(${offset}%)`;
}
//Passa pra proxima janela
function nextWindow(){
  if (currentIndex == totalItems - 1){
    //Se for o último item, volta ao primeiro instantaneamente
    currentIndex = 0;
    updateWindow(true); //Atualiza instantaneamente
    setTimeout(() => updateWindow(), 0);// Adiciona animação para as próximas transições
  }
  else if(currentIndex <3){
    currentIndex = 3;
    updateWindow(); //Atualiza instantaneamente
    checkLastWindow();
  }
  else{
    currentIndex++; //Vai para o próximo item
    updateWindow();
  }
}
//Passa pra janela anterior
function prevWindow(){
  if (currentIndex == 0){
    //Se for o primeiro item, vai ao último instantaneamente
    currentIndex = totalItems - 1;
    updateWindow(true); //Atualiza instantaneamente
    setTimeout(() => updateWindow(), 0); //Adiciona animação para as próximas transições
  }
  else if(currentIndex <3){
      currentIndex = 5;
      updateWindow(true); //Atualiza instantaneamente
      checkLastWindow();
    }
  else{
    currentIndex--; //Volta ao item anterior
    updateWindow();
  }
}
//Move para a janela do menu
function moveToMenu(){
  currentIndex= 1;
  updateWindow();
}
//Verifica se é a ultima janela viável. Caso seja, remove os botões de movimentação
function checkLastWindow(){
  if(currentIndex<3)
  {
    btnNext.style.display = "none";
    btnPrev.style.display = "none";
  }
  else
  {
    btnNext.style.display = "block";
    btnPrev.style.display = "block";
  }
}

//Inicia os sons do site
function startSounds(){
  ostSong.play();
  rainSound.play();
}

//Dispara os raios na janela
function triggerLightning() {
  //Simula o flash do raio
  lightningWindow.style.background = 'white';

  //Toca o som do trovão
  thunderSound.currentTime = 1;
  thunderSound.paused = false;
  thunderSound.play();

  //Volta para o padrão, o setTimeOut determina a duração do raio
  setTimeout(() => {
    lightningWindow.style.background = 'black';
    thunderSound.paused = true;
  }, Math.random() * 200 + 200);//Duração do raio
}
//Função para simular raios em intervalos aleatórios
function startLightningStorm() {
  setInterval(() => {
    let delay = Math.random() * 10000 + 10000;
    setTimeout(triggerLightning, delay);
  }, 10000);
}

//Ajusta o volume do áudio quando o input é alterado
volumeThunder.addEventListener('input', (event) => {
  thunderSound.volume = event.target.value;
});
//Ajusta o volume do áudio quando o input é alterado
volumeOst.addEventListener('input', (event) => {
  ostSong.volume = event.target.value;
});
//Ajusta o volume do áudio quando o input é alterado
volumeRain.addEventListener('input', (event) => {
  rainSound.volume = event.target.value;
});
//Toda vez que o botão for clicado, verifica se é a ultima janela
btnNext.addEventListener("click", checkLastWindow);
btnPrev.addEventListener("click", checkLastWindow);
//Quando o botão for clicado, vai para o menu
btnPageGame.addEventListener("click", moveToGame);
btnMusic.addEventListener("click", startSounds);

// Inicializa o carrossel no item do meio e o timer aleatório para os raios
updateWindow();
checkLastWindow();
startLightningStorm();

window.onload = () => {
  startSounds();
}