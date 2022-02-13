// Récupération des données dans le localStorage
let panier = JSON.parse(localStorage.getItem("produit"));

// Création des variables dont on aura besoin dans cette page
let produits = document.getElementById("cart__items");
let quantiteTotale = document.getElementById("totalQuantity");
let prixTotal = document.getElementById("totalPrice");
let titrePanier = document.querySelector("h1");
let quantiteProduit = document.getElementsByClassName("itemQuantity");
let boutonSupprimer = document.getElementsByClassName("deleteItem");
let formulaire = document.querySelector("form");


// Récupération des données dans l'API
const api = "http://localhost:3000/api/products";
fetch(api)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(data) {
        validationFormulaire();
        afficherProduits(data);
        calculQuantite();
        calculPrix(data);
        changeQuantite(data);
        suppressionProduit(data);
        commande();
    })
    .catch(function(erreur) {
        console.log ("Erreur : " + erreur);
    })

// ************************** Affichage **************************
// Création de la fonction qui permettra d'ajouter les produits dans le DOM (via le localStorage et l'API)
function afficherProduits (data) {
    if (panier === null || (panier.length == 0)) {
        titrePanier.insertAdjacentText ("beforeend", " est vide");
    } else {
        for (let i of panier) {
            for (let j of data) {
                // On ajoute la condition que l'id dans le localStorage doit être identique à l'id dans l'API, afin de pouvoir récupérer les infos manquantes
                if (i.id === j._id) {
                    let texteDOM = 
                    `<article class="cart__item" data-id="${i.id}" data-color="${i.choixCouleur}">
                        <div class="cart__item__img">
                            <img src="${j.imageUrl}" alt="${j.altTxt}">
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
                    produits.innerHTML += texteDOM;
                }
            }
        }
    }
}

// Calcul de la quantité totale de produits dans le panier
function calculQuantite () {
    let nombre = 0;
    if (panier === null || (panier.length == 0)) {
        let zeroArticle = document.getElementsByClassName("cart_price");
        zeroArticle.innerHTML =
        `<p>Total (<span id="totalQuantity">0</span> article) : <span id="totalPrice">0</span> €</p>`;
    } else {
        for (let i of panier) {
            nombre += Number(i.quantite);
        }
    }
    quantiteTotale.innerHTML = nombre;
}

// Calcul du prix total des produits dans le panier
function calculPrix (data) {
    let prix = 0;
    for (let i of panier) {
        for (let j of data) {
            if (i.id === j._id) {
                prix += Number(j.price) * Number(i.quantite);
            }
        }
    }
    prixTotal.innerHTML = prix;
}

// ************************** Modification **************************
// Création de la fonction qui permettra de changer la quantité d'un produit
function changeQuantite (data) {
    for (let changement of quantiteProduit) {
        // On écoute l'évènement qu'il se passe au changement de quantité
        changement.addEventListener ("change", function (e) {
            // On récupère l'élément "article" le plus proche
            let changementProduit = changement.closest("article");
            // On récupère son data-id et son data-color
            let changementProduitId = changementProduit.dataset.id;
            let changementProduitCouleur = changementProduit.dataset.color;
            // On recherche dans le localStorage l'id et la couleur identiques
            let chercheProduitIndex = panier.findIndex(produit => produit.id === changementProduitId && produit.choixCouleur === changementProduitCouleur);
            // Si c'est bon, on veut que la quantité du produit soit égale à la valeur de la fonction de changement e
            panier[chercheProduitIndex].quantite = Number(e.target.value);
            localStorage.setItem("produit", JSON.stringify(panier));
            calculQuantite();
            calculPrix(data);
        })
    }
}

// Création de la fonction de suppression
function suppressionProduit (data) {
    for (let bouton of boutonSupprimer) {
        bouton.addEventListener ("click", function () {
            // On récupère l'élément "article" le plus proche et on le supprime
            let suppressionProduit = bouton.closest("article");
            suppressionProduit.remove();
            // On récupère son data-id et son data-color
            let suppressionProduitId = suppressionProduit.dataset.id;
            let suppressionProduitCouleur = suppressionProduit.dataset.color;
            // On recherche dans le localStorage l'id et la couleur identiques
            let suppressionProduitIndex = panier.findIndex(produit => produit.id === suppressionProduitId && produit.choixCouleur === suppressionProduitCouleur);
            console.log(suppressionProduitIndex);
            // Si c'est bon, on veut que le résultat de suppressionProduitIndex soit supprimé dans le panier
            panier.splice(suppressionProduitIndex, 1);
            localStorage.setItem("produit", JSON.stringify(panier));
            calculQuantite();
            calculPrix(data);
            if ((panier.length == 0)) {
                titrePanier.insertAdjacentText ("beforeend", " est vide");
            }
        })
    }
}

// ************************** Formulaire **************************
// // Création de la fonction de vérification des saisies du formulaire
function validationFormulaire () {
    // On écoute la modification du champ Prénom
    formulaire.firstName.addEventListener("change", function () {
        validationPrenom(this);
    })
    // On écoute la modification du champ Nom
    formulaire.lastName.addEventListener("change", function () {
        validationNom(this);
    })
    // On écoute la modification du champ Adresse
    formulaire.address.addEventListener("change", function () {
        validationAdresse(this);
    })
    // On écoute la modification du champ Ville
    formulaire.city.addEventListener("change", function () {
        validationVille(this);
    })
    // On écoute la modification du champ Email
    formulaire.email.addEventListener("change", function () {
        validationEmail(this);
    })
}

// Création des fonctions de vérification de chaque champ
const validationPrenom = function(inputPrenom) {
    let prenomRegEx = new RegExp ("^[A-Za-zàâäéèêëïîôöùûüÿçæœÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ-]{2,}$", "g");
    let message = document.getElementById("firstNameErrorMsg");
    let test = prenomRegEx.test(inputPrenom.value);
    if (test) {
        message.textContent = "";
        return true;
    } else {
        message.textContent = "Votre prénom doit comporter au moins deux lettres et ne pas avoir de caractères spéciaux ni de chiffres.";
        return false;
    }
}

const validationNom = function(inputNom) {
    let nomRegEx = new RegExp ("^[A-Za-zàâäéèêëïîôöùûüÿçæœÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ-]{2,}$", "g");
    let message = document.getElementById("lastNameErrorMsg");
    let test = nomRegEx.test(inputNom.value);
    if (test) {
        message.textContent = "";
        return true;
    } else {
        message.textContent = "Votre nom doit comporter au moins deux lettres et ne pas avoir de caractères spéciaux ni de chiffres.";
        return false;
    }
}

const validationAdresse = function(inputAdresse) {
    let adresseRegEx = new RegExp ("^[0-9]{1,4}[ ,]{1,}[ A-Za-zàâäéèêëïîôöùûüÿçæœÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ-]+$", "g");
    let message = document.getElementById("addressErrorMsg");
    let test = adresseRegEx.test(inputAdresse.value);
    if (test) {
        message.textContent = "";
        return true;
    } else {
        message.textContent = "Votre adresse n'est pas valide.";
        return false;
    }
}

const validationVille = function(inputVille) {
    let villeRegEx = new RegExp ("^[A-Za-zàâäéèêëïîôöùûüÿçæœÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ-]{2,}$", "g");
    let message = document.getElementById("cityErrorMsg");
    let test = villeRegEx.test(inputVille.value);
    if (test) {
        message.textContent = "";
        return true;
    } else {
        message.textContent = "Votre ville doit comporter au minimum deux lettres et ne pas avoir de caractères spéciaux ou de chiffres.";
        return false;
    }
}

const validationEmail = function(inputEmail) {
    let mailRegEx = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$", "g");
    let message = document.getElementById("emailErrorMsg");
    let test = mailRegEx.test(inputEmail.value);
    if (test) {
        message.textContent = "";
        return true;
    } else {
        message.textContent = "Votre adresse mail n'est pas valide.";
        return false;
    }
}

// ************************** Commande **************************
// Création de la fonction de commande
function commande () {
    let commander = document.getElementById("order");
    // On écoute le clic sur le bouton
    commander.addEventListener ("click", function(e) {
        // Par défaut, on empêche l'envoi des données au clic
        e.preventDefault();
        // Si un des champs du formulaire n'est pas complété, on empêche l'envoi de la commande
        if (formulaire.firstName.value === "" || formulaire.lastName.value === "" || formulaire.address.value === "" || formulaire.city.value === "" || formulaire.email.value === "") {
            e.preventDefault();
            alert("Veuillez compléter tous les champs du formulaire avant de passer commande.");
        // Si un des champs du formulaire n'est pas valide, on empêche l'envoi de la commande
        } else if (validationPrenom(formulaire.firstName) === false || validationNom(formulaire.lastName) === false || validationAdresse(formulaire.address) === false || validationVille(formulaire.city) === false || validationEmail(formulaire.email) === false) {
            e.preventDefault();
            alert("Un des champs du formulaire est incorrect.");
        // Si tout est bon, on envoie la commande
        } else {
            // Variables des différentes informations du formulaire
            let prenom = document.getElementById("firstName");
            let nom = document.getElementById("lastName");
            let adresse = document.getElementById("address");
            let ville = document.getElementById("city");
            let email = document.getElementById("email");

            // Objet contact qui regroupe toutes les infos du client
            let contact = {
                firstName: prenom.value,
                lastName: nom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value
            };
            console.log(contact);

            // Création du tableau qui récupèrera tous les id du panier
            let products = [];
            for (let i = 0; i < panier.length; i++) {
                products.push(panier[i].id);
            }
            console.log(products);

            // Création de l'objet qui servira à envoyer toutes les données dans le body de la requête POST de fetch
            let envoiInfos = {contact, products};
            console.log(envoiInfos);

            // Passage de la commande via la requête POST de fetch
            fetch ("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(envoiInfos),
            })
            .then(function (reponse) {
                return reponse.json();
            })
            .then(function (donnees) {
                document.location.href = "confirmation.html?id_commande=" + donnees.orderId;
            })
            .catch(function (erreur) {
                console.log("Erreur : " + erreur);
            })        
        }
    }) 
}