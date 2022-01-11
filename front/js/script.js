const produits = document.getElementById("items");
const url = "http://localhost:3000/api/products";

fetch(url)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(data) {
        creationProduits(data);
        //console.log (data);
    })
    .catch(function(erreur) {
        console.log ("Erreur : " + erreur);
    })


// Création de la class qui permettra de créer un modèle d'objet
class CreationCanape {
    constructor (_id, imageUrl, altTxt, name, description) {
        this._id = _id;
        this.imageUrl = imageUrl;
        this.altTxt = altTxt;
        this.name = name;
        this.description = description;
    }
}

// Création du tableau qui contiendra les objets créés
let tabProduits = [];

// Création de la fonction qui permettra de créer les objets et de les stocker dans le tableau
function creationProduits(data) {
   for (let canape of data) {
       tabProduits.push(new CreationCanape(canape._id, canape.imageUrl, canape.altTxt, canape.name, canape.description));
    }
    affichageProduits();
}

// Création de la fonction qui permettra d'afficher les résultats dans l'index, à partir des objets stockés dans le tableau
function affichageProduits () {
    for (let i of tabProduits) {
        // Utilisation de URLSearchParams pour le lien vers chaque produit
        let adresse = "http://127.0.0.1:5500/front/html/product.html";
        console.log(adresse)
        let lien = new URL(adresse);
        lien.searchParams.set("id", i._id)
        console.log(lien)
        
        // Intégration dans le DOM
        produits.innerHTML +=
            `<a href="${lien}">
                <article>
                    <img src="${i.imageUrl}" alt="${i.altTxt}">
                    <h3 class="productName">${i.name}</h3>
                    <p class="productDescription">${i.description}</p>
                </article>
            </a>`;
    }
}

// CODE FONCTIONNEL EN CAS D'ERREUR
//  fetch(url)
//     .then (function(reponse) {
//         return reponse.json();
//     })
//     .then (function(canapes) {
//         for (let canape of canapes) {
//             produits.innerHTML +=
//             `<a href="./product.html?id=${canape._id}">
//                 <article>
//                     <img src="${canape.imageUrl}" alt="${canape.altTxt}"/>
//                     <h3 class="productName">${canape.name}</h3>
//                     <p class="productDescription">${canape.description}</p>
//                 </article>
//             </a>`;
//         }
//         console.log (canapes);
//     })
//     .catch (function(erreur) {
//         console.log ("Erreur : " + erreur);
//     })