//------------------------------------ LOGIN -------------------------------
// Récupération du formulaire dans le DOM
const FORM = document.getElementById("login-form");


// Écouteur d'événement à la soumission du formulaire
FORM.addEventListener("submit", (e) => {
   e.preventDefault();

   // Récupération des valeurs des inputs du formulaire
   let emailLogin = document.getElementById("email").value;
   let passwordLogin = document.getElementById("password").value;
   let payload = {
      email: emailLogin,
      password: passwordLogin
   };

   // Envoi des données du formulaire vers l'API pour récupérer le token
   fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(payload), 
   })
   .then((response) => response.json())
   .then((data) => {
         // Stockage du token dans le session storage
         sessionStorage.tokensAdmin = JSON.stringify(data);
         window.location.href="./index.html";
   })
   .catch((error) => console.log(error))
});
            