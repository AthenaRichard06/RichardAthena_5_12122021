const produits = document.getElementById("items");
const url = "http://localhost:3000/api/products";

// fetch(url)
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

/*
    Étapes =
    1 - Créer la Class
    2 - Créer le tableau qui contiendra les objets créés
    3 - Créer la function a, qui créera les objets et les envoyer au tableau
    4 - Créer la function b, qui permettra l'affichage des produits sur l'index, à partir des objets stockés dans le tableau
    5 - Appeler la function b, depuis la fonction de création a
*/

fetch(url)
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(data) {
        creationProduits(data);
        console.log (data);
    })
    .catch(function(erreur) {
        console.log ("Erreur : " + erreur);
    })


// Création de la class qui permettra de créer un modèle d'objet
class CreationCanape {
    constructor (_id, imageUrl, altTxt, name, description) {
        this.id = _id;
        this.image = imageUrl;
        this.alt = altTxt;
        this.name = name;
        this.description = description;
    }
}

// Création du tableau qui contiendra les objets créés
let tabProduits = [];

// Création de la fonction qui permettra de créer les objets et de les stocker dans le tableau
function creationProduits(data) {

   for (let canape of data) {
       tabProduits.push(new CreationCanape(capane._id, canape.imageUrl, canape.altTxt, canape.name, canape.description));
    }
    affichageProduits();
}

// Création de la fonction qui permettra d'afficher les résultats dans l'index, à partir des objets stockés dans le tableau
function affichageProduits () {

    for (let i of tabProduits) {
        produits.innerHTML +=
            `<a href="./product.html?id=${i._id}">
                <article>
                    <img src="${i.imageUrl}" alt="${i.altTxt}"/>
                    <h3 class="productName">${i.name}</h3>
                    <p class="productDescription">${i.description}</p>
                </article>
            </a>`;
    }
}

