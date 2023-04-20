//---------------------------------- Mode admin ---------------------------------------

// Récupération dans le DOM des élements admin et non-admin
const adminElements = document.querySelectorAll(".admin");
const notAdminElements = document.querySelectorAll(".not-admin");

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
const gallery = document.querySelector(".gallery");
const filterTous = document.getElementById("all-cat-button");
const filterButtons = document.querySelectorAll(".filter-button");

// Récupération de l'url de l'API pour accéder aux travaux
const apiUrl = "http://localhost:5678/api/works";

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
            gallery.innerHTML = html;
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
const galleryModal = document.getElementById("gallery-modal");
const addPicture = document.getElementById("add-picture");


// affiche la modale et applique un background semi-transparent sur les élements derrière
editWork.addEventListener('click', function() {
  modal.style.display = 'block';
  setTimeout(function() {
    modal.style.opacity = '1';
}, 0);
});

// Ferme la modale et supprime le background semi-transparent
function closeModal() {
  modal.style.opacity = '0';
  setTimeout(function() {
    modal.style.display = 'none';
  }, 250);
}

// Ferme la modale au clic sur le bouton "close"
close.addEventListener('click', function (event) {
  event.stopPropagation();
  closeModal()
});

// Ferme la modale lorsque l'utilisateur clique en dehors de celle-ci
modal.addEventListener('click', function(event) {
  if (event.target != modalContent) {
    closeModal();
  }
});

// Empêche la propagation de l'événement click sur le bouton "Modifier mes projets"
editWork.addEventListener('click', function(event) {
    event.stopPropagation();
  });

// Empêche la propagation de l'événement click sur le contenu de la modale
modalContent.addEventListener('click', function(event) {
  event.stopPropagation();
});


// ---------------------------------- Galerie modale -------------------------------

// Fonction pour afficher tous les travaux au sein de la modale
const displayWorksInModal = function (categoryId = null) {
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          let html = data.map(work => `
              <figure class="gallery-modal-pic" data-id="${work.id}">
                  <img src="${work.imageUrl}" alt="${work.title}">
                  <div class="modal-pic-icons move-icon"><i class='bx bx-move'></i></div>
                  <div class="modal-pic-icons trash-icon"><i class='bx bxs-trash'></i></div>
                  <figcaption><a href="#">éditer</a></figcaption>
              </figure>
          `).join('');
          galleryModal.innerHTML = html;
      });
};

// Affiche tous les travaux dans la modale au chargement de la page
displayWorksInModal();

//Affiche l'icône de déplacement au survol de la souris d'une image
galleryModal.addEventListener('mouseover', function(event) {
  const figure = event.target.closest('figure');
  if (figure) {
    figure.querySelector('.move-icon').style.display = 'flex';
  }
});

//Masque l'icône de déplacement lorsque la souris ne survole plus l'image
galleryModal.addEventListener('mouseout', function(event) {
  const figure = event.target.closest('figure');
  if (figure) {
    figure.querySelector('.move-icon').style.display = 'none';
  }
});

//---------------------------------- Suppression projet ----------------------------

// Récupération du token pour autorisation de suppression et d'ajout de projets
let tokenAdmin = JSON.parse(sessionStorage.getItem("tokenAdmin"));
let token = tokenAdmin.token;

// Supprime une image de la galerie et de la base de données
galleryModal.addEventListener('click', function(event) {
  // Vérifier si l'élément cliqué est une icône "poubelle"
  if (event.target.classList.contains('bxs-trash')) {
    // Récupère l'élément figure parent correspondant
    const figure = event.target.closest('figure');
    // Récupère l'ID de l'élément figure à supprimer
    const workId = figure.dataset.id;
    // Envoie une requête DELETE pour supprimer l'élément
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(function(response) {
      console.log(response);
      if (response.ok) {
        // Affiche les projets mis à jour dans la modale
        displayWorksInModal();
      } else {
        console.error('Erreur lors de la suppression de l\'élément');
      }
    })
    .catch(function(error) {
      console.error('Erreur lors de la suppression de l\'élément', error);
    });
  }
});

//---------------------------------- Ajout projet ----------------------------