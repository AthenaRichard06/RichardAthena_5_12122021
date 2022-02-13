// Récupération de l'id de la commande dans l'URL
let adresse = window.location.href;
let url = new URL(adresse);
let reference = url.searchParams.get("id_commande");

// Affichage du numéro de commande et suppression du localStorage ensuite
let numeroCommande = document.getElementById("orderId");
numeroCommande.innerHTML = reference;
localStorage.clear();