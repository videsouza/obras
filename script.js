document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("poem-container");
  const slides = Array.from(container.querySelectorAll(".poem-slide"));
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const collectionLinks = document.querySelectorAll(".collection-link");
  
  // Acompanha o índice do poema ativo na coleção ATUAL
  let currentPoemIndex = 0;
  // Acompanha qual coleção está sendo exibida (null para todas, ou nome da coleção)
  let currentCollection = slides[0].dataset.collection; // Começa com a primeira coleção

  // Função para atualizar qual poema está visível
  function showPoem(index) {
    // Esconde todos os poemas
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    
    // Mostra o poema correto
    slides[index].classList.add("active");
  }

  // Função para avançar para o próximo poema
  function nextPoem() {
    // Avança o índice e faz o 'wrap-around' (volta para o primeiro se passar do último)
    currentPoemIndex = (currentPoemIndex + 1) % slides.length;
    showPoem(currentPoemIndex);
  }

  // Função para voltar para o poema anterior
  function prevPoem() {
    // Volta o índice e faz o 'wrap-around' (vai para o último se for menor que o primeiro)
    currentPoemIndex = (currentPoemIndex - 1 + slides.length) % slides.length;
    showPoem(currentPoemIndex);
  }

  // Eventos dos botões de navegação
  nextBtn.addEventListener("click", nextPoem);
  prevBtn.addEventListener("click", prevPoem);

  // Inicializa: Mostra o primeiro poema da coleção inicial
  showPoem(currentPoemIndex);
  
  // (Opcional) Teclas de seta para navegação
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
      nextPoem();
    } else if (event.key === "ArrowLeft") {
      prevPoem();
    }
  });

  // (Opcional) Funcionalidade dos links da coleção no menu
  collectionLinks.forEach(link => {
      link.addEventListener("click", function(e) {
          e.preventDefault(); // Impede o comportamento padrão do link

          const targetCollection = this.dataset.collection;

          // Atualiza o estado do menu (muda o link ativo)
          collectionLinks.forEach(l => l.classList.remove("active"));
          this.classList.add("active");

          // Reseta a visualização: Mostra apenas poemas da coleção clicada
          // (Para este exemplo simples, nós apenas mostramos o primeiro poema
          // da coleção alvo. Você poderia adicionar um carrossel por coleção).
          const collectionSlides = slides.filter(slide => slide.dataset.collection === targetCollection);
          if (collectionSlides.length > 0) {
              const firstSlideId = collectionSlides[0].id;
              // Encontra o índice global para o primeiro poema da coleção
              const globalIndex = slides.findIndex(slide => slide.id === firstSlideId);
              currentPoemIndex = globalIndex;
              showPoem(globalIndex);
          }
      });
  });
});
