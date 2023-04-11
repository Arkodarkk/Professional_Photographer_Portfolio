//---------------------------------- Mode admin ---------------------------------------

// Récupération dans le DOM des élements affichés en mode admin
let adminElements = document.querySelectorAll(".admin");

// Récupération dans le DOM des élements masqués en mode admin
let notAdminElements = document.querySelectorAll(".not-admin");

// // Récupération des boutons login et logout
// let loginButton = document.getElementById("login");
// let logoutButton = document.getElementById("logout");

// Faire apparaître les éléments admin si le token d'identification est présent 
// dans le session storage et masquer les élements non admin
if (sessionStorage.getItem("tokensAdmin")) {
    for (let element of adminElements) {
        element.classList.remove("hidden")
    }
    for (let element of notAdminElements) {
        element.classList.add("hidden")
    }
};

// Supprimer le token dans le session storage au clic sur "logout" => 
// masquer les éléments admin + faire apparaîtres les éléments non admin
document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem("tokensAdmin");
    for (let element of adminElements) {
        element.classList.add("hidden")
    }
    for (let element of notAdminElements) {
        element.classList.remove("hidden")
    }
})


//------------------------------------ FILTRES -----------------------------------------

// Récupération dea section Gallery dans le DOM
const GALLERY = document.querySelector(".gallery");

// Récupération des boutons de filtre dans le DOM
let filterTous = document.getElementById("all-cat-button");
let filterObjet = document.getElementById("cat1-button");
let filterAppartements = document.getElementById("cat2-button");
let filterHotels = document.getElementById("cat3-button");

// Création d'un tableau pour regrouper tous les filtres
let catButtons = [filterTous, filterObjet, filterAppartements, filterHotels];

// Récupération de l'url de l'API pour les travaux
let url = "http://localhost:5678/api/works";

//----------------------------------Filtre "Objets"---------------------------------------
// Fonction pour afficher les travaux en fonction du filtre sélectionné
let displayCatObjetsWorks = function () {

    fetch(url)
        .then((response) => 
            response.json()
        .then((data) => {
            let objetsTitle = [];
            let imageUrl = [];
            for (let i = 0 ; i < data.length ; i += 1) {
                if (data[i].categoryId == 1) {
                    objetsTitle.push(data[i].title);
                    imageUrl.push(data[i].imageUrl)
                }
            }
            GALLERY.innerHTML = "";
            for (let i = 0 ; i < objetsTitle.length ; i += 1) {
                GALLERY.innerHTML += `<figure><img src="${imageUrl[i]}" alt="${objetsTitle[i]}"><figcaption>${objetsTitle[i]}</figcaption>`
            }
        })
    )
}

// Afficher les travaux de la catégorie Objets lors du clic sur le filtre correspondant
filterObjet.addEventListener("click", function() {
   // Boucle pour modifier l'apparence du bouton de la catégorie sélectionnée
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    this.classList.add("active");
    displayCatObjetsWorks();
})

//----------------------------------Filtre "Apartements"---------------------------------------
// Récupération des travaux de la catégorie Appartements
let displayCatAppartementsWorks = function () {

    fetch(url)
        .then((response) => 
            response.json()
        .then((data) => {
            let appartementsTitle = [];
            let imageUrl = [];
            for (let i = 0 ; i < data.length ; i += 1) {
                if (data[i].categoryId == 2) {
                    appartementsTitle.push(data[i].title);
                    imageUrl.push(data[i].imageUrl)
                }
            }
            GALLERY.innerHTML = "";
            for (let i = 0 ; i < appartementsTitle.length ; i += 1) {
                GALLERY.innerHTML += `<figure><img src="${imageUrl[i]}" alt="${appartementsTitle[i]}"><figcaption>${appartementsTitle[i]}</figcaption>`
            }
        })
    )
}

// Afficher les travaux de la catégorie Appartements lors du clic sur le filtre correspondant
filterAppartements.addEventListener("click", function() {
   // Boucle pour modifier l'apparence du bouton de la catégorie sélectionnée
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    this.classList.add("active");
    displayCatAppartementsWorks();
})

//----------------------------------Filtre "Hôtels & Restaurants"---------------------------------------
// Récupération des travaux de la catégorie Hôtels & Restaurants
let displayCatHotelsWorks = function () {

    fetch(url)
        .then((response) => 
            response.json()
        .then((data) => {
            let HotelsTitle = [];
            let imageUrl = [];
            for (let i = 0 ; i < data.length ; i += 1) {
                if (data[i].categoryId == 3) {
                    HotelsTitle.push(data[i].title);
                    imageUrl.push(data[i].imageUrl)
                }
            }
            GALLERY.innerHTML = "";
            for (let i = 0 ; i < HotelsTitle.length ; i += 1) {
                GALLERY.innerHTML += `<figure><img src="${imageUrl[i]}" alt="${HotelsTitle[i]}"><figcaption>${HotelsTitle[i]}</figcaption>`
            }
        })
    )
}

// Afficher les travaux de la catégorie Appartements lors du clic sur le filtre correspondant
filterHotels.addEventListener("click", function() {
   // Boucle pour modifier l'apparence du bouton de la catégorie sélectionnée
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    this.classList.add("active");
    displayCatHotelsWorks();
})

//----------------------------------Filtre "Tous"---------------------------------------
// Récupération des travaux de toutes les catégories
let displayAllWorks = function () {

    fetch(url)
        .then((response) => 
            response.json()
        .then((data) => {
            let title = [];
            let imageUrl = [];
            for (let i = 0 ; i < data.length ; i += 1) {
                title.push(data[i].title);
                imageUrl.push(data[i].imageUrl)
            }
            GALLERY.innerHTML = "";
            for (let i = 0 ; i < title.length ; i += 1) {
                GALLERY.innerHTML += `<figure><img src="${imageUrl[i]}" alt="${title[i]}"><figcaption>${title[i]}</figcaption>`
            }
        })
    )
}

// Afficher des travaux de toutes les catégories lors du clic sur le filtre correspondant
filterTous.addEventListener("click", function() {
   // Boucle pour modifier l'apparence du bouton de la catégorie sélectionnée
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    this.classList.add("active");
    displayAllWorks();
})

// Affichage de tous les travaux au chargement de la page
displayAllWorks();
