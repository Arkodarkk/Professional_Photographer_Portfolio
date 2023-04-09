
const GALLERY = document.querySelector(".gallery");

let filterTous = document.getElementById("all-cat-button");
let filterObjet = document.getElementById("cat1-button");
let filterAppartements = document.getElementById("cat2-button");
let filterHotels = document.getElementById("cat3-button");

let catButtons = [filterTous, filterObjet, filterAppartements, filterHotels];

//----------------------------------Filtre "Objets"---------------------------------------
// Récupération des travaux de la catégorie Objets
let displayCatObjetsWorks = function () {
    let url = "http://localhost:5678/api/works";

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
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    filterObjet.classList.add("active");
    displayCatObjetsWorks();
})

//----------------------------------Filtre "Apartements"---------------------------------------
// Récupération des travaux de la catégorie Appartements
let displayCatAppartementsWorks = function () {
    let url = "http://localhost:5678/api/works";

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
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    filterAppartements.classList.add("active");
    displayCatAppartementsWorks();
})

//----------------------------------Filtre "Apartements"---------------------------------------
// Récupération des travaux de la catégorie Appartements
let displayCatHotelsWorks = function () {
    let url = "http://localhost:5678/api/works";

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
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    filterHotels.classList.add("active");
    displayCatHotelsWorks();
})

//----------------------------------Filtre "Tous"---------------------------------------
// Récupération des travaux de toutes les catégories
let displayAllWorks = function () {
    let url = "http://localhost:5678/api/works";

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
    for (let cat of catButtons) {
        if (cat.classList.contains("active")) {
            cat.classList.remove("active");
        }
    }
    filterTous.classList.add("active");
    displayAllWorks();
})