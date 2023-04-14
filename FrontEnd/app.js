//---------------------------------- Mode admin ---------------------------------------

// Récupération dans le DOM des élements admin et non-admin
let adminElements = document.querySelectorAll(".admin");
let notAdminElements = document.querySelectorAll(".not-admin");

// Modification de la page si l'admin connecté
window.addEventListener("load", () => {
    if (sessionStorage.getItem("tokenAdmin")) {
        adminElements.forEach(element => element.classList.remove("hidden"));
        notAdminElements.forEach(element => element.classList.add("hidden"));
    }
});

// Au logout on supprime le token de connexion et on modifie la page
document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem("tokenAdmin");
    adminElements.forEach(element => element.classList.add("hidden"));
    notAdminElements.forEach(element => element.classList.remove("hidden"));
});

//------------------------------------ FILTRES -----------------------------------------

// Récupération d'éléments dans le DOM
const GALLERY = document.querySelector(".gallery");
let filterTous = document.getElementById("all-cat-button");
let filterButtons = document.querySelectorAll(".filter-button");

// Récupération de l'url de l'API pour accéder aux travaux
let apiUrl = "http://localhost:5678/api/works";

// Fonction pour afficher les travaux en fonction de leur catégorie
const displayWorks = function (categoryId = null) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let filteredWorks;
            if (categoryId) { 
                filteredWorks = data.filter(work => work.categoryId == categoryId);
            } else {
                filteredWorks = data;
            } 
            let html = filteredWorks.map(work => `
                <figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>
            `).join('');
            GALLERY.innerHTML = html;
        });
};

// Ajout d'un addListener sur chaque bouton de catégorie
filterButtons.forEach(button => {
    button.addEventListener("click", function() {
        filterButtons.forEach(button => button.classList.remove("active"));
        this.classList.add("active");
        // Enregistrer l'id de la catégorie du bouton sélectionné dans une variable
        let categoryId = this.dataset.categoryid;
        // Afficher les travaux de la catégorie sélectionnée
        displayWorks(categoryId);
    });
});

// Afficher tous les travaux au chargement de la page
window.addEventListener("load", () => {
displayWorks();
});

//------------------------------------ Modale -----------------------------------------

// Récupération d'éléments dans le DOM
const editWork = document.querySelector('#edit-works');
const modal = document.querySelector('#work-modal');
const modalContent = document.querySelector('.modal-content');
const close = document.querySelector('.close');
const body = document.querySelector('body');

editWork.addEventListener('click', function() {
  // affiche la modale et ajoute une classe au body pour appliquer un fond semi-transparent
  modal.style.display = 'block';
  body.classList.add('modal-open');
  setTimeout(function() {
    modal.style.opacity = '1';
    body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
}, 0);
});

close.addEventListener('click', function() {
  // cache la modale et enlève la classe ajoutée au body
  modal.style.opacity = '0';
  body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  setTimeout(function() {
    modal.style.display = 'none';
    body.classList.remove('modal-open');
  }, 250);
});

window.addEventListener('click', function(event) {
  // cache la modale et enlève la classe ajoutée au body si l'utilisateur clique en dehors de la modale
  if (event.target != modalContent && event.target != modal) {
    modal.style.opacity = '0';
    body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  setTimeout(function() {
    modal.style.display = 'none';
    body.classList.remove('modal-open');
  }, 100);
  }
});

document.getElementById('edit-works').addEventListener('click', function(event) {
    // Empêche la propagation de l'événement click
    event.stopPropagation();
  });

  