// Récupération de l'id du produit dans l'URL
let adresse = window.location.href;
console.log (adresse)

let url = new URL(adresse);
console.log(url)

let reference = url.searchParams.get("id");
console.log (reference)


// Liaison entre l'id et les données dans l'API
const api = `http://localhost:3000/api/products/${reference}`;
console.log (api)

fetch(api)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(infosProduit) {
        affichageProduit(infosProduit);
        console.log (infosProduit);
    })
    .catch(function(erreur) {
        console.log ("Erreur : " + erreur);
    })


// Création de la fonction qui permettra d'afficher les résultats dans le DOM
function affichageProduit (infosProduit) {
    // Ajout de l'image
    let ajoutImage = document.getElementsByClassName("item__img")[0];
    ajoutImage.innerHTML += `<img src="${infosProduit.imageUrl}" alt="${infosProduit.altTxt}">`;

    // Ajout du titre
    let ajoutTitre = document.getElementById("title");
    ajoutTitre.insertAdjacentText ("afterbegin", `${infosProduit.name}`);

    // Ajout du prix
    let ajoutPrix = document.getElementById("price");
    ajoutPrix.insertAdjacentText ("afterbegin", `${infosProduit.price}`);

    // Ajout de la description
    let ajoutDescription = document.getElementById("description");
    ajoutDescription.insertAdjacentText ("afterbegin", `${infosProduit.description}`);

    // Ajout des couleurs
    let couleurs = [];
    for (let j of infosProduit.colors) {
        couleurs.push(j);
    }
    let ajoutCouleurs = document.getElementById("colors");
    for (let k = 0; k < couleurs.length; k++) {
        ajoutCouleurs.insertAdjacentHTML ("beforeend", `<option value="${couleurs[k]}">${couleurs[k]}</option>`);
    }
}