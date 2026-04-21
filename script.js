document.addEventListener("DOMContentLoaded", function() {
    const allSlides = Array.from(document.querySelectorAll(".poem-slide"));
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const links = document.querySelectorAll(".collection-link");

    let filteredSlides = [];
    let currentIndex = 0;

    function updateGallery(collectionName) {
        // 1. Filtra os slides que pertencem à coleção clicada
        filteredSlides = allSlides.filter(slide => 
            slide.getAttribute("data-collection") === collectionName
        );

        // 2. Reseta o índice para o primeiro poema da nova lista
        currentIndex = 0;

        // 3. Esconde TODOS os slides do site
        allSlides.forEach(s => s.classList.remove("active"));

        // 4. Mostra o primeiro da coleção filtrada (se existir)
        if (filteredSlides.length > 0) {
            filteredSlides[currentIndex].classList.add("active");
        }
        
        // Esconde as setas se a coleção só tiver um poema
        prevBtn.style.display = nextBtn.style.display = filteredSlides.length > 1 ? "block" : "none";
    }

    function showNext() {
        filteredSlides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % filteredSlides.length;
        filteredSlides[currentIndex].classList.add("active");
    }

    function showPrev() {
        filteredSlides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex - 1 + filteredSlides.length) % filteredSlides.length;
        filteredSlides[currentIndex].classList.add("active");
    }

    // Eventos dos Menus
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            updateGallery(this.getAttribute("data-collection"));
        });
    });

    // Eventos das Setas
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // Inicialização: Começa com a primeira coleção ativa (ex: Alhures)
    const initialCollection = document.querySelector(".collection-link.active").getAttribute("data-collection");
    updateGallery(initialCollection);
});
