main();
/*utlilisation de l'asynchrone pour attentre l'execution de la premiere fonction*/
async function main() {
  const articles = await getArticles();
  /*utilisation de la boucle for pour mettre les produits en individuel*/
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(article);
    displayArticle(article);
  }
}
/*declaration de la promesse pour recuper les produits sur l'api*/
function getArticles() {
  return (
    fetch("http://localhost:3000/api/teddies")
      /*transformation au format json*/
      .then((res) => {
        return res.json();
      })
      /*on recupere les données*/
      .then(function (articles) {
        return articles;
      })
      /* si erreur on retourne le message d'erreur*/
      .catch(function (error) {
        let container = document.querySelector(".container");
        container.innerHTML = ` veuillez nous contacter , Erreur serveur`;
      })
  );
}
/* fonction pour l'affichage des article*/
function displayArticle(article) {
  /*Sélection du containner dans lequel on va les afficher*/
  product = document.querySelector(".product");
  /*Mise en place du format du prix */
  article.price = article.price / 100;
  article.price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(article.price);
  console.log(article.price);
  /*creation des cartes produits*/
  product.innerHTML += ` 
    
    <a class="card col-3 row " href="product.html?id=${article._id}" >
    
    <img src="${article.imageUrl}" class="photoours">
    <h3 class=" col-9 name"> ${article.name}</h3>
    <p class= " col-2 price"> ${article.price}</p>
    </a>`;
}
