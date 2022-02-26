// Import de la classe rangée dans le fichier class.js
import { CreationCanape } from "./class.js";

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
    let texteDOM = "";
    for (let i of tabProduits) {
        // Utilisation de URLSearchParams pour le lien vers chaque produit
        let adresse = window.location.href;
        let lien = new URL(adresse);
        lien.pathname = "/front/html/product.html";
        lien.searchParams.set("id", i._id)
        
        // Intégration dans le DOM
        texteDOM +=
            `<a href="${lien}">
                <article>
                    <img src="${i.imageUrl}" alt="${i.altTxt}">
                    <h3 class="productName">${i.name}</h3>
                    <p class="productDescription">${i.description}</p>
                </article>
            </a>`;
    }
    produits.insertAdjacentHTML ("beforeend", texteDOM);
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