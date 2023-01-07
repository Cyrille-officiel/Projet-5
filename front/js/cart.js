let LocalStorage = JSON.parse(localStorage.getItem('cart')); // convertir les données au format json (de json vers java)

async function getProducts() {
  let urlProducts = await fetch('http://localhost:3000/api/products');
  return urlProducts.json();
}
getProducts();
displayCart();

let total  = 0;
let totalqty = 0;

// si mon panier est vide :

async function displayCart() {
  if (!LocalStorage) {
    const titlePanier = document.querySelector('h1');
    const sectionPanier = document.querySelector('.cart');

    titlePanier.innerHTML = 'Votre panier est vide !!';
    sectionPanier.style.display = 'none';

    // si mon panier n'est pas vide :
  } else {
    let result = await getProducts().then((products) => {

      for (let i = 0; i < LocalStorage.length; i++) {

        const currentProduct = products.find((product) => product._id === LocalStorage[i].idKanap);

        console.log('currentProduct', currentProduct);


        total += currentProduct.price * parseInt(LocalStorage[i].qtyKanap);
        totalqty += parseInt(LocalStorage[i].qtyKanap) ;



        // Création d'une balise "article" et insertion dans la section
        let Article = document.createElement('Article');
        document.querySelector('#cart__items').appendChild(Article);
        Article.className = 'cart__item';
        Article.setAttribute('data-id', LocalStorage[i].idKanap);

        // Insertion de l'élément "div" pour l'image produit
        let DivImg = document.createElement('div');
        Article.appendChild(DivImg);
        DivImg.className = 'cart__item__img';        

        // Insertion de l'image
        let imgProduit = document.createElement('img');
        DivImg.appendChild(imgProduit);
        imgProduit.src = currentProduct.imageUrl;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------
        let DivCartContent = document.createElement('div');
        DivCartContent.className = 'cart__item__conten';

        let DivCartContentDescription = document.createElement('div');
        DivCartContentDescription.className ='cart__item__content__description';
        //---------------------------------------------------------------------------------------------------------------------------------
        let h2Title = document.createElement('h2');
        h2Title.textContent = currentProduct.name;

        let pcolor = document.createElement('p');
        pcolor.textContent = LocalStorage[i].colorKanap;

        let prix = document.createElement('p');
        prix.textContent = currentProduct.price + ' €';

        DivCartContentDescription.appendChild(h2Title);
        DivCartContentDescription.appendChild(pcolor);
        DivCartContentDescription.appendChild(prix);
        DivCartContent.appendChild(DivCartContentDescription);
        Article.appendChild(DivCartContent);
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------
      
        
      //***************************************************************************** */
      // Insertion de l'élément "div" 
      let Div__cart__item__content__settings = document.createElement('div');
      Div__cart__item__content__settings.className ='cart__item__content__settings';

      // Insertion de l'élément "div"
      let Div__cart__item__content__settings__quantity = document.createElement('div');
      Div__cart__item__content__settings__quantity.className ='cart__item__content__settings__quantity';  
      
      //Insertion de "Qté" :
      let insertQté = document.createElement('p');
      insertQté.textContent =  ' Qté : ';

      // Insertion de l'input quantité :
      let BtnQté = document.createElement('input');
     
      Div__cart__item__content__settings__quantity.appendChild(insertQté);     
      Div__cart__item__content__settings__quantity.appendChild(BtnQté); 
      Div__cart__item__content__settings.appendChild(Div__cart__item__content__settings__quantity);      
      Article.appendChild(Div__cart__item__content__settings);
      

      // conf input :
      BtnQté.className = "itemQuantity";
      BtnQté.setAttribute("type", "number");
      BtnQté.setAttribute("min", "1");
      BtnQté.setAttribute("max", "100");
      BtnQté.setAttribute("name", "itemQuantity");
      BtnQté.value = LocalStorage[i].qtyKanap;

      
      

      // Insertion de l'élément "div" 
      let Div__cart__item__content__settings__delete = document.createElement('div');
      Div__cart__item__content__settings__delete.className ='cart__item__content__settings__delete';

      Article.appendChild(Div__cart__item__content__settings__delete);

      let inserSupp = document.createElement('p');
      inserSupp.textContent = "Supprimer";
      inserSupp.className="deleteItem";
      inserSupp.addEventListener("click", (e) => {e.preventDefault;

        let deleteId = LocalStorage[i].colorKanap;
        let deletColor = LocalStorage[i].colorKanap;
        
        localStorage = LocalStorage.filter( elt => elt.idKanap !== deleteId || elt.colorKanap !== deletColor);
        
        localStorage.setItem('cart', JSON.stringify(localStorage));

        alert('Votre article a bien été supprimé.');
        
        if (localStorage.length === 0) {
          localStorage.clear();
        }


        location.reload();
      })

      Div__cart__item__content__settings__delete.appendChild(inserSupp);
      
      // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      let AffichPrice = document.getElementById('totalPrice');
      AffichPrice.textContent = total;

      let AffichTotalqty = document.getElementById('totalQuantity');
      AffichTotalqty.textContent = totalqty;

      console.log(Article);
      console.log("total",total)
      console.log("totalqty",totalqty);

      

// suite modif btn = ajoute au totaux
      
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < qttModif.length; i++){
      qttModif[i].addEventListener("change" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id 
          let quantityModif = LocalStorage[i].qtyKanap;
          let qttModifValue = qttModif[i].valueAsNumber;
          
          const resultFind = LocalStorage.find((el) => el.qttModifValue !== quantityModif);

          resultFind.qtyKanap = qttModifValue;
          LocalStorage[i].qtyKanap = resultFind.qtyKanap;

          localStorage.setItem("cart", JSON.stringify(LocalStorage));
      
          // refresh 
          location.reload();
      })
  }
}
modifyQtt();

    }
    });
  }
}


//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */
//***************************************************************************************************************************************************************************************************** */

// formulaire avec regex :

function getForm() {
  // Ajout des Regex
  let form = document.querySelector('.cart__order__form');

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );

  // Ecoute de la modification du prénom, nom adresse,ville,e-mail
  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  form.city.addEventListener('change', function () {
    validCity(this);
  });

  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
  };
}
getForm();

function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
    event.preventDefault();

    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    };

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i < localStorage.length; i++) {
      products.push(LocalStorage[i].idKanap);
    }
    
      
  
  //  valeurs du formulaire et les produits sélectionnés dans un objet
    
    const sendFormData = {
      contact,
      products,
    }
  
    //  formulaire + localStorage (sendFormData) que j'envoie au serveur
    
    const options = {
      method: 'POST',
      body: JSON.stringify(sendFormData),
      headers: { 
        'Content-Type': 'application/json',
      }
    };
  
    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
      });
  
  
  
  
  
  
  });
}
postForm();