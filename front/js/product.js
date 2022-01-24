// Import de la classe rangée dans le fichier class.js
import { AjoutProduit } from "./class.js";

// Récupération de l'id du produit dans l'URL
let adresse = window.location.href;
let url = new URL(adresse);
console.log(url)
let reference = url.searchParams.get("id");

// Création de toutes les variables qui serviront dans la page produit
let ajoutImage = document.getElementsByClassName("item__img")[0];
let ajoutTitre = document.getElementById("title");
let ajoutPrix = document.getElementById("price");
let ajoutDescription = document.getElementById("description");
let couleurs = [];
let ajoutCouleurs = document.getElementById("colors");
let ajoutQuantite = document.getElementById("quantity");
let bouton = document.getElementById("addToCart");

// Liaison entre l'id et les données dans l'API
const api = `http://localhost:3000/api/products/${reference}`;

fetch(api)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(infosProduit) {
        affichageProduit(infosProduit);
    })
    .catch(function(erreur) {
        console.log ("Erreur : " + erreur);
    })

// Création de la fonction qui permettra d'afficher les résultats dans le DOM
function affichageProduit (infosProduit) {
    // Ajout de l'image
    ajoutImage.innerHTML += `<img src="${infosProduit.imageUrl}" alt="${infosProduit.altTxt}">`;
    // Ajout du titre + titre de la page
    ajoutTitre.insertAdjacentText ("afterbegin", `${infosProduit.name}`);
    document.title = `${infosProduit.name}`;
    // Ajout du prix
    ajoutPrix.insertAdjacentText ("afterbegin", `${infosProduit.price}`);
    // Ajout de la description
    ajoutDescription.insertAdjacentText ("afterbegin", `${infosProduit.description}`);
    // Ajout des couleurs
    for (let j of infosProduit.colors) {
        couleurs.push(j);
    }
    for (let k = 0; k < couleurs.length; k++) {
        ajoutCouleurs.insertAdjacentHTML ("beforeend", `<option value="${couleurs[k]}">${couleurs[k]}</option>`);
    }
}

// Écoute de l'évènement "ajouterPanier" qu'il se passe au clic du bouton
bouton.addEventListener("click", (ajouterPanier));

// Fonction d'ajout des éléments dans le panier via le localStorage
function ajouterPanier () {
    // Création des variables qui serviront dans cette fonction
    let id = reference;
    let nom = ajoutTitre.innerText;
    let choixCouleur = ajoutCouleurs.value;
    let quantite = parseInt(ajoutQuantite.value);
    // Insertion des conditions restrictives à l'ajout du panier
    if (choixCouleur === "" && quantite == 0) {
        alert("Attention, vous avez oublié d'ajouter la couleur et la quantité de votre produit.");
    } else if (choixCouleur === "") {
        alert("Attention, vous avez oublié d'ajouter la couleur de votre produit.");
    } else if (quantite == 0 || quantite > 100) {
        alert("Attention, la quantité de votre produit doit être entre 1 et 100.");
    // Si toutes les conditions restrictives sont remplies, alors on peut ajouter le produit
    } else if (choixCouleur !== "" && quantite > 0) {
        let produitStorage = localStorage.getItem("produit");
        let tableauProduits = JSON.parse(produitStorage);
        // Si le tableau est null, on insère le premier produit
        if (tableauProduits === null) {
            tableauProduits = [];
            tableauProduits.push(new AjoutProduit(id, nom, choixCouleur, quantite));
            alert(`Vous avez bien ajouté ${quantite} produit(s) dans votre panier`);
            localStorage.setItem("produit", JSON.stringify(tableauProduits));
        // Sinon, si le tableau existe, on ajoute le produit
        } else if (tableauProduits) {
            // Chercher si l'indice du produit est présent dans tableauProduits
            const produitIndex = tableauProduits.findIndex(produit => id === produit.id && choixCouleur === produit.choixCouleur)
            // Cas où le produit n'est pas présent dans tableauProduits
            if (produitIndex < 0) {
                tableauProduits.push(new AjoutProduit(id, nom, choixCouleur, quantite));
                alert(`Vous avez bien ajouté ${quantite} produit(s) dans votre panier`);
            // Cas où le produit est présent dans tableauProduits
            } else {
                tableauProduits[produitIndex].quantite += quantite;
                alert(`Vous avez bien ajouté ${quantite} produit(s) dans votre panier`);
            }
            localStorage.setItem("produit", JSON.stringify(tableauProduits));
        }
    }
}