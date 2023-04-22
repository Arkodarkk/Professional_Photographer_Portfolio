// Récupération du formulaire dans le DOM
const FORM = document.getElementById("login-form");

// Écouteur d'événement à la soumission du formulaire
FORM.addEventListener("submit", (e) => {
   e.preventDefault();

   // Récupération des valeurs des inputs du formulaire
   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;

   // Vérification si les champs email et password ont été remplis
   if (!email || !password) {
      alert("Veuillez remplir les champs Email et Mot de passe pour vous connecter.");
      return;
   }

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
         throw new Error("Email ou mot de passe incorrect");
      }
      return response.json();
   })
   .then((data) => {
         // Stockage du token dans le session storage
         sessionStorage.tokenAdmin = JSON.stringify(data);
         window.location.href="./index.html";
   })
   .catch((error) => {
      // Affichage de l'alerte en cas d'erreur
      alert(error.message);
   });
});