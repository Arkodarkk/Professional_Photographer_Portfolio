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
