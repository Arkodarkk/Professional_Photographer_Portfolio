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
const apiWorksUrl = "http://localhost:5678/api/works";
// Récupération de l'url de l'API pour accéder aux catégories
const apiCatUrl = "http://localhost:5678/api/categories";

// Fonction pour afficher les travaux en fonction de leur catégorie
const displayWorks = function (categoryId = null) {
    fetch(apiWorksUrl)
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
const modalDeleteWork = document.querySelector(".delete-work");
const modalAddWork = document.querySelector(".add-work");
const close = document.querySelector('.close');
const closeButtons = document.querySelectorAll(".close");
const galleryModal = document.getElementById("gallery-modal");
const addPicture = document.getElementById("add-picture");
const imagePreview = document.getElementById('image-preview');
const newPicWrapper = document.getElementById("new-pic-wrapper");
const catSelected = document.getElementById("catSelected");
const inputTitle = document.getElementById('input-pic-title');
const imageInput = document.getElementById('uploadfile');
const backButton = document.querySelector(".back");
const validButton = document.getElementById("validate");

// Affiche la modale suppression de projet
const displayModalDeleteWork = () => {
  modalAddWork.classList.add('hidden');
  modalDeleteWork.classList.remove('hidden');
}

// Affiche la modale ajout de projet
const displayModalAddWork = () => {
  modalDeleteWork.classList.add('hidden');
  modalAddWork.classList.remove('hidden');
}


// affiche la modale et applique un background semi-transparent sur les élements derrière
editWork.addEventListener('click', function() {
  modal.style.display = 'block';
  setTimeout(function() {
    modal.style.opacity = '1';
}, 0);
});

// Vide les champs de la modale "Ajout d'un nouveau projet"
function resetFieldsAddWork() {
  inputTitle.value = '';
  catSelected.textContent = '';
  imageInput.value = '';
  const img = imagePreview.querySelector("img");
  URL.revokeObjectURL(img.src);
  img.src = ""; // Efface l'image de prévisualisation
  newPicWrapper.classList.remove("hidden"); // Affiche la box de l'input file
  imagePreview.classList.add("hidden"); // Masque la box de prévisualisation
}

// Ferme la modale et supprime le background semi-transparent
function closeModal() {
  modal.style.opacity = '0';
  setTimeout(function() {
    modal.style.display = 'none';
    displayModalDeleteWork();
    resetFieldsAddWork();
  }, 250);
}

// Ferme la modale au clic sur le bouton "close"
closeButtons.forEach(button => {
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    closeModal()
  });
});

