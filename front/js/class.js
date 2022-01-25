// Création de la class qui permettra de créer un modèle d'objet dans la page d'accueil
export class CreationCanape {
    constructor (_id, imageUrl, altTxt, name, description) {
        this._id = _id;
        this.imageUrl = imageUrl;
        this.altTxt = altTxt;
        this.name = name;
        this.description = description;
    }
}

export class AjoutProduit {
    constructor (id, nom, choixCouleur, quantite) {
        this.id = id;
        this.nom = nom;
        this.choixCouleur = choixCouleur;
        this.quantite = quantite;
    }
}