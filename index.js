main()
 

 async function  main(){
 const  articles = await getArticles()
 for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(article);
      displayArticle(article)
}
 }

 function getArticles() {
   return fetch("http://localhost:3000/api/teddies")
    .then ( (res) => {
        return res.json()
    })
    

    .then (function (articles){
        return articles
        
    })
    .catch (function(error) {
         let container = document.querySelector(".container")
         container.innerHTML =` veuillez nous contacter , Erreur serveur`
    })


}
function displayArticle (article){
    product = document.querySelector(".product")
    article.price = article.price/100
    article.price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(article.price)
    console.log(article.price);
    product.innerHTML += ` 
    
    <a class="card col-3 row " href="product.html?id=${article._id}" >
    
    <img src="${article.imageUrl}" class="photoours">
    <h3 class=" col-9 name"> ${article.name}</h3>
    <p class= " col-2 price"> ${article.price}</p>
    </a>`
    
    }
    