// Ferme la modale lorsque l'utilisateur clique en dehors de celle-ci
modal.addEventListener('click', function(event) {
  if (event.target != modalContent && event.target != modalAddWork)  {
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

modalAddWork.addEventListener('click', function(event) {
  event.stopPropagation();
});


// ---------------------------------- Galerie modale -------------------------------

// Fonction pour afficher tous les travaux au sein de la modale
const displayWorksInModal = function (categoryId = null) {
  fetch(apiWorksUrl)
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
        // Affiche les projets mis à jour sur la page d'accueil
        displayWorks();
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

// Récupération d'éléments du DOM
const wrapper = document.querySelector(".cat-wrapper"),
selectBtn = wrapper.querySelector(".select-btn"), 
options = wrapper.querySelector(".select-options");

// Tableau qui contiendra les objets Categorie (nom et id)
let catObjects = [];
// Tableau qui contiendra le nom des catégories
let categories = [];

// Ajoute chaque catégorie dans le menu déroulant .select-options
function addCategory() {
  categories.forEach(category => {
    const categoryId = catObjects.find(obj => obj.name === category).id;
     let li = `<li data-id="${categoryId}" onclick="updateName(this)">${category}</li>`;
     options.insertAdjacentHTML("beforeend", li);
  });
}

// Récupère via l'API les données pour remplir les tableaux catObjects et categories
fetch(apiCatUrl)
  .then(response => response.json())
  .then(data => {
    data.forEach(category => {
      catObjects.push({ id: category.id, name: category.name });
    });
    categories = catObjects.map(category => category.name);
    addCategory();
  })
  .catch(error => console.error(error));

// Bascule l'affichage des deux modales au clic des boutons "Ajouter une photo" et retour
backButton.addEventListener("click", displayModalDeleteWork);
addPicture.addEventListener("click", displayModalAddWork);

// Affiche le nom de la catégorie du menu déroulant sélectionnée dans le champ Catégorie
function updateName(selectedLi) {
  const category = selectedLi.textContent;
  const categoryId = selectedLi.getAttribute("data-id"); // Récupère l'ID de la catégorie sélectionnée
  wrapper.classList.remove("active");
  catSelected.textContent = category;
  catSelected.dataset.id = categoryId; // Ajouter l'ID de la catégorie sélectionnée à la propriété dataset de l'élément catSelected
}

// Affiche ou masque le menu déroulant au clic sur le bouton Select
selectBtn.addEventListener("click", () => {
   wrapper.classList.toggle("active");
});

// Masque le menu déroulant lorsque l'utilisateur clique en dehors du menu déroulant
document.addEventListener("click", (e) => {
   wrapper.classList.remove("active");
})

selectBtn.addEventListener("click", (e) => {
   e.stopPropagation();
})


// Affiche l'image choisie par l'utilisateur dans la fenêtre de prévisualisation
imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.addEventListener('load', function() {
    const imageUrl = reader.result;
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;

    // Efface l'image de prévisualisation précédente, s'il y en a une
    const previousImage = imagePreview.querySelector("img");
    if (previousImage) {
      URL.revokeObjectURL(previousImage.src);
      imagePreview.removeChild(previousImage);
    }
    
    imagePreview.appendChild(imageElement);
    if (inputTitleValue && inputCatValue && imageInput.files.length > 0) {
      validButton.disabled = false; // Active le bouton Valider si tous les champs sont remplis
      console.log(inputFields);
    } else {
      validButton.disabled = true;
    }
  });
  reader.readAsDataURL(file);
  newPicWrapper.classList.add("hidden");// Masque la box de l'input file
  imagePreview.classList.remove("hidden");// Affiche la box de prévisualisation
});

// Déclaration des variables pour stocker la valeur des champs Titre et Catégorie
let inputTitleValue;
let inputCatValue;

// Récupère la valeur du champ "Titre" au changement d'état de l'input
inputTitle.addEventListener("change", function() {
  inputTitleValue = this.value;
  if (inputTitleValue && inputCatValue && imageInput.files.length > 0) {
    validButton.disabled = false; // Active le bouton Valider si tous les champs sont remplis
  } else {
    validButton.disabled = true;
  }
})

// Récupère la valeur du champ "Catégorie" lors de sa sélection
catSelected.addEventListener("DOMSubtreeModified", function () {
  inputCatValue = this.textContent;
  if (inputTitleValue && inputCatValue && imageInput.files.length > 0) {
    validButton.disabled = false; // Active le bouton Valider si tous les champs sont remplis
  } else {
    validButton.disabled = true;
  }
})

//---------------------------------- Upload du projet ----------------------------

// Fonction pour upload le nouveau projet
function uploadProject() {
  const imageFile = imageInput.files[0]; 
  const formData = new FormData();
  formData.append('image', imageFile); 
  formData.append('title', inputTitle.value); 
  formData.append('category', catSelected.dataset.id); 

  // Envoi du projet sur le serveur via une requête fetch
  fetch(apiWorksUrl, {
    method: 'POST',
    body: formData,
    // body: JSON.stringify(data),
    headers: {
      // 'Content-Type': "multipart/form-data",
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      displayWorks();
      displayWorksInModal();
      closeModal();
    } else {
      console.error('Erreur lors de la sauvegarde du projet');
    }
  })
  .catch(error => {
    console.error(error);
  });
};

validButton.addEventListener("click", uploadProject);