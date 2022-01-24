// Récupération des données dans le localStorage
let panier = JSON.parse(localStorage.getItem("produit"));

// Création des variables dont on aura besoin dans cette page
let produits = document.getElementById("cart__items");
let quantiteTotale = document.getElementById("totalQuantity");
let prixTotal = document.getElementById("totalPrice");


// Récupération des données dans l'API
const api = "http://localhost:3000/api/products";
fetch(api)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(data) {
        afficherProduits(data);
        calculQuantite();
        calculPrix(data);
    })
    .catch(function(erreur) {
        console.log ("Erreur : " + erreur);
    })

// Création de la fonction qui permettra d'ajouter les produits dans le DOM (via le localStorage et l'API)
function afficherProduits (data) {
    for (let i of panier) {
        for (let j of data) {
            // On ajoute la condition que l'id dans le localStorage doit être identique à l'id dans l'API, afin de pouvoir récupérer le prix dans l'API
            if (i.id === j._id) {
                produits.innerHTML += 
                `<article class="cart__item" data-id="${i.id}" data-color="${i.choixCouleur}">
                    <div class="cart__item__img">
                        ${i.image}
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${i.nom}</h2>
                            <p>${i.choixCouleur}</p>
                            <p>${j.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantite}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
            }
        }
    }
}

// Calcul de la quantité totale de produits dans le panier
function calculQuantite () {
    let nombre = 0;
    for (let i of panier) {
        nombre += i.quantite;
    }
    quantiteTotale.insertAdjacentText ("afterbegin", nombre);
}

// Calcul du prix total des produits dans le panier
function calculPrix (data) {
    let prix = 0;
    for (let i of panier) {
        for (let j of data) {
            if (i.id === j._id) {
                prix += j.price * i.quantite;
            }
        }
    }
    prixTotal.insertAdjacentText ("afterbegin", prix);
}