// Seleciona elementos do modal
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close');

// Adiciona evento para todas as miniaturas
document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    modal.style.display = 'flex'; // Exibe o modal
    modalImage.src = thumbnail.src; // Define a imagem no modal
  });
});

// Fecha o modal ao clicar no botão "x"
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fecha o modal ao clicar fora da imagem
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});