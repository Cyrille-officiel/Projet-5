//Récupération de l'id dansl'url
const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');
const url = 'http://localhost:3000/api/products/' + id;

//-------------------------------------------------------------------------------------------------------------------------------------
//Déclaration de variables pour la récupération de données des produits
let titleProduct = document.getElementById('title'); // récup de l'id title
let priceProduct = document.getElementById('price'); // récup de l'id price
let descriptionProduct = document.getElementById('description'); //récup de l'id description
let colorsProduct = document.getElementById('colors'); // récup de l'id colors
let imgProduct = document.querySelector('.item__img'); // récupère la class .item_img
let img = document.createElement('img');
imgProduct.appendChild(img); // crée un objet dans img
//--------------------------------------------------------------------------------------------------------------------------------------

//J'appelle l'api via l'url pour chercher les informations du produit par id
fetch(url)
  .then((response) => response.json()) // on obtient la reponse ( une promesse) au format .json
  .then((data) => {
    console.log('Résultat de data :');
    console.log(data);

    img.setAttribute('src', data.imageUrl); // atribution de l'img
    titleProduct.innerHTML = data.name; // attribution du nom
    priceProduct.innerHTML = data.price; // attribution du prix
    descriptionProduct.innerHTML = data.description; // attribution de la description
    document.title = data.name; // attibution nom de la page

    // boucle (répéter l action )
    for (let i = 0; i < data.colors.length; i++) {
      let color = document.createElement('option');
      color.setAttribute('value', data.colors[i]);
      color.innerHTML = data.colors[i];
      colorsProduct.appendChild(color); //ajout de color dans le DOM
    }
  });

//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

// Ajout d'un article au panier via btn
let btnPanier = document.getElementById('addToCart');
btnPanier.addEventListener('click', panier);

// je crée la fonction :
function panier() {
  const couleur = document.querySelector('#colors'); // par #class
  const quantité = document.querySelector('#quantity'); // par #class

  if (
    quantité.value > 0 && // si la valeur de la quantité choisie est supérieur à 0
    quantité.value <= 100 && // si la valeur de la quantité choisie est inférieur ou égal à 100
    quantité.value != 0 && // si la valeur de la quantité choisie est équivalent à 0
    couleur.value != 0 // si la valeur de la couleur choisie est équivalent à 0
  ) {
    if (localStorage.getItem('cart')) {
      let produitPanier = JSON.parse(localStorage.getItem('cart'));
      let idKanap = id;
      let colorKanap = document.querySelector('#colors').value;
      let qtyKanap = document.querySelector('#quantity').value;

      const résultat = produitPanier.find(
        (el) => el.idKanap === id && el.colorKanap === colorKanap
      );

      //Si le produit commandé est déjà dans le panier

      if (résultat) {
        let newQuantite = parseInt(qtyKanap) + parseInt(résultat.qtyKanap);

        résultat.qtyKanap = newQuantite;
        localStorage.setItem('cart', JSON.stringify(produitPanier)); // setItem = (lorsqu'elle reçoit un nom et une valeur de clé, ajoutera cette clé à l' Storage bjet donné ou mettra à jour la valeur de cette clé si elle existe déjà)

        alert('Ajouté au panier !');

        //Si le produit commandé n'est pas dans le panier
      } else {
        let produitPanier = JSON.parse(localStorage.getItem('cart')); // .parse = (méthode analyse une chaîne JSON, en construisant la valeur ou l'objet JavaScript décrit par la chaîne)
        let idKanap = id;
        let colorKanap = document.querySelector('#colors').value;
        let qtyKanap = document.querySelector('#quantity').value;
        let produitPanierObjet = {
          idKanap: id,
          colorKanap: colorKanap,
          qtyKanap: qtyKanap,
        };

        produitPanier.push(produitPanierObjet);

        let objCart = JSON.stringify(produitPanier); //(méthode convertit une valeur JavaScript en chaîne JSON, en remplaçant éventuellement les valeurs si une fonction de remplacement est spécifiée ou en incluant éventuellement uniquement les propriétés spécifiées si un tableau de remplacement est spécifié)
        localStorage.setItem('cart', objCart);

        alert('Ajouté au panier !');
      }
    } else {
      let produitPanier = [];
      let idKanap = id;
      let nameKanap = document.querySelector('#title').textContent;
      let colorKanap = document.querySelector('#colors').value;
      let qtyKanap = document.querySelector('#quantity').value;
      let imgKanap = img.src;
      let altImg = img.alt;
      let priceKanap = document.querySelector('#price').textContent; //(textcontent = obtient le contenu de tous les éléments)

      let produitPanierObjet = {
        idKanap: id,
        colorKanap: colorKanap,
        qtyKanap: qtyKanap,
      };

      produitPanier.push(produitPanierObjet); //( ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.)

      let objCart = JSON.stringify(produitPanier);
      localStorage.setItem('cart', objCart);

      alert('Ajouté au panier !');
    }
  } else {
    if (!couleur.value) {
      alert('Veuillez choisir une couleur');
    } else {
      alert('La quantité doit etre 1 et 100 !');
    }
  }
}
