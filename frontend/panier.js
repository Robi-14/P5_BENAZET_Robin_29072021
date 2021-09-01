(async function main(){
  /*on ressort le tableau du localstorage*/
let produits = JSON.parse(localStorage.produit);
console.log(produits);

/* on dissocie chaque élement du tableau en un element*/
for (let i = 0; i < produits.length; i++) {
  const product = produits[i];
  console.log(product);

  article= await getArticle(product)
  ;
  /*affichage du tableau avec tous les produits dans le panier*/
  displayArticle(article);
   
}
/*calcul du montant total*/
calcultotal(produits)})()
/*fonction du bouton supprimé*/
boutonSupprimerPanier();
// recuperation des articles par leur id
function getArticle(product) {
  return fetch(`http://localhost:3000/api/teddies/${product._id}`)
    .then((res) => {
      return res.json();
    })
    .then((articles) => {
      return articles;
    })
    .catch((erreur) => {
      console.log(erreur);
      
    });
}

/*fonction d'affichage du tableeau de produit*/
function displayArticle(product) {
  article.price = article.price / 100;
  article.price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(article.price)
  /*selection de l'id du  partie du  tableau*/  
  tableau = document.getElementById("cart-tablebody");
  /*ecriture dans le tableau*/
  tableau.innerHTML += `
    <tr><th>${article.name}</th> <th> ${article._id}</th> <th>${article.price}</th></tr>`;
  total = document.querySelector(".total");
}

// prendre les prix dans le tableau du panier
function calcultotal(produits) {
  let prixTotalCalcul = [];
  for (let i = 0; i < produits.length; i++){
    let prixProduitsDansPanier = article.price;
    prixProduitsDansPanier = parseFloat(prixProduitsDansPanier);

    // mettre les prix dans la varaibleprixTotalcalcul
    prixTotalCalcul.push(prixProduitsDansPanier);}
    console.log(prixTotalCalcul);
  
  // adittionner les prix du tableau  " prixTotalCalcul" avec reduce
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  console.log(reducer);
  prixTotalCalcul = prixTotalCalcul.reduce(reducer);
  console.log(prixTotalCalcul);
  // mise au format euros
  prixTotalCalcul = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(prixTotalCalcul);
  total.innerHTML = `${prixTotalCalcul}`;
}
/*Creation du bouton "vider le panier"*/
function boutonSupprimerPanier() {
  /*insertion du bouton dans le HTML*/
  tableEnd = document.getElementById("total");
  /*utilisation de insertadjacent pour le placer*/
  tableEnd.insertAdjacentHTML(
    "beforeBegin",
    `<input type="submit" class='btn-delete' value="Vider le Panier">`
  );
  
  console.log(tableEnd);
  /*Suppression de la key "produit" du localstorage*/
  btnSupprPanier = document.querySelector(".btn-delete");
  btnSupprPanier.addEventListener("click", (e) => {
    /* .removeItem vide le panier*/
    localStorage.removeItem("produit");

    /*rafraichissement de la page panier*/
    location.href = "panier.html";
  });
}
/*Formulaire*/
/* selection des inputs*/
const inputs = document.querySelectorAll(' input[type="text"]');
console.log(inputs);
/* programtion de l'affichage de l'erreur*/
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");
  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};
/* verification des inputs avec regex si incorrect affichage du message d'erreur*/
const lastNameChecker = (value) => {
  if (value.length < 2) {
    errorDisplay("lastname", " Le nom doit faire minimum 2 caractères");
    lastname = null;
  } else if (!value.match(/^[a-zA-Z]+[a-zA-Z-éè]*$/)) {
    errorDisplay("lastname", " Le nom  doit  contenir uniquement des lettres ");
    lastname = null;
  } else {
    errorDisplay("lastname", "", true);
    lastname = value;
  }
};

const firstNameChecker = (value) => {
  if (value.length < 2) {
    errorDisplay("firstname", " Le prénom doit faire minimum 2 caractères");
    firstname = null;
  } else if (!value.match(/^[a-zA-Z]+[a-zA-Z-éè]*$/)) {
    errorDisplay(
      "firstname",
      " Le prénom doit  contenir uniquement des lettres "
    );
    firstname = null;
  } else {
    errorDisplay("firstname", "", true);
    firstname = value;
  }
};
const adressChecker = (value) => {
  if (!value.match(/^\s*\S+(?:\s+\S+){2}/)) {
    errorDisplay("adress", " L'adresse doit etre : numero rue nom de la rue  ");
    adress = null;
  } else {
    errorDisplay("adress", "", true);
    adress = value;
  }
};
const cityChecker = (value) => {
  if (!value.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    errorDisplay("city", " veuillez ecrire correctement le nom de la ville ");
    city = null;
  } else {
    errorDisplay("city", "", true);
    city = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errorDisplay("email", "Adresse mail invalide  ");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

/*selection de la valeurs des inputs*/
inputs.forEach((input) =>
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "last-name":
        lastNameChecker(e.target.value);
        break;
      case "first-name":
        firstNameChecker(e.target.value);
        break;
      case "adress":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  })
  
);


/* envoye du formulaire + des produits*/
btnCommande = document.getElementById("commander");
/*ajout de l'evenement au bouton commander*/
btnCommande.addEventListener("click", (e) => {
  e.preventDefault();
  /*controle des valeurs !=null si nulel affichage de l'erreur sinon envoye du formulaire et des produits a la bd*/
  if (lastname && firstname && adress && city && email) {
    produts = [];
    for (let i = 0; i < article.length; i++) {
      const product = article[i];
      produts.push(product._id);
      ;}

    const order = {
      contact: {
        firstName: firstname,
        lastName: lastname,
        city: city,
        email: email,
        address: adress,
      },
      products: produts,
    };
    console.log(order);

    /* découpage du total pour avoir uniquement le montant*/
    montantAPayer = document.querySelector(".total").innerHTML;
   

    /*Creation de l'option post +envoye à la base de données*/


    fetch("http://localhost:3000/api/teddies/order", {method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" }})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //on vide le local storage
        localStorage.removeItem("produit");
        console.log(data);
        //on recupere  l'orderid et le montant total  + envoye vers le localstorage 
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("total", montantAPayer);
        //redirection vers la page confimation
        document.location.href = "./confirm.html"
      });
  } else {
    erreur= document.querySelector(".messageformulaire")
    erreur.innerHTML=
      `<h5> Veuillez remplir correctement le formulaire</h5>`
    ;
  }
});
