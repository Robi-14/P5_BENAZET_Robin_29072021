(async () => {
  const articleId = getArticleId();
  console.log(articleId);
  const article = await getArticle(articleId);
  console.log(article);

  displayArticle(article);
  addToCart(article);
})();
/*On recupere l'id du produit  dans url grace à url.searchParams */
function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}
/*on recupere l'article dans l'api*/
function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/teddies/${articleId}`)
    .then((res) => {
      return res.json();
    })
    .then((articles) => {
      return articles;
    })
    .catch((erreur) => {
      container.innerHTML = ` veuillez nous contacter , Erreur serveur`;
    });
}
/*affichage de l'article */
function displayArticle(article) {
  /*selection de la div*/
  product = document.querySelector(".product");
  /*mise en format du prix*/
  article.price = article.price / 100;
  article.price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(article.price);

  console.log(article.price);
  /*ecriture du html avec recuperation des infos des articles*/
  product.innerHTML += ` 

<a class="card row " href="product.html?id=${article._id}" >
<img src="${article.imageUrl}" class="photoours">
<div class=" row libele">
<h3 class=" name"> ${article.name}</h3>
<p class= " descriptionours"> ${article.description}</p>
<select name='couleur' id="color">
</select>
<p class= " price"> ${article.price}</p>
</p>
</div>
</a>`;
  /* mise en place du select/option couleur*/
  for (let i = 0; i < article.colors.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = article.colors[i];
    let selectcouleur = document.getElementById("color");
    selectcouleur.appendChild(option);
  }
  /* creation du bouton ajouter au panier*/
  let card = document.querySelector(".libele");
  btncommander = document.createElement("button");
  card.appendChild(btncommander);
  /* ajout de l'id au bouton*/
  btncommander.setAttribute("id", "bouton");

  btncommander.innerHTML = `<p class="textecmd">Ajoutez au panier</p>`;
}
/*creation de la fonction ajouté au panier*/
function addToCart(article) {
  /*creation de l'evenemen au clic sur le bouton*/
  btncommander.addEventListener("click", (e) => {
    /*annulation de l'action par default du bouton*/
    e.preventDefault();

    /* mise en place de l'objet à envoyer dans le localstorage*/
    productAdd = {
      name: `${article.name}`,
      /*utilisation de parsefloat pour le remettre le prix en number*/
      price: parseFloat(`${article.price}`),
      _id: `${article._id}`,
    };

    //declaration de la variable "produitDansLeLocalStorage" -> key et value qui sont dans le local storage

    let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("produit"));
    /*mise en place du if : si il ya deja le talbeau dans le local storage alors on rajoute on produit dans le tableau et on le renvoye dans le localstorage*/
    if (produitDansLeLocalStorage) {
      produitDansLeLocalStorage.push(productAdd);
      localStorage.setItem(
        "produit",
        JSON.stringify(produitDansLeLocalStorage)
      );
    } else {
      /*sinon on creait le tableau de stockage et on y envoye le premier produit */
      produitDansLeLocalStorage = [];
      produitDansLeLocalStorage.push(productAdd);
      localStorage.setItem(
        "produit",
        JSON.stringify(produitDansLeLocalStorage)
      );
    }
  });
}
