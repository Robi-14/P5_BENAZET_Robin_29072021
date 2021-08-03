( async () => {
const articleId= getArticleId()
console.log(articleId);
const article = await getArticle(articleId)
console.log(article);

displayArticle(article)
addToCart(article)


})
()



 function getArticleId() {
      return new URL(location.href).searchParams.get('id')


}

function getArticle(articleId){
   return fetch (`http://localhost:3000/api/teddies/${articleId}`)
    .then ((res) =>{
        return res.json()})
    .then ((articles)=> {
        return articles})
    .catch((erreur) => {
        container.innerHTML =` veuillez nous contacter , Erreur serveur`

    })


} 

 function displayArticle(article){
product = document.querySelector(".product")
article.price = article.price/100
article.price= new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(article.price)

console.log(article.price);


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
</a>`

for (let i = 0; i < article.colors.length; i++) {
    let option= document.createElement("option")
    option.innerHTML = article.colors[i];
    let selectcouleur= document.getElementById("color")
    selectcouleur.appendChild(option)
    
}
let card = document.querySelector(".libele")
btncommander = document.createElement("button")
card.appendChild(btncommander)
btncommander.setAttribute('id','bouton')


btncommander.innerHTML = `<p class="textecmd">Ajoutez au panier</p>`
}

 function addToCart (article) {

btncommander.addEventListener("click", (e)=>{
    e.preventDefault()
    productAdd = {
        name: `${article.name}`,
        price :`${article.price}`,
        id : `${article._id}`,

    }


//declaration de la variable "produitDansLeLocalStorage" -> key et value qui sont dans le local storage

let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("produit"))
if (produitDansLeLocalStorage){
    produitDansLeLocalStorage.push(productAdd)
    localStorage.setItem("produit", JSON.stringify(produitDansLeLocalStorage))
}else{
produitDansLeLocalStorage=[]
produitDansLeLocalStorage.push(productAdd)
localStorage.setItem("produit", JSON.stringify(produitDansLeLocalStorage))
}





}

)}

 



 