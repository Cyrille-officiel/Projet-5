//Récupération des produits :
getProducts();

//Création des articles :
creationProducts();

async function getProducts() {
  let urlProducts = await fetch('http://localhost:3000/api/products'); //déclaration de variables "let" --- await = un comportement asynchrone --- fetch = récupérer des ressources à travers le réseau de manière asynchrone.
  //affichage dans console
  return urlProducts.json();
}

async function creationProducts() {
  let result = await getProducts().then((product) => {
    for (let i = 0; i < product.length; i++) {
      //boucle

      // Insertion de l'élément "a" = url
      let productLink = document.createElement('a');
      document.querySelector('.items').appendChild(productLink);
      productLink.href = `product.html?id=${product[i]._id}`;

      // Insertion de l'élément "article"
      let productArticle = document.createElement('article');
      productLink.appendChild(productArticle);

      // Insertion de l'image
      let productImg = document.createElement('img');
      productArticle.appendChild(productImg);
      productImg.src = product[i].imageUrl;
      productImg.alt = product[i].altTxt;

      // Insertion du titre "h3"
      let productName = document.createElement('h3');
      productArticle.appendChild(productName);
      productName.classList.add('productName');
      productName.innerHTML = product[i].name;

      // Insertion de la description "p"
      let productDescription = document.createElement('p');
      productArticle.appendChild(productDescription);
      productDescription.classList.add('productName');
      productDescription.innerHTML = product[i].description;
    }
  });
}
