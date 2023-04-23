// Récupération du formulaire dans le DOM
const FORM = document.getElementById("login-form");

// Écouteur d'événement à la soumission du formulaire
FORM.addEventListener("submit", (e) => {
   e.preventDefault();

   // Récupération des valeurs des inputs du formulaire
   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;

   // Création de l'objet qui constituera le body du fetch
   let payload = {
      email: email,
      password: password
   };

   // Envoi des données du formulaire vers l'API pour récupérer le token
   fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(payload), 
   })
   .then((response) => {
      if (!response.ok) {// Test validité des identifiants renseignés par l'utilisateur
         // Affiche popup de mauvais identifiants
         const popup = document.getElementById("wrong-popup");
         popup.classList.remove("hidden");
         // Écouteurs d'événement pour cacher la popup
         document.addEventListener('click', hidePopup);
         document.addEventListener('keydown', hidePopup);
         function hidePopup() {
         popup.classList.add('hidden');
         document.removeEventListener('click', hidePopup);
         document.removeEventListener('keydown', hidePopup);
         }
         throw new Error("Email ou mot de passe incorrect");
      } else {
      return response.json();
      }
   })
   .then((data) => {
         // Stockage du token dans le session storage
         sessionStorage.tokenAdmin = JSON.stringify(data);
         window.location.href="./index.html";
   })
   .catch((error) => {
      // Affichage de l'alerte en cas d'erreur
      console.log(error.message);
   });
});