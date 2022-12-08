//Récupération de l'id via les paramètres de l'url  ( window = objet qui correspond à la fenêtre dans laquelle s'affiche la page Web)
const idProduct = new URL(window.location.href).searchParams.get("id"); // (searchparams = renvoie un URLSearchParamsobjet permettant d'accéder aux GETarguments décodés de la requête contenus dans l'URL)

//Déclaration de variables pour la récupération des données des produits 
let titleProduct = document.getElementById("title");    //(renvoie un objet Element représentant l'élément dont la propriété id correspond à la chaîne de caractères spécifiée)
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");   //(queryselector = renvoie le premier Element dans le document qui correspond au sélecteur spécifié ou au groupe de sélecteurs)
let img = document.createElement("img");                 // (Crée un objet HTMLElement de balise HTML tagName)
imgProduct.appendChild(img);

//Récupération de l'article grace a son id + affichage des données de celui-ci
getArticle();

//Récupération de l'article grace a son id + affichage des données 
async function getArticle() {
     await fetch("http://localhost:3000/api/products/" + idProduct)  //(lance une requête et renvoie une promesse. Une fois la demande terminée, la promesse est résolue avec l' objet Response)
    .then((response) => response.json())                             // (récupération .json)
    .then(product => {
        img.setAttribute("src", product.imageUrl);                  //(Définit la valeur d'un attribut sur l'élément spécifié. Si l'attribut existe déjà, la valeur est mise à jour ; sinon, un nouvel attribut est ajouté avec le nom et la valeur spécifiés.)
        img.setAttribute("alt", product.altTxt);    
        titleProduct.innerHTML = product.name;                      //innerhtml = (prend en compte les styles CSS)
        priceProduct.innerHTML = product.price;
        descriptionProduct.innerHTML = product.description;
        document.title = product.name;

        for (let i=0; i < product.colors.length; i++) {     // (boucle i=0 jusqu'a longueur max)
            let color = document.createElement("option");
            color.setAttribute("value", product.colors[i]);
            color.innerHTML = product.colors[i];
            colorsProduct.appendChild(color);  //ajouter dans le DOM
        }  
    });          
}

// Ajout d'un article au panier
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);      //(configure une fonction qui sera appelée chaque fois que l'événement spécifié est livré à la cible.)

function addToCart() {

    const colorChoice = document. querySelector("#colors");
    const quantityChoice = document.querySelector("#quantity");

    if (quantityChoice.value > 0 && quantityChoice.value <=100 && quantityChoice.value != 0 && colorChoice.value != 0) {  //( renvoie vrai si et uniquement si ses deux opérandes sont true ou équivalents à true)

       console.log('in add')
       console.log('local',localStorage.getItem("cart"))
        if (localStorage.getItem("cart")) {

console.log('in if')
    
            let productCart = JSON.parse(localStorage.getItem("cart"));
            console.log(productCart);

            let idKanap = idProduct;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;

            const resultFind = productCart.find(
                (el) => el.idKanap === idProduct && el.colorKanap === colorKanap);
                
                //Si le produit commandé est déjà dans le panier
                console.log("result find est egal a :");
                console.log(resultFind);
                console.log("fin result find");

                if (resultFind) {
                    console.log("resultfind kanap = " + resultFind.qtyKanap);
                    console.log("qtykanap = " + qtyKanap);
                    let newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
                    console.log("newQtt est egal a : " + newQuantite);
                    resultFind.qtyKanap = newQuantite;
                    localStorage.setItem("cart", JSON.stringify(productCart));  // setItem = (lorsqu'elle reçoit un nom et une valeur de clé, ajoutera cette clé à l' Storage bjet donné ou mettra à jour la valeur de cette clé si elle existe déjà)
                    console.log("productCart egal :");                          // stingify = //(méthode convertit une valeur JavaScript en chaîne JSON, en remplaçant éventuellement les valeurs si une fonction de remplacement est spécifiée ou en incluant éventuellement uniquement les propriétés spécifiées si un tableau de remplacement est spécifié)
                    console.log(productCart);
                    console.log("fin productCart");
                    alert("Ajouté au panier !");
                    
                //Si le produit commandé n'est pas dans le panier
                } else {
                    
                    let productCart = JSON.parse(localStorage.getItem("cart")); // .parse = (méthode analyse une chaîne JSON, en construisant la valeur ou l'objet JavaScript décrit par la chaîne)

                    let idKanap = idProduct;
                    let colorKanap = document.querySelector("#colors").value;
                    let qtyKanap = document.querySelector("#quantity").value;
                    
                    
                    console.log(img);
                    console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
                
                    let productCartObj = {
                        idKanap : idProduct,
                    
                        colorKanap : colorKanap,
                        qtyKanap  : qtyKanap
                
                        
                    };
                
                    productCart.push(productCartObj);
                
                    let objCart = JSON.stringify(productCart); //(méthode convertit une valeur JavaScript en chaîne JSON, en remplaçant éventuellement les valeurs si une fonction de remplacement est spécifiée ou en incluant éventuellement uniquement les propriétés spécifiées si un tableau de remplacement est spécifié)
                    localStorage.setItem("cart", objCart);
                
                    alert("Ajouté au panier !");
                }

        } else {

            let productCart = [];

            let idKanap = idProduct;
            let nameKanap = document.querySelector("#title").textContent;
            let colorKanap = document.querySelector("#colors").value;
            let qtyKanap = document.querySelector("#quantity").value;
            let imgKanap = img.src; 
            let altImg = img.alt;
            let priceKanap = document.querySelector("#price").textContent; //(textcontent = obtient le contenu de tous les éléments)
            
            console.log(img);
            console.log(idKanap, nameKanap, colorKanap, qtyKanap, imgKanap, altImg, priceKanap);
        
            let productCartObj = {
                idKanap : idProduct,
               
                colorKanap : colorKanap,
                qtyKanap  : qtyKanap,
                
               
            };
        
            productCart.push(productCartObj); //( ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.)
        
            let objCart = JSON.stringify(productCart);
            localStorage.setItem("cart", objCart);
        
            alert("Ajouté au panier !");    
        }
    }
    else {
        if(!colorChoice.value) {
            alert("Veuillez choisir une couleur"); 
        }else {
            alert("La quantité doit etre 1 et 100 !"); 
        }
        
    }
}